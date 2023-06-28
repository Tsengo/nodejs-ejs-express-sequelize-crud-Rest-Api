'use strict';

// admin drop-down menu
const nameOfOrg = document.querySelector('.name-of-org');
const nameOrg = document.querySelector('.org-name');

nameOfOrg.addEventListener('click', () => {
    nameOrg.classList.toggle('active-org-name')
})