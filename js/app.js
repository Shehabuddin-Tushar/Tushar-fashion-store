const loadProducts = () => {
  //const url = `https://fakestoreapi.com/products`;
    const url = `https://tushar-fashion-store.netlify.app/products.json`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product mr-5">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h5 class="rating">Rating: ${product.rating.rate} out of 5</h5>
      <h5>${product.rating.count} customer ratings</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button  id="details-btn" class="btn btn-danger" onclick="productDetails(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value.toFixed(2));
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
  updateTotal()
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
    
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
   
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
   
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};


/* single product details show */
let productDetails=async(id)=>{

  let response =await fetch(`https://fakestoreapi.com/products/${id}`);
  let data=await response.json();
  let details=document.querySelector(".product-details");

  details.innerHTML=`<div class="details-single-post">
                        <img src="${data.image}" alt="" height="200" width="250">
                        <h4><b>Title:</b>${data.title}</h4>
                        <h4><b>category: </b>${data.category}</h4>
                        <h4><b>Description:</b></h4>
                        <p>${data.description}</p>
                        <h4><b>Price: </b>${data.price}</h4>
                        <button class="btn btn-danger" onclick="detailsClose()">Close</button>
                     </div>`;
          

  

}

/*single product details close */
let detailsClose=()=>{

  let details=document.querySelector(".product-details");
  details.innerHTML="";

}