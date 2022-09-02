const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  const res = await fetch(url)
  const data = await res.json()
  displayCategories(data.data.news_category)
}

const displayCategories = (categories) => {
  const categoriesBlog = document.getElementById('categories_blog')
  categories.forEach((category) => {
    console.log(category)
    const categoriesLi = document.createElement('button')
    categoriesLi.onclick = () => {}
    categoriesLi.classList.add('categories')
    categoriesLi.innerText = `
    
    ${category.category_name}
    
    `
    categoriesBlog.appendChild(categoriesLi)
  })
}

const loadFullDetails = async () => {
  const url = ` https://openapi.programming-hero.com/api/news/category/01`
  const res = await fetch(url)
  const data = await res.json()
  displayFullDetails(data.data)
}

const displayFullDetails = (details) => {
  const newsDetails = document.getElementById('news_details')
  details.forEach((detail) => {
    console.log(detail)
    const newsDiv = document.createElement('div')
    newsDiv.classList.add('card')
    newsDiv.classList.add('cards')
    newsDiv.innerHTML = `
    
    <div class="row g-0 d-flex justify-content-around align-items-center">
            <div class="col-sm-12 col-md-6 col-lg-4 thumbnail_img">
              <img src="${
                detail.thumbnail_url
              }" class="img-fluid rounded-start " alt="..." />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-8">
              <div class="card-body">
                <h5 class="card-title ">${detail.title}</h5>
                <p class="card-text card_details fst-italic text-secondary">
                 ${detail.details}
                </p>
                <div class="d-flex justify-content-between align-items-center ">
                <div class="d-flex justify-content-around align-items-center">
                <img class="authour_img" src="${detail.author.img}">
                <article class="author_details">
                <h5>${
                  detail.author.name ? detail.author.name : 'No author found'
                }</h5>
                <h6>${detail.author.published_date}</h6>
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
    newsDetails.appendChild(newsDiv)
  })
}

loadFullDetails()

loadCategories()
