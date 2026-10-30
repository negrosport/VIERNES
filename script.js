const products = [
  {
    id: 1,
    name: "Lager Clásica",
    type: "lager",
    description: "Equilibrio perfecto entre cuerpo y frescura para todo tipo de celebración.",
    price: 1250,
  },
  {
    id: 2,
    name: "IPA Norte",
    type: "ipa",
    description: "Amargor intenso, aroma cítrico y carácter premium para paladares exigentes.",
    price: 1480,
  },
  {
    id: 3,
    name: "BierArg Roja",
    type: "artesanal",
    description: "Estilo artesanal con notas maltadas y un perfil distinto para la mesa.",
    price: 1620,
  },
  {
    id: 4,
    name: "Golden Ale",
    type: "lager",
    description: "Cuerpo suave y final limpio ideal para eventos y reuniones familiares.",
    price: 1340,
  },
  {
    id: 5,
    name: "Black IPA",
    type: "ipa",
    description: "Más intensidad, más aroma, un sabor potente y muy argentino.",
    price: 1690,
  },
  {
    id: 6,
    name: "Patagonia Malbec",
    type: "artesanal",
    description: "Una referencia artesanal con notas complejas y personalidad única.",
    price: 1750,
  },
];

const productsGrid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";
let cartTotal = 0;

function formatPrice(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);
}

function renderProducts() {
  const filteredProducts = currentFilter === "all"
    ? products
    : products.filter((product) => product.type === currentFilter);

  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-visual">
            <div class="product-bottle"></div>
          </div>
          <div class="product-body">
            <div class="product-meta">
              <span>${product.type}</span>
              <span>Premium</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
              <span class="price">${formatPrice(product.price)}</span>
              <button class="add-btn" data-id="${product.id}">Agregar</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  const addButtons = document.querySelectorAll(".add-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartTotal += 1;
      cartCount.textContent = cartTotal;
      button.textContent = "Agregado";
      button.disabled = true;
      setTimeout(() => {
        button.textContent = "Agregar";
        button.disabled = false;
      }, 800);
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    renderProducts();
  });
});

renderProducts();
