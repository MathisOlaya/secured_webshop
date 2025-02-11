document.getElementById("logoutHome").addEventListener("click", async () => {
  const res = await fetch(`/user/${username}/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log(data);
  if (data.success) {
    window.location.href = "/login";
  }
});

async function getProducts(){
  const response = await fetch('https://fakestoreapi.com/products', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json();

  return data;
}
async function addProduct(products) {
  const catalog = document.getElementById("catalog")

  products.map((product) => {
    //Product container
    const productClass = document.createElement('div');
    productClass.classList.add('product');

    //Img
    const img = document.createElement('img')
    img.src = product.image;
    img.alt = 'Image du produit'
    img.classList.add('product-image');
    productClass.appendChild(img)

    //Title
    const productTitle = document.createElement('h2');
    productTitle.classList.add('product-title');
    productTitle.textContent = product.title;
    productClass.appendChild(productTitle);

    // Créer et ajouter la catégorie du produit
    const productCategory = document.createElement('p');
    productCategory.classList.add('product-category');
    productCategory.textContent = product.category;
    productClass.appendChild(productCategory);

    // Créer et ajouter la description du produit
    const productDescription = document.createElement('p');
    productDescription.classList.add('product-description');
    productDescription.textContent = product.description;
    productClass.appendChild(productDescription);

    // Créer et ajouter le prix du produit
    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `Prix : ${product.price} €`;
    productClass.appendChild(productPrice);

    // Créer et ajouter la note du produit
    const productRating = document.createElement('div');
    productRating.classList.add('product-rating');
    const ratingScoreSpan = document.createElement('span');
    ratingScoreSpan.classList.add('rating-score');
    ratingScoreSpan.textContent = product.rating.rate;
    const ratingCountSpan = document.createElement('span');
    ratingCountSpan.classList.add('rating-count');
    ratingCountSpan.textContent = `(${product.rating.count} avis)`;
    productRating.appendChild(ratingScoreSpan);
    productRating.appendChild(ratingCountSpan);
    productClass.appendChild(productRating);

    // Ajouter le produit au conteneur de la grille
    catalog.appendChild(productClass);
  })
}

async function showProducts() {
  const data = await getProducts();
  addProduct(data)
}

showProducts();