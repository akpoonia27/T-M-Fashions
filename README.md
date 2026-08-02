# TM Fashions — Luxury Fashion Designer Website

A premium, static website for a women's Indian luxury fashion designer boutique.
Built with **HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no backend,
no database. Ready to deploy directly to **GitHub Pages**.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, category grid, featured collection, customer experience |
| Designs | `designs.html` | Full gallery with category filter and search |
| Product | `product.html` | Detail page with gallery, price calculator, customization, WhatsApp ordering |
| Contact | `contact.html` | Designer info, contact details, working hours, form, map |

## Structure

```
├── index.html
├── designs.html
├── product.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── products.js    ← edit this to add/change products
│   └── script.js
├── public/
│   ├── .nojekyll       ← tells GitHub Pages to serve files as-is
│   └── js/             ← static copies served as-is
└── vite.config.js
```

## Adding or Editing Products

Open `js/products.js`. Every product is one object inside the `PRODUCTS` array.
The file contains detailed comments explaining each field (name, images, prices,
materials, customization). Copy an existing product object, paste, and change
the values — the new design appears everywhere automatically.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch**, branch: `main`, folder: `/ (root)`.
4. Save. Your site goes live at `https://<username>.github.io/<repo>/`.

The `.nojekyll` file in `public/` ensures GitHub Pages serves all files
without Jekyll processing.

## Local Preview

```bash
npm install
npm run dev      # development
npm run build    # production build to dist/
npm run preview  # preview the build
```

## Brand Configuration

Edit the `BRAND` object at the top of `js/script.js` to change the boutique
name, phone, WhatsApp number, email, address, and social links in one place.

## Images

All photography is loaded from Pexels (license-free stock photos). Replace
the image URLs in `js/products.js` and the category list in `index.html`
with your own product photos when ready.
