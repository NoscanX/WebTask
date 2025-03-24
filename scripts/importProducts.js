const apiUrl = "https://brandstestowy.smallhost.pl/api/random";
const pageSize = 50;
let allProducts = [];

const products = document.getElementById("section-bottom__products");
const selectLimit = document.getElementById("products-amount-limit");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup-close");
const popupTitle = document.getElementById("popup-title");
const popupImage = document.getElementById("popup-image");
const fetchTrigger = document.getElementById(
  "section-mid__fetch-products-trigger"
);

let hasFetched = false;

async function fetchAllProducts() {
  if (hasFetched) return;
  hasFetched = true;

  try {
    const firstResponse = await fetch(
      `${apiUrl}?pageNumber=1&pageSize=${pageSize}`
    );
    const firstData = await firstResponse.json();

    if (!firstData.data || !Array.isArray(firstData.data)) {
      throw new Error("Niepoprawny format odpowiedzi API");
    }

    const totalPages = firstData.totalPages;
    const requests = [];

    for (let page = 2; page <= totalPages; page++) {
      requests.push(
        fetch(`${apiUrl}?pageNumber=${page}&pageSize=${pageSize}`).then((res) =>
          res.json()
        )
      );
    }

    const responses = await Promise.all(requests);
    allProducts = firstData.data.concat(...responses.map((r) => r.data || []));

    displayProducts();
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
  }
}

function displayProducts() {
  products.innerHTML = "";

  const limit =
    selectLimit.value === "all"
      ? allProducts.length
      : parseInt(selectLimit.value, 10);
  allProducts.slice(0, limit).forEach((item) => {
    const div = document.createElement("div");
    div.classList.add(
      "section-bottom__products__item",
      "section-bottom__products__item--hover"
    );
    div.innerHTML = `<h2 class="section__header">${item.text}</h2><img class="section-bottom__products__img" src="${item.image}" alt="${item.text}">`;
    div.addEventListener("click", () => openPopup(item));
    products.appendChild(div);
  });
}

function openPopup(item) {
  popupTitle.textContent = item.text;
  popupImage.src = item.image;
  popupImage.alt = item.text;
  popup.style.display = "flex";
}

popupClose.addEventListener("click", () => (popup.style.display = "none"));
window.addEventListener(
  "click",
  (e) => e.target === popup && (popup.style.display = "none")
);
selectLimit.addEventListener("change", displayProducts);

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      fetchAllProducts();
      observer.disconnect();
    }
  },
  { threshold: 0.5 }
);

observer.observe(fetchTrigger);
