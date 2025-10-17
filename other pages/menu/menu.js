
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