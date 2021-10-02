/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Global Variables
const header = document.querySelector('.header');
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const perPage = 9;


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
const searchBtn = document.querySelector('button');

// create an arry of only the names of the Students

let namesOnly = [];
for ( let i = 0; i < data.length; i++ ) {
  namesOnly.push( {name: `${data[i].name.first} ${data[i].name.last}`} );
}

// fucntion 'search' that runs on keyup or search button click

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
      studentList.innerHTML = '';
      linkList.innerHTML = '';
      let noResults = '';
      noResults += `
      <li class = "student-item cf">
        <div>
           <span class="no-results">No Results to Display</span>
        </div>
      </li>`;
     studentList.insertAdjacentHTML('beforeend', noResults);
  }
}

search.addEventListener('keyup', () => {
  if (search.value.length != 0){
    searchFunc(search, namesOnly);
  } else {
    showPage(data, 1);
    addPagination(data);
  }
});

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
  const startIndex = (page * perPage) - perPage;
  const endIndex = (page * perPage);
  let studentItem = '';
  studentList.innerHTML = '';

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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  let numOfPages = Math.ceil(list.length / perPage);
  let button = '';
  linkList.innerHTML = '';
    if (list.length != 0) {
      for ( let i = 1; i <= numOfPages; i++ ) {
        button += `
        <li>
          <button type = "button">${i}</button>
        </li>`;
      }

      linkList.insertAdjacentHTML('beforeend', button);

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


// Call functions

showPage(data, 1);
addPagination(data);
