/**
 * TM Fashions - Main Script & UI Handler (Public Build Copy)
 */

// Retrieve active design ID from URL parameters
function getCurrentActiveDesignId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || "design-1";
}

/**
 * Safely resolves the product main image with fallback support
 */
function resolveMainImage(design) {
    // 1. Read from centralized images object if available
    if (design.images && design.images.primary) {
        return design.images.primary;
    } 
    // 2. Read from database / Firebase URL link fallback
    else if (design.imageUrl) {
        return design.imageUrl; 
    }
    // 3. Standard image path fallback
    return `images/products/${design.id || 'default'}.jpg`;
}

/**
 * Safely resolves gallery thumbnails with fallback support
 */
function resolveGalleryImages(design) {
    if (design.images && Array.isArray(design.images.gallery) && design.images.gallery.length > 0) {
        return design.images.gallery;
    } else if (design.galleryUrls && Array.isArray(design.galleryUrls)) {
        return design.galleryUrls;
    }
    return [];
}

/**
 * Renders UI components according to selected service type and centralized design data
 */
function renderDesignUI(designId, serviceType = 'stitching-only') {
    const design = getDesignById(designId);

    // 1. Update Design Title
    const titleElem = document.getElementById('design-title');
    if (titleElem) titleElem.textContent = design.name;

    // 2. Load Main Product Image
    const mainImgElem = document.getElementById('main-product-image');
    if (mainImgElem) {
        const imageSource = resolveMainImage(design);
        mainImgElem.src = imageSource;
        mainImgElem.alt = design.name || "Product Image";
        
        mainImgElem.onerror = function() {
            this.onerror = null; // Prevent infinite loop
            this.src = "images/products/default.jpg";
        };
    }

    // 3. Load Gallery Thumbnails
    const galleryContainer = document.getElementById('product-gallery');
    if (galleryContainer) {
        const galleryImages = resolveGalleryImages(design);
        if (galleryImages.length > 0) {
            galleryContainer.style.display = 'flex';
            galleryContainer.innerHTML = galleryImages.map(imgUrl => `
                <img src="${imgUrl}" 
                     class="thumbnail" 
                     alt="Thumbnail"
                     onclick="document.getElementById('main-product-image').src='${imgUrl}'"
                     onerror="this.style.display='none'">
            `).join('');
        } else {
            galleryContainer.style.display = 'none';
        }
    }

    // 4. Populate Sleeve Style options
    const sleeveSelect = document.getElementById('sleeve-style');
    if (sleeveSelect && design.sleeveStyles) {
        sleeveSelect.innerHTML = design.sleeveStyles
            .map(style => `<option value="${style}">${style}</option>`).join('');
    }

    // 5. Populate Neck Design options
    const neckSelect = document.getElementById('neck-design');
    if (neckSelect && design.neckDesigns) {
        neckSelect.innerHTML = design.neckDesigns
            .map(neck => `<option value="${neck}">${neck}</option>`).join('');
    }

    // 6. Populate Size options
    const sizeSelect = document.getElementById('design-size');
    if (sizeSelect && design.sizes) {
        sizeSelect.innerHTML = design.sizes
            .map(size => `<option value="${size}">${size}</option>`).join('');
    }

    // 7. Set single Standard Stitching Price for BOTH modes
    const priceDisplay = document.getElementById('standard-stitching-price');
    if (priceDisplay) {
        priceDisplay.textContent = design.stitchingPrice;
    }

    // Always show core customization fields
    document.getElementById('section-sleeve').style.display = 'block';
    document.getElementById('section-neck').style.display = 'block';
    document.getElementById('section-size').style.display = 'block';
    document.getElementById('section-standard-stitching').style.display = 'block';

    // 8. Handle visibility based on Service Mode
    const fabricSection = document.getElementById('section-fabric-type');
    const colourSection = document.getElementById('section-colour');
    const embroiderySection = document.getElementById('section-embroidery');

    if (serviceType === 'stitching-only') {
        // Hide Fabric, Colour, and Embroidery
        if (fabricSection) fabricSection.style.display = 'none';
        if (colourSection) colourSection.style.display = 'none';
        if (embroiderySection) embroiderySection.style.display = 'none';

    } else if (serviceType === 'stitching-with-fabric') {
        // Show Fabric, Colour, and Embroidery
        if (fabricSection) fabricSection.style.display = 'block';
        if (colourSection) colourSection.style.display = 'block';
        if (embroiderySection) embroiderySection.style.display = 'block';

        // Populate Fabric options
        const fabricSelect = document.getElementById('fabric-type');
        if (fabricSelect && design.stitchingWithFabric && design.stitchingWithFabric.fabricTypes) {
            fabricSelect.innerHTML = design.stitchingWithFabric.fabricTypes
                .map(f => `<option value="${f.name}">${f.name} (+₹${f.price})</option>`).join('');
        }

        // Populate Colour options
        const colourSelect = document.getElementById('colour');
        if (colourSelect && design.stitchingWithFabric && design.stitchingWithFabric.colors) {
            colourSelect.innerHTML = design.stitchingWithFabric.colors
                .map(c => `<option value="${c}">${c}</option>`).join('');
        }

        // Populate Embroidery options
        const embroideryList = document.getElementById('embroidery-list');
        if (embroideryList && design.stitchingWithFabric && design.stitchingWithFabric.embroideryOptions) {
            embroideryList.innerHTML = design.stitchingWithFabric.embroideryOptions
                .map(e => `
                    <label class="checkbox-item">
                        <input type="checkbox" name="embroidery" value="${e.id}">
                        ${e.name} (+₹${e.price})
                    </label>
                `).join('');
        }
    }
}

// Attach event listeners and trigger initial state on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentDesignId = getCurrentActiveDesignId();

    // Force default selection to "Stitching Only"
    const stitchingOnlyRadio = document.getElementById('type-stitching-only');
    if (stitchingOnlyRadio) {
        stitchingOnlyRadio.checked = true;
    }

    // Initialize UI with 'stitching-only' mode
    renderDesignUI(currentDesignId, 'stitching-only');

    // Add listeners to toggle radios
    const serviceRadios = document.querySelectorAll('input[name="serviceType"]');
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            renderDesignUI(currentDesignId, e.target.value);
        });
    });
});