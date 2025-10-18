
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
            <button class="menu__cart-btn">ADD TO CART</button>
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

