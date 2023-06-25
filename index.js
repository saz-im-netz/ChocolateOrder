import { menuArray } from '/data.js';

let totalPrice = 0;

const orderContainer = document.getElementById('order');
const orderListEl = document.getElementById('order-list');
const paymentModal = document.getElementById('payment-modal');
const completedOrderEl = document.querySelector('.order-completed');


document.addEventListener("click", function(e){
    if(e.target.dataset.cake){
        handleClick(menuArray, e.target.dataset.cake, 9);
    }
    else if(e.target.dataset.bar){
        handleClick(menuArray, e.target.dataset.bar, 5);
    }
    else if(e.target.dataset.pudding){
        handleClick(menuArray, e.target.dataset.pudding, 7);
    }
    else if(e.target.dataset.drink){
        handleClick(menuArray, e.target.dataset.drink, 6);
    }
    else if(e.target.id === "remove-cake"){
        removeItemFromOrderList(e.target.id, 9);
    }
    else if(e.target.id === "remove-bar"){
        removeItemFromOrderList(e.target.id, 9);
    }
    else if(e.target.id === "remove-pudding"){
        removeItemFromOrderList(e.target.id, 7);
    }
    else if(e.target.id === "remove-drink"){
        removeItemFromOrderList(e.target.id, 6);
    }
    else if(e.target.id === "delete-cake"){
        deleteItemFromOrderList(e.target.id, 9);
    }
    else if(e.target.id === "delete-bar"){
        deleteItemFromOrderList(e.target.id, 5);
    }
    else if(e.target.id === "delete-pudding"){
        deleteItemFromOrderList(e.target.id, 7);
    }
    else if(e.target.id === "delete-drink"){
        deleteItemFromOrderList(e.target.id, 6);
    }
    else if(e.target.id === "order-btn"){
        showContent(paymentModal);
    }
    else if(e.target.id === "pay-btn"){
        handlePayment();
    }

})

function handleClick(array, itemId, price){
    let itemHTML = "";

    for(let item of array){
        if(item.id === Number(itemId)){

            if(item.amount <1){
                itemHTML += `
                <div class="order-list-item">
                    
                    <div class="ordered-item">
                        <h3>${item.name}</h3>
                        <p id="number-${item.data}"> </p>
                        <button 
                            id="remove-${item.data}" 
                            type="button" 
                            class="remove-ordered-item-btn"
                            >REMOVE ONE</button>

                        <button 
                        id="delete-${item.data}" 
                        type="button" 
                        class="delete-ordered-item-btn"
                        >DELETE ALL</button>
                    </div>
                    <h4>$${item.price}</h4>
                    
                </div>`;
            }
            else{
                document.getElementById('number-'+item.data).innerHTML = item.amount+1+" x";
            }

            item.amount ++; 
        
        }
    }
  
    orderListEl.innerHTML += itemHTML;

    updateTotalPrice(price);
    showContent(orderContainer);

    hideContent(completedOrderEl);
}


function updateTotalPrice(price){
    totalPrice = totalPrice + price;
    document.getElementById('total-price').innerHTML = '$'+totalPrice;

}

function removeItemFromOrderList(itemRemoveBtn, price){

    if(itemRemoveBtn === "remove-cake"){
        let cakeAmount = menuArray[0].amount;
        menuArray[0].amount --;
        if(cakeAmount === 1){
            deleteItemFromOrderList("delete-cake", price);
        }
        else if(cakeAmount === 2){
            document.getElementById('number-cake').innerHTML = "";
        }
        else if(cakeAmount > 2){
            document.getElementById('number-cake').innerHTML = cakeAmount -1 +" x";
        }
        
    }
    else if(itemRemoveBtn === "remove-bar"){
        let barAmount = menuArray[1].amount;
        menuArray[1].amount --;
        if(barAmount === 1){
            deleteItemFromOrderList("delete-bar", price);
        }
        else if(barAmount === 2){
            document.getElementById('number-bar').innerHTML = "";
        }
        else if(barAmount < 2){
            document.getElementById('number-bar').innerHTML = barAmount -1 +" x";
        }
    }
    else if(itemRemoveBtn === "remove-pudding"){
        let puddingAmount = menuArray[2].amount;
        menuArray[2].amount --;
        if(puddingAmount === 1){
            deleteItemFromOrderList("delete-pudding", price);
        }
        else if(puddingAmount === 2){
            document.getElementById('number-pudding').innerHTML = "";
        }
        else if(puddingAmount > 2){
            document.getElementById('number-pudding').innerHTML = puddingAmount -1 +" x";
        }
    }
    if(itemRemoveBtn === "remove-drink"){
        let drinkAmount = menuArray[0].amount;
        menuArray[0].amount --;
        if(drinkAmount === 1){
            deleteItemFromOrderList("delete-drink", price);
        }
        else if(drinkAmount === 2){
            document.getElementById('number-drink').innerHTML = "";
        }
        else if(drinkAmount > 2){
            document.getElementById('number-drink').innerHTML = drinkAmount -1 +" x";
        }
        
    }
    updateTotalPrice(-price);
}

function deleteItemFromOrderList(itemDeleteBtn, price){
    let newPrice;

    if(itemDeleteBtn === "delete-cake"){
        let cakeAmount = menuArray[0].amount;
        menuArray[0].amount = 0;
        newPrice = -price*cakeAmount;
        
    }
    else if(itemDeleteBtn === "delete-bar"){
        let barAmount = menuArray[1].amount;
        menuArray[1].amount = 0;
        newPrice = -price*barAmount;
    }
    else if(itemDeleteBtn === "delete-pudding"){
        let puddingAmount = menuArray[2].amount;
        menuArray[2].amount = 0;
        newPrice = -price*puddingAmount;
    }
    else if(itemDeleteBtn === "delete-drink"){
        let drinkAmount = menuArray[2].amount;
        menuArray[2].amount = 0;
        newPrice = -price*drinkAmount;
    }
    document.getElementById(itemDeleteBtn).parentElement.parentElement.remove();
    updateTotalPrice(newPrice);
}

function handlePayment(){

    const nameInput = document.getElementById('name-input');
    const cardInput = document.getElementById('card-input');
    const cvvInput = document.getElementById('cvv-input');

    if((nameInput.value == null || nameInput.value == "") ||
        (cardInput.value == null || cardInput.value == "") ||
        (cvvInput.value == null || cvvInput.value == "")){
        alert("Please fill in all required fields.");
    }
    else{
        let name = nameInput.value;

        completedOrderEl.innerHTML = `
            <p>Thanks, ${name}! Your order is on its way!</p>
        `

        showContent(completedOrderEl);
        resetOrderEl();
        hideContent(orderContainer);
        hideContent(paymentModal);
    }
    
}


function showContent(element){
    if(element.classList.contains('hidden')){
        element.classList.remove('hidden');
    }
}

function hideContent(element){
    if(!element.classList.contains('hidden')){
        element.classList.add('hidden');
    }
}
function resetOrderEl(){
    orderListEl.innerHTML = "";
    totalPrice = 0;
}


renderMenu();

function renderMenu(){
    
    document.querySelector('#menu-container').innerHTML = getMenuHTML(menuArray);
    
}

function getMenuHTML(dataArray){
    let menuHTML = '';
    let ingredientsHTML = '';

    for(let item of dataArray){

        item.ingredients.forEach(function(ingredient, i){
            if(i === item.ingredients.length -1){
                ingredientsHTML += ingredient;
            }
            else{
                ingredientsHTML += ingredient + ", "
            }
            
        })
        
        menuHTML += `
        <div class="menu-item">
            <div class="item-descr">
                <div class="menu-emoji">${item.emoji}</div>
                <div>
                    <h3>${item.name}</h3>
                    <p>${ingredientsHTML}
                    </p>
                    <h4>$${item.price}</h4>
                </div>
            </div>
            <button type="button" class="add-to-cart-btn" 
                data-${item.data}="${item.id}">+</button>
        </div>`;
        ingredientsHTML = "";

    }
    return menuHTML;
}