'use strict'
require('./index.less')
var env = require('../lib')

env.val = true

// listening for properties changes
env.network.on('data', () => {
  appendToList('Network', env.network.val)
})

env.paused.on('data', () => {
  appendToList('Pause', env.paused.val)
})

// env.button.on('data', (data) => {
//   appendToList('Button', env.button.val)
// })

// creates button list
var list = document.createElement('ol')
list.id = 'list'
document.body.appendChild(list)

function appendToList (category, item) {
  var li = document.createElement('li')
  var catSpan = document.createElement('span')
  var itemSpan = document.createElement('span')

  catSpan.className = 'category'
  itemSpan.className = 'item'
  catSpan.innerText = category
  itemSpan.innerText = item

  li.appendChild(catSpan)
  li.appendChild(itemSpan)

  list.appendChild(li)
}
