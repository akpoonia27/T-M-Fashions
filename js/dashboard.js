/* ================================================================
   TM FASHIONS — ADMIN DASHBOARD
   Stores products in Firebase Firestore. The public site reads from
   the same Firestore collection.
   ================================================================ */

import { db, storage } from "./firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { fetchProductsFromFirestore, getFallbackProducts } from "./products.js";

const DELIVERY = 150;
const PRODUCTS_COLLECTION = "products";

/* ---- Auth guard ---- */
if (sessionStorage.getItem("tmf_admin") !== "1") {
  window.location.href = "admin.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("tmf_admin");
  window.location.href = "admin.html";
});

/* ---- Data layer ---- */
async function reloadProducts() {
  try {
    const fromFirestore = await fetchProductsFromFirestore();
    if (fromFirestore && fromFirestore.length) return fromFirestore;
  } catch (e) {
    console.error("Failed to load products from Firestore:", e);
    throw e;
  }
  return getFallbackProducts();
}

/* ---- State ---- */
let products = [];
let editingId = null;
let editingFirestoreId = null;
let uploadedImages = []; // {dataUrl, name, file?}

/* ---- Views ---- */
const listView = document.getElementById("listView");
const formView = document.getElementById("formView");

function showList() {
  listView.style.display = "";
  formView.style.display = "none";
  renderTable();
}
function showForm(isEdit) {
  listView.style.display = "none";
  formView.style.display = "";
  document.getElementById("formEyebrow").textContent = isEdit ? "Edit Design" : "New Design";
  document.getElementById("formTitle").textContent = isEdit ? "Edit Design" : "Add New Design";
}

/* ---- Stats bar ---- */
function renderStats() {
  const bar = document.getElementById("statsBar");
  const count = products.length;
  const cats = new Set(products.map(p => p.category)).size;
  const avgPrice = count ? Math.round(products.reduce((s, p) => {
    const m = (p.materialCost?.fabric?.price||0) + (p.materialCost?.lining?.price||0) +
              (p.materialCost?.lace?.price||0) + (p.materialCost?.accessories?.price||0);
    return s + m + (p.stitchingPrice||0) + (p.deliveryCharge||DELIVERY);
  }, 0) / count) : 0;
  bar.innerHTML = `
    <div class="admin-stat"><strong>${count}</strong><span>Total Designs</span></div>
    <div class="admin-stat"><strong>${cats}</strong><span>Categories</span></div>
    <div class="admin-stat"><strong>₹${avgPrice.toLocaleString("en-IN")}</strong><span>Avg. Price</span></div>`;
}

/* ---- Table ---- */
function renderTable() {
  renderStats();
  const tbody = document.getElementById("productsBody");
  if (!products.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="admin-empty">No designs yet. Click "Add New Design" to get started.</td></tr>`;
    return;
  }
  tbody.innerHTML = products.map(p => {
    const m = (p.materialCost?.fabric?.price||0) + (p.materialCost?.lining?.price||0) +
              (p.materialCost?.lace?.price||0) + (p.materialCost?.accessories?.price||0);
    const total = m + (p.stitchingPrice||0) + (p.deliveryCharge||DELIVERY);
    const img = (p.images && p.images[0]) ? p.images[0] : "";
    return `
    <tr>
      <td class="admin-table__img">${img ? `<img src="${img}" alt="" />` : '<span class="admin-noimg">—</span>'}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.designCode}</td>
      <td>${p.category}</td>
      <td>₹${total.toLocaleString("en-IN")}</td>
      <td class="admin-table__actions">
        <button class="btn btn--ghost btn--sm" onclick="editProduct(${p.id})">Edit</button>
        <button class="btn btn--danger btn--sm" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>`;
  }).join("");
}

/* ---- Add / Edit ---- */
document.getElementById("addNewBtn").addEventListener("click", () => {
  editingId = null;
  editingFirestoreId = null;
  uploadedImages = [];
  document.getElementById("productForm").reset();
  document.getElementById("editId").value = "";
  document.getElementById("pDelivery").value = DELIVERY;
  document.getElementById("imagePreview").innerHTML = "";
  document.getElementById("pImageUrls").value = "";
  showForm(false);
});

document.getElementById("cancelBtn").addEventListener("click", showList);
document.getElementById("cancelBtn2").addEventListener("click", showList);

window.editProduct = function(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  editingFirestoreId = p.firestoreId || null;
  uploadedImages = (p.images || []).map(url => ({ dataUrl: url, name: "existing" }));
  document.getElementById("editId").value = id;
  document.getElementById("pName").value = p.name || "";
  document.getElementById("pCode").value = p.designCode || "";
  document.getElementById("pCategory").value = p.category || "";
  document.getElementById("pColour").value = p.colour || "";
  document.getElementById("pOccasion").value = p.occasion || "";
  document.getElementById("pFabric").value = p.fabric || "";
  document.getElementById("pSizes").value = (p.availableSizes || []).join(", ");
  document.getElementById("pDesc").value = p.description || "";
  document.getElementById("pImageUrls").value = (p.images || []).join("\n");
  document.getElementById("mFabQty").value = p.materialCost?.fabric?.quantity || "";
  document.getElementById("mFabPrice").value = p.materialCost?.fabric?.price || "";
  document.getElementById("mLinQty").value = p.materialCost?.lining?.quantity || "";
  document.getElementById("mLinPrice").value = p.materialCost?.lining?.price || "";
  document.getElementById("mLaceQty").value = p.materialCost?.lace?.quantity || "";
  document.getElementById("mLacePrice").value = p.materialCost?.lace?.price || "";
  document.getElementById("mAccPrice").value = p.materialCost?.accessories?.price || "";
  document.getElementById("pStitching").value = p.stitchingPrice || "";
  document.getElementById("pDelivery").value = p.deliveryCharge || DELIVERY;
  renderImagePreview();
  calcTotal();
  showForm(true);
};

window.deleteProduct = async function(id) {
  if (!confirm("Delete this design? This cannot be undone.")) return;
  const p = products.find(x => x.id === id);
  if (!p) return;

  try {
    if (p.firestoreId) {
      await deleteDoc(doc(db, PRODUCTS_COLLECTION, p.firestoreId));
    }
    products = await reloadProducts();
    renderTable();
    toast("Design deleted");
  } catch (e) {
    console.error("Delete failed:", e);
    toast("Failed to delete design", "error");
  }
};

/* ---- Image upload ---- */
const uploadZone = document.getElementById("uploadZone");
const imageInput = document.getElementById("imageInput");

uploadZone.addEventListener("click", () => imageInput.click());
uploadZone.addEventListener("dragover", (e) => { e.preventDefault(); uploadZone.classList.add("is-drag"); });
uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("is-drag"));
uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadZone.classList.remove("is-drag");
  handleFiles(e.dataTransfer.files);
});
imageInput.addEventListener("change", (e) => handleFiles(e.target.files));

function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      uploadedImages.push({ dataUrl: ev.target.result, name: file.name, file });
      renderImagePreview();
    };
    reader.readAsDataURL(file);
  });
}

function renderImagePreview() {
  const preview = document.getElementById("imagePreview");
  preview.innerHTML = uploadedImages.map((img, i) => `
    <div class="admin-thumb">
      <img src="${img.dataUrl}" alt="Preview ${i+1}" />
      ${i === 0 ? '<span class="admin-thumb__badge">Main</span>' : ''}
      <button type="button" class="admin-thumb__remove" onclick="removeImage(${i})">×</button>
    </div>`).join("");
}

window.removeImage = function(i) {
  uploadedImages.splice(i, 1);
  renderImagePreview();
};

async function uploadImageEntry(img) {
  if (img.dataUrl.startsWith("data:")) {
    const blob = img.file || await (await fetch(img.dataUrl)).blob();
    const safeName = (img.name || "image.jpg").replace(/[^a-zA-Z0-9.-]/g, "_");
    const storageRef = ref(storage, `products/${Date.now()}_${safeName}`);
    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
  }
  return img.dataUrl;
}

async function resolveImages() {
  const urlLines = document.getElementById("pImageUrls").value
    .split("\n").map(s => s.trim()).filter(Boolean);
  const images = [];
  const seen = new Set();
  for (const img of uploadedImages) {
    const url = await uploadImageEntry(img);
    if (!seen.has(url)) {
      images.push(url);
      seen.add(url);
    }
  }
  for (const url of urlLines) {
    if (!seen.has(url)) {
      images.push(url);
      seen.add(url);
    }
  }
  return images;
}

/* ---- Auto-calc total ---- */
function calcTotal() {
  const fab = Number(document.getElementById("mFabPrice").value) || 0;
  const lin = Number(document.getElementById("mLinPrice").value) || 0;
  const lace = Number(document.getElementById("mLacePrice").value) || 0;
  const acc = Number(document.getElementById("mAccPrice").value) || 0;
  const stitch = Number(document.getElementById("pStitching").value) || 0;
  const del = Number(document.getElementById("pDelivery").value) || 0;
  const total = fab + lin + lace + acc + stitch + del;
  document.getElementById("pTotal").value = "₹" + total.toLocaleString("en-IN");
}
["mFabPrice","mLinPrice","mLacePrice","mAccPrice","pStitching","pDelivery"].forEach(id => {
  document.getElementById(id).addEventListener("input", calcTotal);
});

function collectFormData() {
  const sizes = document.getElementById("pSizes").value.split(",").map(s => s.trim()).filter(Boolean);

  const materialCost = {
    fabric:      { quantity: document.getElementById("mFabQty").value, price: Number(document.getElementById("mFabPrice").value) || 0 },
    lining:      { quantity: document.getElementById("mLinQty").value, price: Number(document.getElementById("mLinPrice").value) || 0 },
    lace:        { quantity: document.getElementById("mLaceQty").value, price: Number(document.getElementById("mLacePrice").value) || 0 },
    accessories: { price: Number(document.getElementById("mAccPrice").value) || 0 }
  };

  return {
    name: document.getElementById("pName").value.trim(),
    designCode: document.getElementById("pCode").value.trim(),
    category: document.getElementById("pCategory").value,
    colour: document.getElementById("pColour").value.trim(),
    occasion: document.getElementById("pOccasion").value.trim(),
    fabric: document.getElementById("pFabric").value.trim(),
    availableSizes: sizes,
    description: document.getElementById("pDesc").value.trim(),
    materialCost: materialCost,
    stitchingPrice: Number(document.getElementById("pStitching").value) || 0,
    deliveryCharge: Number(document.getElementById("pDelivery").value) || DELIVERY
  };
}

/* ---- Save ---- */
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.disabled = true;

  try {
    const images = await resolveImages();
    if (!images.length) {
      toast("Please add at least one photo", "error");
      return;
    }

    const data = { ...collectFormData(), images };

    if (editingFirestoreId) {
      await updateDoc(doc(db, PRODUCTS_COLLECTION, editingFirestoreId), data);
      toast("Design updated");
    } else {
      const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const payload = {
        id: newId,
        ...data,
        created_at: new Date().toISOString()
      };
      if (editingId !== null) {
        payload.id = editingId;
      }
      await addDoc(collection(db, PRODUCTS_COLLECTION), payload);
      toast("Design added");
    }

    products = await reloadProducts();
    editingId = null;
    editingFirestoreId = null;
    showList();
  } catch (err) {
    console.error("Save failed:", err);
    toast("Failed to save design", "error");
  } finally {
    saveBtn.disabled = false;
  }
});

/* ---- Toast ---- */
let toastTimer;
function toast(msg, type) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className = "admin-toast show" + (type === "error" ? " admin-toast--error" : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.className = "admin-toast", 3000);
}

/* ---- Init ---- */
async function init() {
  try {
    products = await reloadProducts();
  } catch (e) {
    toast("Failed to load designs from cloud", "error");
    products = getFallbackProducts();
  }
  renderTable();
}

init();
