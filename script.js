function showLogin(){
  let login = document.querySelector(".login")
  let background = document.querySelector(".login__background")
  background.style.display = "unset"
  login.classList.add("login--show")
  closeMenu()
}

function closeLogin(){
  let login = document.querySelector(".login")
  let background = document.querySelector(".login__background")
  background.style.display = "none"
  login.classList.remove("login--show")
  
}

//login logic
function login(e){
  e.preventDefault()

  let formInfo = new FormData(e.target)
  let finalForm = Object.fromEntries(formInfo)

  fetch("https://api.everrest.educata.dev/auth/sign_in", {
    method: "POST",
    headers:{
      accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(finalForm)
  }).then(res => res.json())
  .then((data) => {
    Cookies.set('user', data.access_token)
  })
  .catch(err => console.error(err))
}



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


//main page favorites
let favoritesSection = document.querySelector(".favorites")
let favoritesContainer = document.querySelector(".favorites__container")
fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
.then(res => res.json())
.then(data => {for(i = 0; i <= 2; i++){
  favoritesContainer.innerHTML += addCard(data[i])
}})

function addCard(item){
  return `<div class="favorites__card">
          <img class="favorites__img" src="${item.image}" alt="">
          <h2 class="favorites__product-name">${item.name.toUpperCase()}</h2>
        </div>`
}




const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add a class when section becomes visible
      favoritesContainer.classList.add('animate')
      
      // Optional: stop observing once animation starts
      observer.unobserve(favoritesContainer)
    }
  })
}, {
  threshold: 0 // 30% visible before triggering
})
observer.observe(favoritesContainer)





function scrollLef(){
  let container = document.querySelector(".slider__grid-container")
  container.scrollBy({
    left: -350
  })
}
function scrollRight(){
  let container = document.querySelector(".slider__grid-container")
  container.scrollBy({
    left: 350
  })
}





//sidecart functions
let sideCart = document.querySelector(".header__cart-container")

function showSideCart(){
  sideCart.innerHTML = `<span class="header__cart-text">Cart <span class="header__cart-items-quantity">(0 items)</span> <i onclick="closeCartContainer()" class="fa-solid fa-xmark header__cart-xmark"></i></span>
        <div class="header__cart-strip"></div>`

fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
.then(res => res.json())
.then(data => {
  if(data.length === 0){
    sideCart.innerHTML += `<p class="header__empty-cart-text">Your cart is empty</p>`
    
  } else {
    data.forEach(item => sideCart.innerHTML += sideCartProduct(item))
  }
})
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