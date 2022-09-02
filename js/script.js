const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  const res = await fetch(url)
  const data = await res.json()
  displayCategories(data.data.news_category)
}

const displayCategories = (categories) => {
  const categoriesBlog = document.getElementById('categories_blog')
  categories.forEach((category) => {
    const noNews = document.getElementById('no_news_message')
    if (category === 0) {
      noNews.classList.remove('d-none')
    } else {
      noNews.classList.add('d-none')
    }
    console.log(category)
    const categoriesLi = document.createElement('button')
    categoriesLi.onclick = () => {
      loadFullDetails(
        category.category_id ? category.category_id : 'No News Found'
      )
    }
    categoriesLi.classList.add('categories')
    categoriesLi.innerText = `
    
    ${category.category_name}
    
    `
    categoriesBlog.appendChild(categoriesLi)
  })
}

const loadFullDetails = async (categoriesId) => {
  const url = ` https://openapi.programming-hero.com/api/news/category/${categoriesId}`
  const res = await fetch(url)
  const data = await res.json()
  displayFullDetails(data.data)
}

const displayFullDetails = (details) => {
  const newsDetails = document.getElementById('news_details')
  newsDetails.textContent = ``
  details.forEach((detail) => {
    console.log(detail)
    const newsDiv = document.createElement('div')
    newsDiv.classList.add('card')
    newsDiv.classList.add('cards')
    newsDiv.innerHTML = `
    
    <div data-bs-toggle="modal"
          data-bs-target="#cardModal"  class="row g-0 d-flex justify-content-around align-items-center" >
            <div class="col-sm-12 col-md-6 col-lg-4 thumbnail_img">
              <img src="${
                detail.thumbnail_url
              }" class="img-fluid rounded-start " alt="..." />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-8">
              <div class="card-body">
                <h5 class="card-title ">${detail.title}</h5>
                <p class="card-text card_details fst-italic text-secondary">
                 ${detail.details.slice(0, 500)}
                </p>
                <div class="d-flex justify-content-between align-items-center ">
                <div class="d-flex justify-content-around align-items-center">
                <img class="authour_img" src="${detail.author.img}">
                <article class="author_details">
                <h5>${
                  detail.author.name ? detail.author.name : 'No author found'
                }</h5>
                <h6>${
                  detail.author.published_date
                    ? detail.author.published_date
                    : 'No published date found'
                }</h6>
                </article>
                </div>
                <div class="d-flex align-items-center justify-content-around">
                <i class="fa-solid fa-eye"></i>
                <h6 class="views">${
                  detail.total_view ? detail.total_view : 'No View'
                }</h6>
                </div>
                <div>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                </div>
                <i class="fa-solid fa-arrow-right"></i>
                <a href=""></a>
                </div>
              </div>
            </div>
          </div>
    `
    const modalTitle = document.getElementById('cardModalLabel')
    modalTitle.innerText = 'Answering Questions'
    const modalBody = document.getElementById('modal_body')
    modalBody.innerHTML = `
    
    <h5>01.What is the difference between var,let and const?</h5>
    <p> <span class="fw-bold">Ans :</span> All three of these three keywords have similarities in their syntax for declaring variables. However, they differ in their usage and scope.</p>

    <h5>02.What is the difference between arrow function and regular function?</h5>
    <p> <span class="fw-bold">Ans :</span> Unlike regular functions, arrow functions do not have their own this . The value of this inside an arrow function remains the same throughout the lifecycle of the function and is always bound to the value of this in the closest non-arrow parent function..</p>


    <h5>03.What is the difference between map, forEach,filter and find?</h5>
    <p> <span class="fw-bold">Ans :</span> The forEach() method does not create a new array based on the given array. The map() method creates an entirely new array. The forEach() method returns “undefined“. The map() method returns the newly created array according to the provided callback function.</p>


    <h5>04.Why should we use template string?</h5>
    <p> <span class="fw-bold">Ans :</span> Template strings are a powerful feature of modern JavaScript released in ES6. It lets us insert/interpolate variables and expressions into strings without needing to concatenate like in older versions of JavaScript. It allows us to create strings that are complex and contain dynamic elements.</p>
    `
    newsDetails.appendChild(newsDiv)
  })
}

loadCategories()
