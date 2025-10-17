

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



