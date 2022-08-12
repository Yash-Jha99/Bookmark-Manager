const title = document.getElementById('title')
const url = document.getElementById('url')
const category = document.getElementById('category')
const tag = document.getElementById('tag')

if (localStorage.length==0 ||localStorage.getItem('bookmarks').length == 2) {
  var bookmark_list = [];
}
else {
  var bookmark_list = JSON.parse(localStorage.getItem("bookmarks"));
}

function get_bookmark() {
  document.getElementById('main').innerHTML = ''
  bookmark_list.forEach(element => {
    console.log(element)
    var x = document.createElement('div')
    x.innerHTML = `
      <div class="bg-purple-300 my-1 py-2 px-6 rounded-lg relative">
      <div class="text-xl italic font-bold hover:text-blue-700"><a href="${element.url}" target='_blank'>${element.title}</a></div>
      <div class='hidden'>${element.id}</div>
      <div class='text-sm'><b>URL: </b><span>${element.url}</span></div>
      <div class='text-sm'><b>Catrgory: </b><span>${element.category}</span></div>
      <div class='text-sm'><b>Date: </b><span>${element.date}</span></div>
      <span id='display_tag' class='text-sm'><b>Tags: </b><span>${element.tag.map(item=>{ return `<span class="inline-block bg-gray-200 rounded-full px-2.5 py-0.5 text-sm font-semibold text-black mx-1.5 my-1">#${item}</span>`
      })}</span></span>
      <span>
      <div class='flex justify-end absolute bottom-2 right-2'>
      <button class="bg-purple-300 hover:text-red-500 text-red-700 font-bold p-1 inline-flex items-center" onclick='delete_bookmark()'>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
  </svg></button></span>
      <span><button class="bg-purple-300 hover:text-blue-500 text-blue-700 p-1 font-bold  inline-flex items-center" onclick='edit_bookmark()'>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
    </button></div></span>
       </div>`
    document.getElementById('main').appendChild(x)
  });

  // document.getElementById('tag').value.forEach(tag=>{
  //   const x=document.createElement('div')
  //   x.innerHTML=`<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><b>URL:</b>${tag}</span>`
  //   document.getElementById('display_tag').appendChild(x)
  // })
}

function invalidate_form(field, error) {
  document.getElementById(field).style.borderColor = 'red'
  document.getElementById(`${field}_check`).style.display = 'block'
  document.getElementById(`${field}_label`).style.color = 'red'
  document.getElementById(`${field}_check`).innerHTML = error
}

function validate_form(field) {
  document.getElementById(field).style.borderColor = ''
  document.getElementById(`${field}_label`).style.color = ''
  document.getElementById(`${field}_check`).style.display = ''
}

function validate_url() {
  var found
  if (url.value == "" || !url.value.includes('.')) {
    invalidate_form('url', 'Invalid url...| Please input valid url')
    return false;
  }

  if (localStorage.getItem('bookmarks').length == 2) {
    return true
  }

  else {
    
  }
}

function clear_form() {
  document.getElementById('title').value = ''
  document.getElementById('url').value = ''
  document.getElementById('category').value = ''
  document.getElementById('tag').value = ''
}

function show_form() {
  clear_form()
  document.getElementById("form").style.display = "block";
  document.getElementById("control").style.display = "none";
  document.getElementById('main').style.display = 'none'
  document.getElementById("add_button").style.display = "";
  document.getElementById("edit_button").style.display = "none";

}

function hide_form() {
  document.getElementById("form").style.display = "";
  document.getElementById("control").style.display = "flex";
  document.getElementById('main').style.display = ''
}

function delete_bookmark() {
  const x = event.target.parentNode.parentNode.parentNode.parentNode
  console.log(x)
  const bookmark_id = x.children[1].innerHTML
  console.log(bookmark_id)
  document.getElementById('main').removeChild(x.parentNode)
  bookmark_list.forEach((element, index) => {
    if (element.id == bookmark_id) { bookmark_list.splice(index, 1) }
  })
  console.log(bookmark_list)
  localStorage.setItem("bookmarks", JSON.stringify(bookmark_list));
}

function edit_bookmark() {
  document.getElementById("form").style.display = "block";
  document.getElementById("edit_button").style.display = "block";
  document.getElementById("add_button").style.display = "none";
  document.getElementById('main').style.display = 'none'
  document.getElementById("control").style.display = "none";
  document.getElementById("close_button").style.display = "none";

  const x = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
  const bookmark_id = x.children[1].innerHTML
  bookmark_list.forEach((element, index) => {
    if (element.id == bookmark_id) {
      const bookmark_title = element.title
      const bookmark_url = element.url
      const bookmark_category = element.category
      const bookmark_tag = element.tag.join(" ")
      console.log(element.tag)
      document.getElementById('title').value = bookmark_title
      document.getElementById('url').value = bookmark_url
      document.getElementById('category').value = bookmark_category
      document.getElementById('tag').value = bookmark_tag
      edit_id = bookmark_id
     }
  })
  
 
}

function save_bookmark() {
  var found=0
  document.getElementById('main').style.display = ''
  document.getElementById("close_button").style.display = "";
  bookmark_list.forEach((element, index) => {
    if (element.id == edit_id) {
      element.title = title.value
      element.url = url.value.includes('https://') ? url.value : 'https://' + url.value
      element.category = category.value
      element.tag =tag.value.trim().split(' '),
      console.log(element)
    }
  })
  console.log(bookmark_list)

  for (var i of bookmark_list) {
    if (i.id!=edit_id && i.url == (url.value.includes('https://') ? url.value : 'https://' + url.value)) {
      found = 1
      break
    }
  }
  if (found) {
    invalidate_form('url', 'Duplicate bookmark url found... | Please add different url')
    return
  }
  if (!found) {
    validate_form('url')
    localStorage.setItem("bookmarks", JSON.stringify(bookmark_list));
    get_bookmark()
  }
 

  document.getElementById("form").style.display = "";
  document.getElementById("control").style.display = "flex";


}

function add_bookmark() {
  const set_bookmark = {
    id: Math.random(),
    title: title.value,
    url: url.value.includes('https://') ? url.value : 'https://' + url.value,
    category: category.value,
    tag: tag.value.trim().split(' '),
    date: new Date().toDateString(),
  };

  bookmark_list.push(set_bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmark_list));
  clear_form()
  console.log(bookmark_list)
}

function submitHandler() {
  found=0
  document.getElementById('main').style.display = ''
  validate_form('url')
  validate_form('title')

  if (title.value == "") {
    invalidate_form('title', 'Invalid Title... | Title cannot not be empty')
    return;
  }
  else if (url.value == "" || !url.value.includes('.')) {
    invalidate_form('url', 'Invalid url...| Please input valid url')
    return ;
  }
  else {
    validate_form('title')
  }

  if (localStorage.length==0||localStorage.getItem('bookmarks').length == 2) {
    add_bookmark()
  }
  else {
    for (var i of bookmark_list) {
      if (i.url == (url.value.includes('https://') ? url.value : 'https://' + url.value)) {
        found = 1
        break
      }
    }
    if (found) {
      invalidate_form('url', 'Duplicate bookmark url found... | Please add different url')
      return
    }
    if (!found) {
      validate_form('url')
      add_bookmark()
    }
  }
  get_bookmark()

}

get_bookmark()
