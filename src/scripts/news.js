console.log("hello")

// I made a change to main.js to import a function from news.js  ALSO I added a div to index.html with id "news__form"



// html form representation and clear form values
const newsFormManager = {
  newsHtmlForm: () => {
    return `
    <div>
    Title: <br>
    <input type="text" name="Title" id="news__form__title" placeholder="News Title"><br>
    Synopsis: <br>
    <input type="textarea" name="Synopsis" id="news__form__synopsis" placeholder="Tell Us More"><br>
    URL: <br>
    <input type="text" name="URL" id="news__form__url" placeholder="Give Us the Link"><br>
    </div>
    <button id="news__form__save">Save</button><br><br>
    `
  },
  newsClearForm: () => {
    document.querySelector("#news__form__title").value = ""
    document.querySelector("#news__form__synopsis").value = ""
    document.querySelector("#news__form__url").value = ""
  }
}

// representation of DOM entries
const newsHtmlEntry = (entry) => {
  return `
  <div>
    <h2>${entry.title}</h2>
    <p>${entry.synopsis}</p>
    <a href="${entry.url}">${entry.title}</a><br>
    <button id="delete!${entry.id}">Delete</button>
    <button id="edit!${entry.id}">Edit</button>

  </div>
  `
}

// fetch obj with a get and a post

const newsUrl = "http://localhost:8088/news"
const newsDataManager = {
  newsGetEntries: () => {
    return fetch(`${newsUrl}`)
      .then(res => res.json())
  },
  newsSaveEntry: (entry) => {
    return fetch(`${newsUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)

    }).then(res => res.json())
  },
  newsDeleteEntry: (id) => {
    return fetch(`${newsUrl}/${id}`, {
      method: "DELETE"
    }).then(res => res.json())
  },
  newsEditEntry: (entry, id) => {
    return fetch(`${newsUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(res => res.json())
  },
  newsSingleEntry: (id) => {
    return fetch(`${newsUrl}/${id}`)
      .then(res => res.json())
  }
}

// target the div element in index for news results and put the content from the news DB there

const newsDom = (entry) => {
  document.querySelector("#news__results").innerHTML += entry
}

const newsDomRender = () => {
  document.querySelector("#news__results").innerHTML = ""
  newsDataManager.newsGetEntries()
    .then(entries => {
      entries.forEach(entry => {
        const newsEntryHTML = newsHtmlEntry(entry)
        newsDom(newsEntryHTML)
      })
    })
}

// saveNews function to target button and grab values from inputs to be posted and displayed

const saveNews = () => {
  document.querySelector("#news__form__save").addEventListener("click", () => {
    const news__title = document.querySelector("#news__form__title").value
    const news__synopsis = document.querySelector("#news__form__synopsis").value
    const news__url = document.querySelector("#news__form__url").value
    // below will check to make sure all inputs are filled out before saving to DB
    if (!news__title || !news__synopsis || !news__url) {
      alert("fill out the form")
    } else {
      document.querySelector("#news__results").innerHTML = ""
      const newsEntry = {
        title: news__title,
        synopsis: news__synopsis,
        url: news__url
      }
      // save the info and then once the promise is fulfilled
      newsDataManager.newsSaveEntry(newsEntry).then(() => {
        // clear inputs
        newsFormManager.newsClearForm()
        // and post it to the DOM
        newsDomRender()
      })
    }
  })
}

// This is the function for editing a news entry

const newsEdit = () => {
  document.querySelector("#news__results").addEventListener("click", event => {
    if (event.target.id.startsWith("delete")) {
      const id = event.target.id.split("!")[1]
      newsDataManager.newsDeleteEntry(id).then(() =>
      newsDomRender()
      )
    }
    if (event.target.id.startsWith("edit")) {
      const id = event.target.id.split("!")[1]
      newsDataManager.newsSingleEntry(id).then((entry) =>{
        document.querySelector("#news__form__title").value = entry.title
        document.querySelector("#news__form__synopsis").value = entry.synopsis
        document.querySelector("#news__form__url").value = entry.url
      })
    }
  })
}

const news = () => {
  // below will display the news form to the DOM
  document.querySelector("#add__news__form").innerHTML = newsFormManager.newsHtmlForm()
  newsDomRender()
  saveNews()
  newsEdit()
}

export {
  news
}