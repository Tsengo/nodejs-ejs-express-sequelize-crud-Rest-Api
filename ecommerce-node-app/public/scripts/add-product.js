const adminBtn = document.querySelector('#adminAddProductBtn');
const imageInput = document.querySelector('#imageInputAdmin').value;
const productNameInput = document.querySelector('#productName').value;
const productDescriptionInput = document.querySelector('#productDescription').value;
const productPriceInput = document.querySelector('#productPrice').value;

adminBtn.addEventListener('click', (event) => {
    // event.preventDefault();
    
    if (!productPriceInput || !productNameInput || !productDescriptionInput || !imageInput) {
        console.log('no value');
    }
    console.log(productNameInput, productDescriptionInput, imageInput, productPriceInput);
});