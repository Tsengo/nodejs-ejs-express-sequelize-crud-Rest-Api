'use strict';

const clientSelect = document.querySelector('#clientSelect');

clientSelect.addEventListener('change', () => {
    document.getElementById('clientForm').submit()
})