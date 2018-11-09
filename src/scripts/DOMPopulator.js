import elementCreator from "./elementFactory"
// generic template

const putOnDOM = {
  postNewMessage(entry) {
    let chatName = elementCreator.elementFactory("a", entry.user_id, "chat__name", `chat__name${entry.id}`, "#")
    let chatTime = elementCreator.elementFactory("p", entry.time, "chat__time", `chat__time${entry.id}`)
    let chatMessage = elementCreator.elementFactory("p", entry.message, "chat__message", `chat_message${entry.id}`)
    let chatHolder = elementCreator.elementFactory("div", null, "chat__div", `chat__div${entry.id}`, null, chatName, chatTime, chatMessage)
    //appending our new elements to the fragment then the fragment to or article
    let fragment = document.createDocumentFragment()
    let chatOutput = document.querySelector("#chat__results")
    fragment.appendChild(chatHolder)
    chatOutput.appendChild(fragment)
  },

  // loops over all of one type of entry and populates multiple ones at a time
  initialChat(entries) {
    entries.forEach(entry => {
      putOnDOM.postNewMessage(entry)
    })
  },
  postNewTodo(entry) {
    let entryTask = elementCreator.elementFactory("p", entry.task, "todo__task", `todo__task${entry.id}`)
    let entryDate = elementCreator.elementFactory("p", entry.date, "todo__date", `todo__date${entry.id}`)
    let entryCheck = elementCreator.elementFactory("input type='checkbox'", null, "todo__checkbox", `todo__checkbox${entry.id}`)
    let entryHolder = elementCreator.elementFactory("div", null, "todo__div", `todo__div${entry.id}`, null, entryTask, entryDate, entryCheck)
    //appending our new elements to the fragment then the fragment to or article
    let fragment = document.createDocumentFragment()
    fragment.appendChild(entryHolder)
    let todoOutput = document.getElementById("todo__results")
    todoOutput.appendChild(fragment)
  },
  initialTodos(entries) {
    entries.forEach(entry => {
      putOnDOM.postNewTodo(entry)
    })
  },
  postNewNews(entry) {
    let newsTitle = elementCreator.elementFactory("h2", entry.title, "news__title", `news__title${entry.id}`)
    let newsSynopsis = elementCreator.elementFactory("p", entry.synopsis, "news__synopsis", `news__synopsis${entry.id}`)
    let newsURL = elementCreator.elementFactory("p", entry.url, "news__url", `news__url${entry.id}`)
    let newsHolder = elementCreator.elementFactory("div", null, "news__div", `news__div${entry.id}`, null, newsTitle, newsSynopsis, newsURL)
    //appending our new elements to the fragment then the fragment to or article
    let fragment = document.createDocumentFragment()
    fragment.appendChild(newsHolder)

    let newsOutput = document.getElementById("news__results")
    newsOutput.appendChild(fragment)
  },

  // loops over all of one type of entry and populates multiple ones at a time
  intialNews(entries) {
    entries.forEach(entry => {
      putOnDOM.postNewNews(entry)
    })
  },
  postNewEvent(entry) {
    let eventTitle = elementCreator.elementFactory("h2", entry.title, "event__title", `event__title${entry.id}`)
    let eventSynopsis = elementCreator.elementFactory("p", entry.synopsis, "event__synopsis", `event__synopsis${entry.id}`)
    let eventDate = elementCreator.elementFactory("p", entry.date, "event__date", `event__date${entry.id}`)
    let eventLocation = elementCreator.elementFactory("p", entry.location, "event__location", `event__location${entry.id}`)
    let eventHolder = elementCreator.elementFactory("div", null, "event__div", `event__div${event.id}`, null, eventTitle, eventDate, eventSynopsis, eventLocation)
    //appending our new elements to the fragment then the fragment to or article
    let fragment = document.createDocumentFragment()
    fragment.appendChild(eventHolder)

    let eventOutput = document.getElementById("event__results")
    eventOutput.appendChild(fragment)
  },

  // loops over all of one type of entry and populates multiple ones at a time
  intialEvents(entries) {
    entries.forEach(entry => {
      putOnDOM.postNewEvent(entry)
    })
  }
}