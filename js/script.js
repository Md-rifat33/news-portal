const loadCategories = async (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  const res = await fetch(url)
  const data = await res.json()
  displayCategories(data.data.news_category)
}

const displayCategories = (categories) => {
  const categoriesBlog = document.getElementById('categories_blog')
  categories.forEach((category) => {
    console.log(category)
    const categoriesLi = document.createElement('li')
    categoriesLi.classList.add('categories')
    categoriesLi.innerText = `
    
    ${category.category_name}
    
    `
    categoriesBlog.appendChild(categoriesLi)
  })
}

loadCategories()
