const loadCategories = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayCategories(data.data.news_category)
  } catch (e) {
    alert('Please check..')
  }
}

const displayCategories = (categories) => {
  const categoriesBlog = document.getElementById('categories_blog')
  categories.forEach((category) => {
    const categoriesLi = document.createElement('button')
    categoriesLi.onclick = () => {
      const footer = document.getElementById('footer')
      footer.classList.remove('d-none')
      toggleSpinner(true)
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
  try {
    const url = ` https://openapi.programming-hero.com/api/news/category/${categoriesId}`
    const res = await fetch(url)
    const data = await res.json()
    displayFullDetails(data.data)
  } catch (err) {
    alert('Something went wrong')
  }
}

const displayFullDetails = (details) => {
  details.sort((a, b) => {
    return b.total_view - a.total_view
  })
  const noNews = document.getElementById('no_news_message')
  if (details.length === 0) {
    noNews.classList.remove('d-none')
  } else {
    noNews.classList.add('d-none')
  }
  // display news blog found
  const newsBlog = document.getElementById('news_blog')
  if (details.length) {
    newsBlog.innerText = `${details.length + ' news blog found'}`
  } else {
    newsBlog.innerText = details.length + ' news blog found'
  }
  const newsDetails = document.getElementById('news_details')
  newsDetails.textContent = ``
  details.forEach((detail) => {
    const newsDiv = document.createElement('div')
    newsDiv.onclick = () => {
      //
      loadNewsDetails(detail._id)
    }
    newsDiv.classList.add('card')
    newsDiv.classList.add('cards')
    newsDiv.innerHTML = `
    
    <div data-bs-toggle="modal"
        data-bs-target="#newsDetailsModal" class="row g-0 d-flex justify-content-around align-items-center" >
            <div class="col-sm-12 col-md-6 col-lg-4 thumbnail_img">
              <img src="${
                detail.thumbnail_url
              }" class="img-fluid rounded-start " alt="..." />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-8">
              <div class="card-body">
                <h5 class="card-title ">${detail.title}</h5>
                <p id="text_overflow" class="card-text card_details fst-italic text-secondary text-truncate ">
                 ${detail.details} 
                </p>
                <div class="d-flex justify-content-between align-items-center card_details">
                <div class="d-flex justify-content-around align-items-center  author_details">
                <img class="authour_img" src="${detail.author.img}">
                <article class="author_details">
                <h5 class="sm-ms-3">${
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
    newsDetails.appendChild(newsDiv)
  })

  toggleSpinner(false)
}

const loadNewsDetails = async (newsId) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}
`
    const res = await fetch(url)
    const data = await res.json()

    displayNewsDetails(data.data[0])
  } catch (error) {
    alert('Something went wrong')
  }
}

const displayNewsDetails = (news) => {
  const modalTitle = document.getElementById('newsDetailsModalLabel')
  modalTitle.innerText = `News Details`

  const modalBody = document.getElementById('modals_body')
  modalBody.innerHTML = `
  <img class="img-fluid" src="${news.image_url}">
  <h6 class="mt-3">Title : ${news.title}</h6>
  <p class="text-truncate">Description : ${news.details}</p>
  <div class="d-flex justify-content-between align-items-center">
  
  <div>
  <h6>Author Name : ${
    news.author.name ? news.author.name : 'No author found'
  }</h6>
  <img class="authour_img text-center" src="${news.author.img}">
  <p>Published Date : ${
    news.author.published_date
      ? news.author.published_date
      : 'No published date found'
  }</p>
  </div>



  <div class="d-flex justify-content-around align-items-center">
  
   <i class="fa-solid fa-eye"></i>
  <h6 class="ms-2">${news.total_view ? news.total_view : 'No view'}</h6>
    
  </div>

  
  </div>
  `
}

// loader

const toggleSpinner = (isLoading) => {
  const spinnerSection = document.getElementById('loader')
  if (isLoading) {
    spinnerSection.classList.remove('d-none')
  } else {
    spinnerSection.classList.add('d-none')
  }
}

loadCategories()
