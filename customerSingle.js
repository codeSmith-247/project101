//Modal container
var modalBtn = document.querySelector('.primary-btn');
var modalContainer = document.querySelector('.modal-container');
var modalClose = document.querySelector('.close-btn');

modalBtn.addEventListener('click', function(){
    modalContainer.classList.add('modal-bg-active');
})
modalClose.addEventListener('click', function(){
    modalContainer.classList.remove('modal-bg-active');
});

//Outputting the values on the various cards
const saveButton = document.getElementById('save');
const paymentOutput = document.getElementById('paymentOutput');
const supplierOutput = document.getElementById('supplierOutput');
const amountOutput = document.getElementById('amountOutput');
const quantityOutput = document.getElementById('quantityOutput');
    
function changePayment(e){
    e.preventDefault(); //stop form from submitting
    let inputs = {
        payment: document.getElementById('paymentInput').value,
        quantity: document.getElementById('quantity').value,
        amount: document.getElementById('amount').value,
        supply: document.getElementById('supply').value
    }
    paymentOutput.innerText = inputs.payment;
    supplierOutput.innerText = inputs.supply;
    amountOutput.innerText = inputs.amount;
    quantityOutput.innerText = inputs.quantity;
}

saveButton.addEventListener('click', changePayment);

