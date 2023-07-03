let myLibrary = [];

function Book(author, title, numOfPages, status) {
  // the constructor...
    this.author = author
    this.title = title
    this.numOfPages = numOfPages
    this.status = status
}

function addBookToLibrary(object) {
  // do stuff here
    myLibrary.push(object)
}

function displayBooks() {
    // note to self: create a table of headings, perhaps directly in HTML
    let container = document.querySelector('.container')
    lists = document.querySelectorAll('ul')
    lists.forEach((list) => {
        container.removeChild(list)
    })

    buttons = document.querySelectorAll('.container > button')
    buttons.forEach((button) => {
        container.removeChild(button)
    })
    
    // iterate through myLibrary objects, where i is the number of obj
        for (let i = 0; i < myLibrary.length; i++) {
            let list = document.createElement('ul')
            list.classList.add('cards')
            list.setAttribute('id', `list${i}`)
            container.appendChild(list)
            for (let prop in myLibrary[i]) {
                // iterate through all the properties of a book
                listParent = document.getElementById(`list${i}`)
                let listItem = document.createElement('li')
                listItem.textContent = myLibrary[i][prop]
                listParent.appendChild(listItem)
            }
            let listItem = document.createElement('button')
            listItem.classList.add('remove')
            listItem.setAttribute('id', `${i}`)
            listItem.textContent = 'Remove'
            container.appendChild(listItem)
            
            let statusButton = document.createElement('button')
            statusButton.classList.add('changeStatus')
            statusButton.setAttribute('id', `${i}`)
            statusButton.textContent = 'Change Status'
            container.appendChild(statusButton)
    }
        // this addEventListener is nested within the function because it has to wait until the buttons are loaded before calling querySelectorAll
        let removeButtons = document.querySelectorAll('.container > .remove')
        removeButtons.forEach((removeButton) => {
            removeButton.addEventListener('click', () => {
            myLibrary.splice(parseInt(removeButton.id), 1); // button.id is the index of the obj in the array
            console.log(myLibrary)
            displayBooks() // lol didn't know i wrote an iterative recursive function
            })
        })
        let statusButtons = document.querySelectorAll('.changeStatus')
        statusButtons.forEach((statusButton) => {
            statusButton.addEventListener('click', () => {
                if (myLibrary[parseInt(statusButton.id)].status == 'read') { // note this poor design: the input should only allow two possibilities
                    myLibrary[parseInt(statusButton.id)].status = 'not read'
                }
                else {
                    myLibrary[parseInt(statusButton.id)].status = 'read'
                }
                displayBooks()
            })
        })
}

let button = document.querySelector('.newBook')
button.addEventListener('click', () => {
    let form = document.querySelector('.form')
    if (form.style.display === 'none') {
        form.style.display = 'block'
    }
    else {
        form.style.display = 'none'
    }
})

let form = document.querySelector('.form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    let formData = new FormData(event.target)
    temp = new Book(formData.get(['author']), formData.get(['title']), parseInt(formData.get(['numOfPages'])), formData.get(['status']))
    addBookToLibrary(temp)
    displayBooks()
})

