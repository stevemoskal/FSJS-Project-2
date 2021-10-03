# FSJS-Project-2
### Project-2 - Pagination

#### Description

This repository was designed for the Treehouse TechDegree course, Project-2: Pagination.

This project is complete, and I am hoping to obtain an "Exceed Expectations" grade based on the grading key provided.

There are three different types of code contained in this repository: HTML, CSS and JavaScript. The HTML and CSS were provided by Treehouse, and it was my objective to complete the JavaScript code.

#### Outside Resources

There is one part of the code that I required some extra help on, the dropdown menu selection, where the user can change the amount of students displayed per page. This was not a required task based on the project instructions, but I felt that this would be a nice addition to the page.

For this, I consulted a website that I found with a simple google search on the topic, (https://www.w3schools.com/howto/howto_js_dropdown.asp). The code I wrote using help from this website is as follows:

```

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

```

There are also a few small additions I made to styles.css to style the new dropdown menu. These additions have comments to indicate where they are located.

#### Frameworks used

This project was built using:
  - [Atom Text Editor](https://atom.io)
  - [Github Desktop](https://desktop.github.com)

Thank you for viewing my repository!

Steve Moskal
