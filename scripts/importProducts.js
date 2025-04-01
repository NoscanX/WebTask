const apiUrl = "https://brandstestowy.smallhost.pl/api/random";
let allProducts = [];
let currentPage = 1;
let isLoading = false;

const products = document.getElementById("section-bottom__products");
const selectLimit = document.getElementById("products-amount-limit");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup-close");
const popupTitle = document.getElementById("popup-title");
const popupImage = document.getElementById("popup-image");
const fetchTrigger = document.getElementById("section-mid__fetch-products-trigger");

async function fetchProducts() {
  if (isLoading) return;
  isLoading = true;

  const limit = parseInt(selectLimit.value, 10);
  
  try {
    const response = await fetch(`${apiUrl}?pageNumber=${currentPage}&pageSize=${limit}`);
    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Niepoprawny format odpowiedzi API");
    }

    allProducts = [...allProducts, ...data.data];
    displayProducts();
    currentPage++;
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
  } finally {
    isLoading = false;
  }
}

function displayProducts() {
  products.innerHTML = "";
  allProducts.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("section-bottom__products__item", "section-bottom__products__item--hover");
    div.innerHTML = `<h2 class="section__header">${item.text}</h2><img class="section-bottom__products__img" src="${item.image}" alt="${item.text}">`;
    div.addEventListener("click", () => openPopup(item));
    products.appendChild(div);
  });
}

selectLimit.addEventListener("change", () => {
  allProducts = [];
  currentPage = 1;
  fetchProducts();
});

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      fetchProducts();
    }
  },
  { threshold: 0.5 }
);

observer.observe(fetchTrigger);

function openPopup(item) {
  popupTitle.textContent = item.text;
  popupImage.src = item.image;
  popupImage.alt = item.text;
  popup.style.display = "flex";
}

popupClose.addEventListener("click", () => (popup.style.display = "none"));
window.addEventListener("click", (e) => e.target === popup && (popup.style.display = "none"));