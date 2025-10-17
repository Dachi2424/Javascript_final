
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





let mobileSelect = document.getElementById("mobileSelect")
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
.then( res => res.json())
.then(data => data.forEach(item => mobileSelect.innerHTML += `<option value="${item.id}">${item.name}</option>`))


let categories = document.querySelector(".menu__categories")
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
.then(res => res.json())
.then(data => data.forEach(category => categories.innerHTML += `<li onclick="setCategory(${category.id})" class="menu__category">${category.name.toUpperCase()}</li>`))
//needs a function




