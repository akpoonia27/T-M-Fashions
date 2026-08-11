/* ============================================================================
   TM FASHIONS — MAIN SCRIPT
   Vanilla JS. Powers: loader, sticky nav, mobile menu, reveal animations,
   back-to-top, product rendering, filters/search, gallery slider, lightbox,
   price calculator, customization, WhatsApp ordering, contact form.
   ============================================================================ */

/* ----------------------------------------------------------------------------
   0. INLINE SVG ICONS  (kept here so generated markup is self-contained)
   ---------------------------------------------------------------------------- */
const ICONS = {
  needle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 21l6-6m0 0l9-9a3 3 0 0 0-4-4l-9 9m4 4l-4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  fabric: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6c2 2 4 2 6 0s4-2 6 0 4 2 4 0M4 12c2 2 4 2 6 0s4-2 6 0 4 2 4 0M4 18c2 2 4 2 6 0s4-2 6 0 4 2 4 0" stroke-linecap="round"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" stroke-linejoin="round"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" stroke-linejoin="round"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7" stroke-linejoin="round"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3z" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" stroke-linecap="round"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 4h4l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" stroke-linejoin="round"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.2c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.83-.12-.42-.13-.96-.31-1.66-.61-2.9-1.25-4.8-4.17-4.95-4.36-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2.01.9 2.16.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.75 1.24 1.62 2.01 1.12.99 2.06 1.3 2.34 1.45.29.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.6 0 14.3 0 11.7 0 10 1.6 10 4.6V6H7v3h3v9h4V9z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>'
};

/* ----------------------------------------------------------------------------
   1. BRAND CONFIG  (edit these once — used across every page)
   ---------------------------------------------------------------------------- */
const BRAND = {
  name: "TM Fashions",
  shortName: "TM",
  tagline: "Couture for the modern muse",
  phone: "+91 85699 03818",
  phoneRaw: "918569903818",
  whatsapp: "918569903818",
  instagram: "https://www.instagram.com/mrs.chabarwal?igsh=MTlzNmoxcnR0ZjMxcg==",
  youtube: "https://youtube.com/@talented-madhu?si=B_yh_gVKdpuMi5Zv",
  address: "House No. 1646/9A, Sector 9A",
  city: "Bahadurgarh",
  state: "Haryana",
  pin: "124507",
  country: "India"
};

/* ----------------------------------------------------------------------------
   2. HELPERS
   ---------------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

/* path-safe link builder — works on GitHub Pages subpaths AND root domains */
function link(href) { return href; }

/* ----------------------------------------------------------------------------
   3. LOADER
   ---------------------------------------------------------------------------- */
window.addEventListener("load", () => {
  const loader = $("#loader");
  if (loader) setTimeout(() => loader.classList.add("is-done"), 500);
});

/* ----------------------------------------------------------------------------
   4. HEADER + MOBILE NAV + BACK TO TOP
   ---------------------------------------------------------------------------- */
function initHeader() {
  const header = $("#header");
  const toTop = $("#toTop");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 40);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#hamburger");
  const mobileNav = $("#mobileNav");
  if (burger && mobileNav) {
    const toggle = (open) => {
      burger.classList.toggle("is-open", open);
      mobileNav.classList.toggle("is-open", open);
      document.documentElement.classList.toggle("no-scroll", open);
    };
    burger.addEventListener("click", () => toggle(!burger.classList.contains("is-open")));
    $$("a", mobileNav).forEach(a => a.addEventListener("click", () => toggle(false)));
  }

  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ----------------------------------------------------------------------------
   5. REVEAL ON SCROLL
   ---------------------------------------------------------------------------- */
function initReveal() {
  const items = $$(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) { items.forEach(el => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  items.forEach(el => io.observe(el));
}

/* ----------------------------------------------------------------------------
   6. LIGHTBOX  (shared)
   ---------------------------------------------------------------------------- */
let lbState = { images: [], index: 0 };
function initLightbox() {
  const lb = $("#lightbox");
  if (!lb) return;
  const img = $("#lbImg");
  const counter = $("#lbCounter");

  const render = () => {
    img.src = lbState.images[lbState.index];
    if (counter) counter.textContent = `${lbState.index + 1} / ${lbState.images.length}`;
  };
  const open = (images, index) => {
    lbState.images = images; lbState.index = index;
    render(); lb.classList.add("is-open"); document.documentElement.classList.add("no-scroll");
  };
  const close = () => { lb.classList.remove("is-open"); document.documentElement.classList.remove("no-scroll"); };
  const next = () => { lbState.index = (lbState.index + 1) % lbState.images.length; render(); };
  const prev = () => { lbState.index = (lbState.index - 1 + lbState.images.length) % lbState.images.length; render(); };

  $("#lbClose")?.addEventListener("click", close);
  $("#lbNext")?.addEventListener("click", next);
  $("#lbPrev")?.addEventListener("click", prev);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  window.__openLightbox = open;
}

/* ----------------------------------------------------------------------------
   7. PRODUCT CARD MARKUP
   ---------------------------------------------------------------------------- */
function productCardHTML(p) {
  const price = startingPrice(p);
  return `
  <article class="product-card reveal">
    <a class="product-card__media" href="${link("product.html")}?id=${p.id}">
      <span class="product-card__badge">${p.category}</span>
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
    </a>
    <div class="product-card__body">
      <span class="product-card__code">${p.designCode}</span>
      <h3 class="product-card__name">${p.name}</h3>
      <p class="product-card__meta">${p.fabric} · ${p.colour}</p>
      <div class="product-card__foot">
        <div class="price"><span class="from">Starting</span><span class="amount">${inr(price)}</span></div>
        <a class="product-card__view" href="${link("product.html")}?id=${p.id}">View Design ${ICONS.arrowRight}</a>
      </div>
    </div>
  </article>`;
}

/* ----------------------------------------------------------------------------
   8. HOME PAGE
   ---------------------------------------------------------------------------- */
function initHome() {
  const featured = $("#featuredGrid");
  if (featured) {
    const picks = PRODUCTS.slice(0, 6);
    featured.innerHTML = picks.map(productCardHTML).join("");
    initReveal();
  }
}

/* ----------------------------------------------------------------------------
   9. DESIGNS PAGE
   ---------------------------------------------------------------------------- */
function initDesigns() {
  const grid = $("#designsGrid");
  if (!grid) return;
  const search = $("#designSearch");
  const chips = $("#filterChips");
  const params = new URLSearchParams(location.search);
  let activeCat = params.get("cat") && CATEGORIES.includes(params.get("cat")) ? params.get("cat") : "All";
  let query = "";

  const renderChips = () => {
    chips.innerHTML = CATEGORIES.map(c =>
      `<button class="chip ${c === activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  };

  const render = () => {
    const list = PRODUCTS.filter(p => {
      const matchCat = activeCat === "All" || p.category === activeCat;
      const q = query.trim().toLowerCase();
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.designCode.toLowerCase().includes(q) ||
                     p.category.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    if (!list.length) {
      grid.innerHTML = `<div class="no-results"><h3>No designs found</h3><p>Try a different category or search term.</p></div>`;
      return;
    }
    grid.innerHTML = list.map(productCardHTML).join("");
    initReveal();
  };

  renderChips();
  render();
  chips.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    activeCat = chip.dataset.cat;
    renderChips(); render();
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  search.addEventListener("input", (e) => { query = e.target.value; render(); });
}

/* ----------------------------------------------------------------------------
   10. PRODUCT DETAIL PAGE
   ---------------------------------------------------------------------------- */
function initProduct() {
  const root = $("#productRoot");
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || PRODUCTS[0].id;
  const p = getProductById(id) || PRODUCTS[0];

  document.title = `${p.name} — ${BRAND.name}`;

  const mat = materialTotal(p);
  const base = mat + p.stitchingPrice + p.deliveryCharge;

  /* Gallery */
  const galleryImgs = p.images;
  let activeImg = 0;

  const mainImg = $("#galleryMainImg");
  const thumbs = $("#galleryThumbs");

  const setImg = (i) => {
    activeImg = i;
    mainImg.style.opacity = "0";
    setTimeout(() => { mainImg.src = galleryImgs[i]; mainImg.style.opacity = "1"; }, 120);
    $$(".gallery__thumb", thumbs).forEach((t, idx) => t.classList.toggle("active", idx === i));
  };

  thumbs.innerHTML = galleryImgs.map((src, i) =>
    `<button class="gallery__thumb ${i === 0 ? "active" : ""}" data-i="${i}"><img src="${src}" alt="View ${i + 1}" loading="lazy"/></button>`).join("");
  thumbs.addEventListener("click", (e) => {
    const t = e.target.closest(".gallery__thumb");
    if (t) setImg(Number(t.dataset.i));
  });
  mainImg.addEventListener("click", () => window.__openLightbox(galleryImgs, activeImg));

  /* Set the main image initially */
  mainImg.src = galleryImgs[0];

  /* Info */
  $("#pEyebrow").textContent = p.category;
  $("#pName").textContent = p.name;
  $("#pCode").textContent = `${p.designCode} · ${p.occasion}`;
  $("#pDesc").textContent = p.description;

  $("#specCategory").textContent = p.category;
  $("#specFabric").textContent = p.fabric;
  $("#specColour").textContent = p.colour;
  $("#specOccasion").textContent = p.occasion;
  $("#specSizes").innerHTML = p.availableSizes.map(s => `<span class="pill">${s}</span>`).join("") + `<span class="pill">Custom Size</span>`;

  /* Design service type — default to Stitching Only */
  const DESIGN_OPTIONS = [
    { value: "stitching-only", label: "Stitching Only" },
    { value: "with-fabric", label: "Stitching with Fabric" }
  ];
  let designType = "stitching-only";

  $("#optDesign").innerHTML = DESIGN_OPTIONS.map(o =>
    `<button type="button" class="opt ${designType === o.value ? "selected" : ""}" data-design="${o.value}">${o.label}</button>`
  ).join("");
  $("#optDesign").addEventListener("click", (e) => {
    const opt = e.target.closest(".opt");
    if (!opt) return;
    designType = opt.dataset.design;
    $$("#optDesign .opt").forEach(o => o.classList.toggle("selected", o.dataset.design === designType));
    recalc();
  });

  /* Material table */
  $("#matTable").innerHTML = `
    <tr><th>Material</th><th>Quantity</th><th>Price</th></tr>
    <tr><td>Fabric</td><td>${p.materialCost.fabric.quantity}</td><td class="amt">${inr(p.materialCost.fabric.price)}</td></tr>
    <tr><td>Lining</td><td>${p.materialCost.lining.quantity}</td><td class="amt">${inr(p.materialCost.lining.price)}</td></tr>
    <tr><td>Lace</td><td>${p.materialCost.lace.quantity}</td><td class="amt">${inr(p.materialCost.lace.price)}</td></tr>
    <tr><td>Accessories</td><td>—</td><td class="amt">${inr(p.materialCost.accessories.price)}</td></tr>
  `;

  /* Stitching tiers */
  const tiersEl = $("#stitchingTiers");
  let selectedTier = STITCHING_TIERS.findIndex(t => t.price === p.stitchingPrice);
  if (selectedTier < 0) selectedTier = 1;
  tiersEl.innerHTML = STITCHING_TIERS.map((t, i) => `
    <button class="margin-bottom: var(--space-2);" data-i="${i}">
      ${t.popular ? '<span class="tier__tag">Popular</span>' : ""}
      <h4>${t.name}</h4>
      <div class="tier__price">${inr(t.price)}</div>
      <p>${t.description}</p>
      <ul>${t.features.map(f => `<li>${f}</li>`).join("")}</ul>
    </button>`).join("");
  tiersEl.addEventListener("click", (e) => {
    const tier = e.target.closest(".tier");
    if (!tier) return;
    selectedTier = Number(tier.dataset.i);
    $$(".tier", tiersEl).forEach((t, i) => t.classList.toggle("selected", i === selectedTier));
    recalc();
  });

  /* Customization */
  const opts = CUSTOMIZATION_OPTIONS;
  const state = {
    fabric: p.fabric,
    colour: p.colour,
    sleeve: opts.sleeveStyles[0],
    neck: opts.neckDesigns[0],
    size: p.availableSizes[0],
    customSize: "",
    embroidery: []
  };

  const renderOptGroup = (key, values, getLabel = (v) => v) =>
    values.map(v => `<button class="opt ${state[key] === v ? "selected" : ""}" data-key="${key}" data-val="${v}">${getLabel(v)}</button>`).join("");

  $("#optFabric").innerHTML = renderOptGroup("fabric", opts.fabricTypes);
  $("#optColour").innerHTML = renderOptGroup("colour", opts.colours);
  $("#optSleeve").innerHTML = renderOptGroup("sleeve", opts.sleeveStyles);
  $("#optNeck").innerHTML = renderOptGroup("neck", opts.neckDesigns);

  $("#optSize").innerHTML = p.availableSizes.map(s =>
    `<button class="opt ${state.size === s ? "selected" : ""}" data-key="size" data-val="${s}">${s}</button>`).join("") +
    `<button class="opt ${state.size === "Custom" ? "selected" : ""}" data-key="size" data-val="Custom">Custom Size</button>`;
  $("#optSize").insertAdjacentHTML("beforeend",
    `<input class="select-field" id="customSizeInput" placeholder="Your measurements (optional)" style="margin-top:.6rem;${state.size === "Custom" ? "" : "display:none"}" />`);
  $("#customSizeInput").addEventListener("input", (e) => { state.customSize = e.target.value; });

  $("#optEmbroidery").innerHTML = opts.embroidery.map(e =>
    `<button class="opt" data-emb="${e.name}" data-price="${e.price}">${e.name}<span class="opt-price">+${inr(e.price)}</span></button>`).join("");

  const onOptClick = (e) => {
    const opt = e.target.closest(".opt");
    if (!opt) return;
    if (opt.dataset.emb) {
      const name = opt.dataset.emb;
      const price = Number(opt.dataset.price);
      const idx = state.embroidery.findIndex(x => x.name === name);
      if (idx >= 0) { state.embroidery.splice(idx, 1); opt.classList.remove("selected"); }
      else { state.embroidery.push({ name, price }); opt.classList.add("selected"); }
      recalc();
      return;
    }
    const key = opt.dataset.key;
    const val = opt.dataset.val;
    state[key] = val;
    $$(`#optFabric .opt, #optColour .opt, #optSleeve .opt, #optNeck .opt, #optSize .opt`).forEach(o => {
      if (o.dataset.key === key) o.classList.toggle("selected", o.dataset.val === val);
    });
    const csi = $("#customSizeInput");
    if (csi) csi.style.display = val === "Custom" && key === "size" ? "block" : "none";
    recalc();
  };
  ["#optFabric", "#optColour", "#optSleeve", "#optNeck", "#optSize", "#optEmbroidery"].forEach(sel => $(sel)?.addEventListener("click", onOptClick));

  /* Price calc */
  function recalc() {
    const stitch = STITCHING_TIERS[selectedTier].price;
    const emb = state.embroidery.reduce((s, e) => s + e.price, 0);
    const withFabric = designType === "with-fabric";
    const matCharge = withFabric ? mat : 0;
    const total = matCharge + stitch + p.deliveryCharge + emb;

    const materialSection = $("#materialSection");
    const sumMaterialRow = $("#sumMaterialRow");
    const sumEmbroideryRow = $("#sumEmbroideryRow");
    const grpFabric = $("#grpFabric");
    const grpColour = $("#grpColour");
    const grpEmbroidery = $("#grpEmbroidery");

    if (materialSection) materialSection.style.display = withFabric ? "" : "none";
    if (sumMaterialRow) sumMaterialRow.style.display = withFabric ? "" : "none";
    if (sumEmbroideryRow) sumEmbroideryRow.style.display = withFabric ? "" : "none";
    if (grpFabric) grpFabric.style.display = withFabric ? "" : "none";
    if (grpColour) grpColour.style.display = withFabric ? "" : "none";
    if (grpEmbroidery) grpEmbroidery.style.display = withFabric ? "" : "none";

    if (withFabric) {
      $("#sumMaterial").textContent = inr(mat);
      $("#sumEmbroidery").textContent = inr(emb);
    }
    $("#sumStitching").textContent = inr(stitch);
    $("#sumDelivery").textContent = inr(p.deliveryCharge);
    $("#sumEmbroidery").textContent = emb ? inr(emb) : "—";
    $("#sumTotal").textContent = inr(total);
    $("#startingNote").textContent = withFabric
      ? `Starting from ${inr(base)}`
      : `Starting from ${inr(p.stitchingPrice + p.deliveryCharge)}`;
    state.total = total;
    state.designType = designType;
  }
  recalc();

  /* WhatsApp order */
  $("#orderBtn").addEventListener("click", () => {
    const tier = STITCHING_TIERS[selectedTier].name;
    const emb = state.embroidery.map(e => e.name).join(", ") || "None";
    const sizeVal = state.size === "Custom" ? `Custom (${state.customSize || "to be measured"})` : state.size;
    const msg =
`Hello ${BRAND.shortName}! I'd like to order a design.

Design Name: ${p.name}
Design Code: ${p.designCode}
Category: ${p.category}

Selected Options:
• Design: ${state.designType === "stitching-only" ? "Stitching Only" : "Stitching with Fabric"}
• Fabric: ${state.fabric}
• Colour: ${state.colour}
• Sleeve: ${state.sleeve}
• Neck: ${state.neck}
• Size: ${sizeVal}
• Stitching: ${tier}
• Embroidery: ${emb}

Price: ${inr(state.total)}
(${state.designType === "stitching-only" ? "Includes stitching + pan-India delivery" : "Includes material + stitching + pan-India delivery"})

Thank you!`;
    const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });

  /* Related products */
  const related = PRODUCTS.filter(x => x.id !== p.id && x.category === p.category).slice(0, 3);
  const fillRelated = PRODUCTS.filter(x => x.id !== p.id && !related.includes(x)).slice(0, 3 - related.length);
  const relList = [...related, ...fillRelated].slice(0, 3);
  $("#relatedGrid").innerHTML = relList.map(productCardHTML).join("");
  initReveal();
}

/* ----------------------------------------------------------------------------
   11. CONTACT PAGE
   ---------------------------------------------------------------------------- */
function initContact() {
  const form = $("#contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fname = $("#fname").value.trim();
    const lname = $("#lname").value.trim();
    const email = $("#email").value.trim();
    const phone = $("#phone").value.trim();
    const interest = $("#interest").value;
    const message = $("#message").value.trim();
    const msg =
`Hello ${BRAND.shortName}! I'd like to book an appointment.

Name: ${fname} ${lname}
Email: ${email}
Phone: ${phone}
Interested in: ${interest}
${message ? `Message: ${message}` : ""}

Thank you!`;
    const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
    const m = $("#formMsg");
    m.classList.add("show", "success");
    m.textContent = "Opening WhatsApp with your details…";
    window.open(url, "_blank");
    form.reset();
    setTimeout(() => m.classList.remove("show", "success"), 6000);
  });
}

/* ----------------------------------------------------------------------------
   12. BOOT
   ---------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initLightbox();
  initHome();
  initDesigns();
  initProduct();
  initContact();
  initReveal();
});
