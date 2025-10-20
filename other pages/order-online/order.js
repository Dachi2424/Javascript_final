
function showCartContainer(){
  let cartContainer = document.querySelector(".header__cart-container")
  let darkBg = document.querySelector(".header__dark-bg")
  cartContainer.classList.add("header__cart-container--open")
  darkBg.style.display = "unset"
}

function closeCartContainer(){
  let cartContainer = document.querySelector(".header__cart-container")
  let darkBg = document.querySelector(".header__dark-bg")  
  cartContainer.classList.remove("header__cart-container--open")
  darkBg.style.display = "none"
}


function openMenu(){
  let burgerMenu = document.querySelector(".header__menu")
  burgerMenu.classList.add("header__menu--open")
}
function closeMenu(){
  let burgerMenu = document.querySelector(".header__menu")
  burgerMenu.classList.remove("header__menu--open")
}





function openMobileFilter(){
  let filterMobile = document.querySelector(".mobile-filter")
  let darkBg = document.querySelector(".menu__dark-bg")
  filterMobile.classList.add("mobile-filter--active")
  darkBg.classList.add("menu__dark-bg--active")
}

function hideMobileFilter(){
  let filterMobile = document.querySelector(".mobile-filter")
  let darkBg = document.querySelector(".menu__dark-bg")
  filterMobile.classList.remove("mobile-filter--active")
  darkBg.classList.remove("menu__dark-bg--active")
}



let categories = document.querySelector(".menu__categories")
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
.then(res => res.json())
.then(data => data.forEach(category => categories.innerHTML += `<li onclick="setCategory(${category.id})" class="menu__category">${category.name.toUpperCase()}</li>`))
//needs a function


function setCategory(id){
  menuContainer.innerHTML = ""
  fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
  .then(res => res.json())
  .then(data => data.products.forEach(item => menuContainer.innerHTML += card(item)))
}



let mobileSelect = document.getElementById("mobileSelect")
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
.then( res => res.json())
.then(data => data.forEach(item => mobileSelect.innerHTML += `<option value="${item.id}">${item.name}</option>`))

let desktopSelect = document.getElementById("desktopSelect")
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
.then(res => res.json())
.then(data => data.forEach(item => desktopSelect.innerHTML += `<option value="${item.id}">${item.name}</option>`))









let menuContainer = document.querySelector(".menu__container")
function showAll(){
menuContainer.innerHTML = ""
fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
.then(res => res.json())
.then(data => data.forEach(product => menuContainer.innerHTML += card(product)))
}

showAll()


function card(product){
  return `<div class="menu__product-card">
            <img class="menu__product-image" src="${product.image}" alt="${product.name}">
            <div class="menu__product-lower-side">
              <h2 class="menu__product-name">${product.name}</h2>
              <div class="menu__vegnut-container">
                <p class="menu__product-vegeterian">Vegeterian <i style="color: ${product.vegeterian ? 'green' : 'darkred'}" class="fa-solid fa-${product.vegeterian ? 'check' : 'x'}"></i></p>
                <p class="menu__product-nuts">Nuts <i style="color: ${product.nuts ? 'green' : 'darkred'}" class="fa-solid fa-${product.nuts ? 'check' : 'x'}"></i></p>
              </div>
              <p class="menu__product-spiciness">Spiciness Level: ${product.spiciness}</p>
              <p class="menu__product-price">$${product.price}</p>
            </div>
            <button onclick="addToCart(${product.id}, ${product.price})" class="menu__cart-btn">ADD TO CART</button>
          </div>`
}





function applyFilter(){
  let vegeterian = document.getElementById("vegeterian")
  let nuts = document.getElementById("nuts")
  let spiciness = document.getElementById("spiciness")
  let category = document.getElementById("mobileSelect")

  menuContainer.innerHTML = ""
  fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian.checked}&nuts=${nuts.checked}&spiciness=${spiciness.value}&categoryId=${category.value}`)
  .then(res => res.json())
  .then(data => data.forEach( item => menuContainer.innerHTML += card(item)))
}

function applyFilterDesktop(){
  let vegeterian = document.getElementById("dvegeterian")
  let nuts = document.getElementById("dnuts")
  let spiciness = document.getElementById("dspiciness")
  let category = document.getElementById("desktopSelect")

  menuContainer.innerHTML = ""
  fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian.checked}&nuts=${nuts.checked}&spiciness=${spiciness.value}&categoryId=${category.value}`)
  .then(res => res.json())
  .then(data => data.forEach( item => menuContainer.innerHTML += card(item)))
}









//sidecart functions
let sideCart = document.querySelector(".header__cart-container")

//get

function showSideCart(){
fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
.then(res => res.json())
.then(data => data.forEach(item => sideCart.innerHTML += sideCartProduct(item)))
.catch(err => console.error("Error loading cart:", err))
}

showSideCart()


function sideCartProduct(item){
  return `<div class="header__cart-product-card">
          <img class="header__card-product-image" src="${item.product.image}" alt="">
          <div class="header__card-right-side">
            <p class="header__card-product-name">${item.product.name}</p>
            <p class="header__card-price">$${item.product.price}</p>
            <div class="header__card-quantity-container">
              <button onclick="updateQuantity(${item.product.id},${item.quantity - 1})" class="header__card-quantity-button">-</button>
              <p class="header__card-quantity">${item.quantity}</p>
              <button onclick="updateQuantity(${item.product.id}, ${item.quantity + 1})" class="header__card-quantity-button">+</button>
            </div>
            <button onclick="deleteFromCart(${item.product.id})" class="header__card-delete-btn">Delete</button>
          </div>
        </div>`
}


//post

function addToCart(id, price){
  sideCart.innerHTML = `<span class="header__cart-text">Cart <span class="header__cart-items-quantity">(0 items)</span> <i onclick="closeCartContainer()" class="fa-solid fa-xmark header__cart-xmark"></i></span>
        <div class="header__cart-strip"></div>`

  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  .then(res => res.json())
  .then(data => {
    const existingItem = data.find(item => item.product.id === id);

    if(existingItem){
      const newQuantity = existingItem.quantity + 1 ;
      return fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
        method: "PUT",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: id,
          quantity: newQuantity,
        })
      }).then(() => showSideCart())
    } else{
      return fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: 1,
          price: price,
          productId: id
        })
      }).then(() => {
        showSideCart();
        alert("Cart updated successfully")
      })
      .catch(err => console.err("Error adding to cart:", err));
    }
  })

  fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
    method: "POST",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cartInfo)
  }).then(res => res.json())
  .then(() => {
    alert("Succesfully added to cart")
    showSideCart()
  })
  .catch(err => console.error("Add t0 cart failed:", err))
}

//delete

function deleteFromCart(id){
  sideCart.innerHTML = `<span class="header__cart-text">Cart <span class="header__cart-items-quantity">(0 items)</span> <i onclick="closeCartContainer()" class="fa-solid fa-xmark header__cart-xmark"></i></span>
        <div class="header__cart-strip"></div>`
  
  fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
    method: "DELETE",
    headers: {
      accept: "*/*"
    }
  }).then(res => res.text())
  .then(() => {
    showSideCart()
  })
  .catch(() => console.error("error"))
}




//put

function updateQuantity(id, quantity){

  if (quantity < 1) return deleteFromCart(id);

  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: {
      accept: "*/*",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productId: id,
      quantity: quantity
    }) 
  }).then(res => {
    if(!res.ok) throw new Error("Failed to update quantity");
    return res.text();
  }
  )
  .then(() => {
    sideCart.innerHTML = `<span class="header__cart-text">Cart <span class="header__cart-items-quantity">(0 items)</span> <i onclick="closeCartContainer()" class="fa-solid fa-xmark header__cart-xmark"></i></span>
        <div class="header__cart-strip"></div>`;
        showSideCart()
        console.log(quantity);
        
  })
  .catch(err => console.error("Failed updating basket", err))

}


