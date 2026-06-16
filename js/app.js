(function () {
  "use strict";

  const STORAGE_KEY = "hytech_products";
  const whatsappNumber = "5511999999999";

  const moneyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  // Produtos iniciais gravados no navegador no primeiro acesso.
  const defaultProducts = [
    { id: 1, model: "iPhone 11", line: "11", capacity: "64GB", price: 1250, condition: "Seminovo", status: "Disponível", skin: "skin-white" },
    { id: 2, model: "iPhone 12", line: "12", capacity: "64GB", price: 1690, condition: "Seminovo", status: "Disponível", skin: "skin-blue" },
    { id: 3, model: "iPhone 12", line: "12", capacity: "128GB", price: 1830, condition: "Seminovo", status: "Disponível", skin: "skin-green" },
    { id: 4, model: "iPhone 12 Pro", line: "12", capacity: "128GB", price: 1900, condition: "Seminovo", status: "Disponível", skin: "skin-black" },
    { id: 5, model: "iPhone 13", line: "13", capacity: "128GB", price: 1950, condition: "Seminovo", status: "Disponível", skin: "skin-pink" },
    { id: 6, model: "iPhone 13 Pro", line: "13", capacity: "128GB", price: 2750, condition: "Seminovo", status: "Disponível", skin: "skin-olive" },
    { id: 7, model: "iPhone 13 Pro", line: "13", capacity: "256GB", price: 2850, condition: "Seminovo", status: "Disponível", skin: "skin-olive" },
    { id: 8, model: "iPhone 13 Pro Max", line: "13", capacity: "128GB", price: 2950, condition: "Seminovo", status: "Disponível", skin: "skin-olive" },
    { id: 9, model: "iPhone 13 Pro Max", line: "13", capacity: "512GB", price: 3250, condition: "Seminovo", status: "Disponível", skin: "skin-olive" },
    { id: 10, model: "iPhone 14", line: "14", capacity: "128GB", price: 2290, condition: "Seminovo", status: "Disponível", skin: "skin-silver" },
    { id: 11, model: "iPhone 14 Plus", line: "14", capacity: "128GB", price: 2490, condition: "Seminovo", status: "Disponível", skin: "skin-silver" },
    { id: 12, model: "iPhone 14 Pro", line: "14", capacity: "128GB", price: 3050, condition: "Seminovo", status: "Disponível", skin: "skin-purple" },
    { id: 13, model: "iPhone 14 Pro", line: "14", capacity: "256GB", price: 3290, condition: "Seminovo", status: "Disponível", skin: "skin-purple" },
    { id: 14, model: "iPhone 14 Pro Max", line: "14", capacity: "128GB", price: 3690, condition: "Seminovo", status: "Disponível", skin: "skin-purple" },
    { id: 15, model: "iPhone 15", line: "15", capacity: "128GB", price: 3190, condition: "Novo", status: "Disponível", skin: "skin-silver" },
    { id: 16, model: "iPhone 15 Plus", line: "15", capacity: "128GB", price: 3690, condition: "Novo", status: "Disponível", skin: "skin-silver" },
    { id: 17, model: "iPhone 15 Pro", line: "15", capacity: "128GB", price: 3990, condition: "Novo", status: "Disponível", skin: "skin-purple" },
    { id: 18, model: "iPhone 15 Pro", line: "15", capacity: "256GB", price: 4190, condition: "Novo", status: "Disponível", skin: "skin-purple" },
    { id: 19, model: "iPhone 15 Pro Max", line: "15", capacity: "256GB", price: 4690, condition: "Novo", status: "Disponível", skin: "skin-black" },
    { id: 20, model: "iPhone 15 Pro Max", line: "15", capacity: "512GB", price: 4990, condition: "Novo", status: "Disponível", skin: "skin-black" },
    { id: 21, model: "iPhone 16", line: "16", capacity: "128GB", price: 4190, condition: "Novo", status: "Disponível", skin: "skin-silver" },
    { id: 22, model: "iPhone 16 Plus", line: "16", capacity: "128GB", price: 4590, condition: "Novo", status: "Disponível", skin: "skin-silver" },
    { id: 23, model: "iPhone 16 Pro", line: "16", capacity: "128GB", price: 4990, condition: "Novo", status: "Disponível", skin: "skin-black" },
    { id: 24, model: "iPhone 16 Pro", line: "16", capacity: "256GB", price: 5190, condition: "Novo", status: "Disponível", skin: "skin-black" },
    { id: 25, model: "iPhone 16 Pro Max", line: "16", capacity: "256GB", price: 5890, condition: "Novo", status: "Disponível", skin: "skin-black" },
    { id: 26, model: "iPhone 17 Air", line: "17", capacity: "256GB", price: 5290, condition: "Novo", status: "Disponível", skin: "skin-silver" },
    { id: 27, model: "iPhone 17 Pro", line: "17", capacity: "256GB", price: 7700, condition: "Novo", status: "Disponível", skin: "skin-purple" }
  ];

  let catalogEventsReady = false;
  let adminEventsReady = false;

  const productImageMap = {
    "iphone 11": "assets/products/catalog/iphone-11.png",
    "iphone 12": "assets/products/catalog/iphone-12.png",
    "iphone 12 pro": "assets/products/catalog/iphone-12-pro.png",
    "iphone 13": "assets/products/catalog/iphone-13.png",
    "iphone 13 pro": "assets/products/catalog/iphone-13-pro.png",
    "iphone 13 pro max": "assets/products/catalog/iphone-13-pro-max.png",
    "iphone 14": "assets/products/catalog/iphone-14.png",
    "iphone 14 plus": "assets/products/catalog/iphone-14-plus.png",
    "iphone 14 pro": "assets/products/catalog/iphone-14-pro.png",
    "iphone 14 pro max": "assets/products/catalog/iphone-14-pro-max.png",
    "iphone 15": "assets/products/catalog/iphone-15.png",
    "iphone 15 plus": "assets/products/catalog/iphone-15-plus.png",
    "iphone 15 pro": "assets/products/catalog/iphone-15-pro.png",
    "iphone 15 pro max": "assets/products/catalog/iphone-15-pro-max.png",
    "iphone 16": "assets/products/catalog/iphone-16.png",
    "iphone 16 plus": "assets/products/catalog/iphone-16-plus.png",
    "iphone 16 pro": "assets/products/catalog/iphone-16-pro.png",
    "iphone 16 pro max": "assets/products/catalog/iphone-16-pro-max.png",
    "iphone 17 air": "assets/products/catalog/iphone-17-air.png",
    "iphone 17 pro": "assets/products/catalog/iphone-17-pro.png"
  };

  function normalizeProduct(product) {
    return {
      ...product,
      stock: Number.isFinite(Number(product.stock)) ? Math.max(0, Number(product.stock)) : 1,
      image: product.image || ""
    };
  }

  function normalizeProducts(products) {
    return products.map(normalizeProduct);
  }

  // Lê o estoque local ou inicializa com os produtos padrão.
  function getProducts() {
    const storedProducts = localStorage.getItem(STORAGE_KEY);

    if (!storedProducts) {
      const products = normalizeProducts(defaultProducts);
      saveProducts(products);
      return products;
    }

    try {
      const products = JSON.parse(storedProducts);
      return Array.isArray(products) ? normalizeProducts(products) : normalizeProducts(defaultProducts);
    } catch (error) {
      console.error("Não foi possível ler os produtos salvos.", error);
      return normalizeProducts(defaultProducts);
    }
  }

  // Persiste o estoque atualizado no navegador.
  function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  // Mantém todos os valores no padrão de moeda brasileira.
  function formatPrice(value) {
    return moneyFormatter.format(Number(value) || 0);
  }

  // Monta a mensagem pronta de interesse para cada aparelho.
  function getWhatsappLink(product) {
    const message = `Olá, HY TECH! Tenho interesse neste aparelho:

Modelo: ${product.model}
Capacidade: ${product.capacity}
Condição: ${product.condition}
Preço: ${formatPrice(product.price)}

Ele ainda está disponível?`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function normalizeKey(value) {
    return normalizeText(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function parsePrice(value) {
    const cleanValue = String(value || "").replace(/[^\d.,]/g, "");

    if (cleanValue.includes(",") && cleanValue.includes(".")) {
      return Number(cleanValue.replace(/\./g, "").replace(",", ".")) || 0;
    }

    if (cleanValue.includes(",")) {
      return Number(cleanValue.replace(",", ".")) || 0;
    }

    return Number(cleanValue) || 0;
  }

  function statusClass(status) {
    const statusKey = normalizeKey(status);

    if (statusKey.includes("dispon")) {
      return "available";
    }

    if (statusKey.includes("reserv")) {
      return "reserved";
    }

    return "sold";
  }

  function isAvailableProduct(product) {
    return normalizeKey(product.status).includes("dispon");
  }

  function isSoldProduct(product) {
    return normalizeKey(product.status).includes("vend");
  }

  function getStockLabel(product) {
    const stock = Number(product.stock) || 0;
    return stock === 1 ? "1 disponível" : `${stock} disponíveis`;
  }

  function getProductImage(product) {
    if (product.image) {
      return product.image;
    }

    const model = normalizeText(product.model);

    if (productImageMap[model]) {
      return productImageMap[model];
    }

    if (model.includes("17 pro")) {
      return "assets/products/transparent/iphone-card-40-17pro-202509.png";
    }

    if (model.includes("17 air")) {
      return "assets/products/transparent/iphone-card-40-17air-202509.png";
    }

    if (product.line === "17") {
      return "assets/products/transparent/iphone-card-40-17-202509.png";
    }

    if (product.line === "16") {
      return "assets/products/transparent/iphone16-digitalmat-gallery-3-202409.png";
    }

    if (model.includes("pro")) {
      return "assets/products/transparent/iphone-17pro-digitalmat-gallery-1-202509.png";
    }

    if (model.includes("plus")) {
      return "assets/products/transparent/iphone-air-digitalmat-gallery-1-202509.png";
    }

    return "assets/products/transparent/iphone-17-digitalmat-gallery-1-202509.png";
  }

  function getGenericWhatsappLink() {
    const message = "Olá, HY TECH! Vim pelo catálogo e gostaria de atendimento.";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  // Aplica busca e selects da página principal.
  function getFilteredProducts() {
    const searchInput = document.getElementById("searchInput");
    const lineFilter = document.getElementById("lineFilter");
    const capacityFilter = document.getElementById("capacityFilter");
    const conditionFilter = document.getElementById("conditionFilter");

    const search = normalizeText(searchInput?.value);
    const line = lineFilter?.value || "";
    const capacity = capacityFilter?.value || "";
    const condition = conditionFilter?.value || "";

    return getProducts()
      .filter((product) => !isSoldProduct(product))
      .filter((product) => {
        const model = normalizeText(product.model);
        const productCapacity = normalizeText(product.capacity);
        return !search || model.includes(search) || productCapacity.includes(search);
      })
      .filter((product) => !line || product.line === line)
      .filter((product) => !capacity || product.capacity === capacity)
      .filter((product) => !condition || product.condition === condition);
  }

  function bindCatalogEvents() {
    if (catalogEventsReady) {
      return;
    }

    ["searchInput", "lineFilter", "capacityFilter", "conditionFilter"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", renderCatalog);
    });

    document.getElementById("clearFilters")?.addEventListener("click", () => {
      document.getElementById("filtersForm")?.reset();
      renderCatalog();
    });

    document.querySelectorAll("#headerWhatsapp, #floatingWhatsapp").forEach((link) => {
      link.href = getGenericWhatsappLink();
    });

    catalogEventsReady = true;
  }

  // Renderiza os cards do catálogo quando a página principal estiver aberta.
  function renderCatalog() {
    const productsGrid = document.getElementById("productsGrid");

    if (!productsGrid) {
      return;
    }

    bindCatalogEvents();

    const products = getFilteredProducts();

    if (!products.length) {
      productsGrid.innerHTML = '<div class="empty-state">Nenhum aparelho encontrado com os filtros selecionados.</div>';
      return;
    }

    productsGrid.innerHTML = products.map((product) => `
      <article class="product-card">
        <div class="product-visual">
          <img
            class="product-photo"
            src="${escapeHtml(getProductImage(product))}"
            alt="${escapeHtml(product.model)}"
            loading="lazy"
            onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
          >
          <div class="mini-phone ${escapeHtml(product.skin)}" hidden aria-hidden="true"></div>
        </div>
        <div class="product-info">
          <h3>${escapeHtml(product.model)}</h3>
          <p class="product-capacity">${escapeHtml(product.capacity)}</p>
          <p class="product-condition">${escapeHtml(product.condition)}</p>
          <p class="product-stock">Estoque: ${escapeHtml(getStockLabel(product))}</p>
          <span class="status-badge ${statusClass(product.status)}">${escapeHtml(product.status)}</span>
          <div class="product-price">${formatPrice(product.price)}</div>
          <a class="btn interest-btn" href="${getWhatsappLink(product)}" target="_blank" rel="noopener">
            <span class="whatsapp-icon" aria-hidden="true">W</span>
            TENHO INTERESSE
          </a>
        </div>
      </article>
    `).join("");
  }

  // Coleta os campos do formulário de cadastro/edição.
  function getFormProduct() {
    const editId = document.getElementById("editId")?.value;

    return {
      id: editId ? Number(editId) || editId : Date.now(),
      model: document.getElementById("model")?.value.trim() || "",
      line: document.getElementById("line")?.value || "",
      capacity: document.getElementById("capacity")?.value || "",
      price: parsePrice(document.getElementById("price")?.value),
      stock: Math.max(0, Number.parseInt(document.getElementById("stock")?.value || "0", 10) || 0),
      condition: document.getElementById("condition")?.value || "",
      status: document.getElementById("status")?.value || "Disponível",
      skin: document.getElementById("skin")?.value || "skin-white",
      image: document.getElementById("thumbnailData")?.value ||
        document.getElementById("thumbnailUrl")?.value.trim() ||
        document.getElementById("currentImage")?.value ||
        ""
    };
  }

  function fillForm(product) {
    document.getElementById("editId").value = product.id;
    document.getElementById("model").value = product.model;
    document.getElementById("line").value = product.line;
    document.getElementById("capacity").value = product.capacity;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = Number(product.stock) || 0;
    document.getElementById("condition").value = product.condition;
    document.getElementById("status").value = product.status;
    document.getElementById("skin").value = product.skin;
    document.getElementById("thumbnailUrl").value = product.image && !product.image.startsWith("data:") ? product.image : "";
    document.getElementById("currentImage").value = product.image || "";
    document.getElementById("thumbnailData").value = "";
    renderThumbnailPreview(product.image || getProductImage(product));
    document.getElementById("model").focus();
  }

  function renderThumbnailPreview(image) {
    const preview = document.getElementById("thumbnailPreview");
    if (!preview) {
      return;
    }

    if (!image) {
      preview.innerHTML = "<span>Sem miniatura personalizada</span>";
      return;
    }

    preview.innerHTML = `<img src="${escapeHtml(image)}" alt="Prévia da miniatura">`;
  }

  function clearForm() {
    document.getElementById("productForm")?.reset();
    document.getElementById("editId").value = "";
    document.getElementById("currentImage").value = "";
    document.getElementById("thumbnailData").value = "";
    renderThumbnailPreview("");
  }

  // Atualiza os indicadores do painel administrativo.
  function updateDashboard(products) {
    const availableProducts = products.filter(isAvailableProduct);
    const availableUnits = availableProducts.reduce((total, product) => total + (Number(product.stock) || 0), 0);
    const availableStockValue = availableProducts.reduce((total, product) => {
      return total + (Number(product.price || 0) * (Number(product.stock) || 0));
    }, 0);

    document.getElementById("totalProducts").textContent = products.length;
    document.getElementById("availableProducts").textContent = availableUnits;
    document.getElementById("availableStockValue").textContent = formatPrice(availableStockValue);
  }

  function renderAdminTable(products) {
    const table = document.getElementById("adminProductsTable");

    if (!products.length) {
      table.innerHTML = '<tr><td colspan="7">Nenhum aparelho cadastrado.</td></tr>';
      return;
    }

    table.innerHTML = products.map((product) => `
      <tr>
        <td>${escapeHtml(product.model)}</td>
        <td>${escapeHtml(product.capacity)}</td>
        <td>${formatPrice(product.price)}</td>
        <td>${escapeHtml(product.stock)}</td>
        <td>${escapeHtml(product.condition)}</td>
        <td><span class="status-badge ${statusClass(product.status)}">${escapeHtml(product.status)}</span></td>
        <td>
          <div class="table-actions">
            <button class="table-btn edit-btn" type="button" data-action="edit" data-id="${escapeHtml(product.id)}">Editar</button>
            <button class="table-btn delete-btn" type="button" data-action="delete" data-id="${escapeHtml(product.id)}">Excluir</button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  function bindAdminEvents() {
    if (adminEventsReady) {
      return;
    }

    const form = document.getElementById("productForm");
    const table = document.getElementById("adminProductsTable");

    form?.addEventListener("submit", (event) => {
      event.preventDefault();

      const product = getFormProduct();
      const products = getProducts();
      const editId = document.getElementById("editId").value;

      if (!product.model || !product.line || !product.capacity || !product.price) {
        alert("Preencha modelo, linha, capacidade e preço.");
        return;
      }

      if (editId) {
        const index = products.findIndex((item) => String(item.id) === String(editId));
        if (index >= 0) {
          products[index] = product;
        }
      } else {
        products.push(product);
      }

      saveProducts(products);
      clearForm();
      renderAdmin();
      renderCatalog();
    });

    document.getElementById("cancelEdit")?.addEventListener("click", clearForm);

    document.getElementById("thumbnailUrl")?.addEventListener("input", (event) => {
      document.getElementById("thumbnailData").value = "";
      renderThumbnailPreview(event.target.value.trim());
    });

    document.getElementById("thumbnailFile")?.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        document.getElementById("thumbnailData").value = String(reader.result || "");
        document.getElementById("thumbnailUrl").value = "";
        renderThumbnailPreview(String(reader.result || ""));
      });
      reader.readAsDataURL(file);
    });

    table?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");

      if (!button) {
        return;
      }

      const products = getProducts();
      const product = products.find((item) => String(item.id) === String(button.dataset.id));

      if (!product) {
        return;
      }

      if (button.dataset.action === "edit") {
        fillForm(product);
        return;
      }

      if (button.dataset.action === "delete" && confirm(`Excluir ${product.model} do catálogo?`)) {
        saveProducts(products.filter((item) => String(item.id) !== String(product.id)));
        clearForm();
        renderAdmin();
        renderCatalog();
      }
    });

    adminEventsReady = true;
  }

  // Renderiza tabela e controles quando a página admin estiver aberta.
  function renderAdmin() {
    const table = document.getElementById("adminProductsTable");

    if (!table) {
      return;
    }

    bindAdminEvents();

    const products = getProducts();
    updateDashboard(products);
    renderAdminTable(products);
  }

  renderCatalog();
  renderAdmin();
})();
