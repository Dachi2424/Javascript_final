

function showCartContainer(){
  let cartContainer = document.querySelector(".header__cart-container")
  cartContainer.classList.add("header__cart-container--open")
}

function closeCartContainer(){
  let cartContainer = document.querySelector(".header__cart-container")
  cartContainer.classList.remove("header__cart-container--open")
}


function openMenu(){
  let burgerMenu = document.querySelector(".header__menu")
  burgerMenu.classList.add("header__menu--open")
}
function closeMenu(){
  let burgerMenu = document.querySelector(".header__menu")
  burgerMenu.classList.remove("header__menu--open")
}