import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        designs: resolve(__dirname, "designs.html"),
        product: resolve(__dirname, "product.html"),
        contact: resolve(__dirname, "contact.html"),
        admin: resolve(__dirname, "admin.html"),
        dashboard: resolve(__dirname, "dashboard.html"),
      },
    },
  },
});
