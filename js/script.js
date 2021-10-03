/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


const header = document.querySelector('.header');
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const footer = document.querySelector('.pagination');
let activeList = "";
let perPage = 9;


// Insert search bar to filter students by name
let searchBar = `
    <label for="search" class="student-search">
      <span>Search by Name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search Icon"></button>
    </label>
    `;


header.insertAdjacentHTML('beforeend', searchBar);
const search = document.querySelector('#search');
const searchBtn = header.querySelector('button');

// create an arry of only the names of the Students

let namesOnly = [];
for ( let i = 0; i < data.length; i++ ) {
  namesOnly.push( {name: `${data[i].name.first} ${data[i].name.last}`} );
}

// fucntion 'searchFunc' that runs on keyup or search button click

function searchFunc(searchInput, names) {
  let matchedNames = [];
  for ( let i = 0; i < names.length; i++ ) {
    if (searchInput.value.length != 0 &&
     names[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) ) {
       matchedNames.push(data[i]);
     }
   }
  if (matchedNames.length > 0) {
    showPage(matchedNames, 1);
    addPagination(matchedNames);
  } else {
   noResult();
  }
}

function noResult() {
  studentList.innerHTML = '';
  linkList.innerHTML = '';
  let noResults = '';
  activeList = '';
  noResults += `
  <li class = "student-item cf">
    <div>
       <span class="no-results">No Results to Display</span>
    </div>
  </li>`;
 studentList.insertAdjacentHTML('beforeend', noResults);
}

search.addEventListener('keyup', () => {
  if (search.value.length != 0){
    searchFunc(search, namesOnly);
  } else {
    showPage(data, 1);
    addPagination(data);
  }
});

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (search.value.length != 0){
    searchFunc(search, namesOnly);
  } else {
    showPage(data, 1);
    addPagination(data);
  }
});


// 'showPage' fucntion that prints the page of students based on perPage variable

function showPage(list, page) {
  const startIndex = (page * perPage) - perPage;
  const endIndex = (page * perPage);
  let studentItem = '';
  studentList.innerHTML = '';
  activeList = list;

  for ( let i = 0; i < list.length; i++ ) {
    if ( i >= startIndex && i < endIndex) {
      studentItem += `
      <li class = "student-item cf">
        <div class = "student-details">
          <img class = "avatar" src = "${list[i].picture.large}" alt = "Profile Picture">
          <h3>${list[i].name.first} ${list[i].name.last}</h3>
          <span class = "email">${list[i].email}</span>
        </div>
        <div class = "joined-details">
          <span class = "date">${list[i].registered.date}</span>
        </div>
      </li>`;
    }
  }
  studentList.insertAdjacentHTML('beforeend', studentItem);
}

// 'addPagination' function that creates page buttons based on perPage and amount of students in array

function addPagination(list) {
  let numOfPages = Math.ceil(list.length / perPage);
  let buttons = '';
  linkList.innerHTML = '';
    if (list.length != 0) {
      for ( let i = 1; i <= numOfPages; i++ ) {
        buttons += `
        <li>
          <button type = "button">${i}</button>
        </li>`;
      }

      linkList.insertAdjacentHTML('afterbegin', buttons);

      linkList.querySelector('button').className = "active";
      linkList.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {
          document.querySelector('.active').className = '';
          e.target.className = "active";
          showPage(list, e.target.textContent);
        }
    });
  }
}

// selection dropdown menu for perPage Variables, coding help provided by https://www.w3schools.com/howto/howto_js_dropdown.asp

let maxPerPage = `
  <div class="dropdown">
    <span>Display </span>
    <button type="button" class="active-dropdown">${perPage}</button>
    <span> Students per page</span>
    <div id="myDropdown" class="dropdown-content">
      <button type="button">3</button>
      <button type="button">6</button>
      <button type="button">9</button>
      <button type="button">12</button>
    </div>
  </div>`;

footer.insertAdjacentHTML('beforeend', maxPerPage);
const dropdown = document.querySelector('.active-dropdown');
const dropdownContent = document.querySelector('.dropdown-content');

dropdown.addEventListener('click', (e) => {
  if(e.target.tagName == "BUTTON") {
    if(dropdownContent.className === 'dropdown-content show') {
      dropdownContent.className = "dropdown-content";
    } else {
      dropdownContent.className = "dropdown-content show";
    }
  }
});

dropdownContent.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') {
    let newPerPage = parseInt(e.target.textContent);
    perPage = newPerPage;
    dropdownContent.className = "dropdown-content";
    dropdown.textContent = perPage;
    showPage(activeList, 1);
    addPagination(activeList);
    if (activeList.length == 0){
      noResult();
    }
  }
});

document.addEventListener('click', (e) => {
  if (e.target.className != 'dropdown-content' &&
      e.target.className != 'active-dropdown') {
    dropdownContent.className = "dropdown-content";
  }
});

// function calls on page load

showPage(data, 1);
addPagination(data);
