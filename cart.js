let userDetails = JSON.parse(localStorage.getItem("userDetails"))
let userIndex = JSON.parse(localStorage.getItem("userIndex"));

let profile = document.getElementById("profile");
profile.innerText = `Hi, ${userDetails[userIndex].firstName} ${userDetails[userIndex].lastName}`;
let cartProduct = document.getElementById("cart-product");

let products = "";

function getUserCartDetails(cartDetails) {
    let r;
    cartDetails.forEach((userCart) => {
        if (userCart[0] === `${userDetails[userIndex].email}`) {
            console.log(userCart)
            r = userCart
        }
    })
    return r;
}

let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));
let userCartDetails = getUserCartDetails(cartDetails);

// localStorage.removeItem("userName")

// userCartDetails.forEach((product,i)=>{

//     products += `<div class="product">
//         <img src="${product.image}" alt="">
//         <h3>${product.title}</h3>
//         <div>${product.price}</div>
//         <div>
//             ${product.description}
//         </div>
//         <div>${product.category}</div>
//         <div>${product.color}</div>
//         <div>${product.size}</div>
//         <button id=${product.id}  class="removeFromCart">Remove From Cart</button>
//     </div>`

// })
for (let i = 1; i < userCartDetails.length; i++) {

    products += `<div class="product">
         <img src="${userCartDetails[i].image}" alt="">
        <h3>${userCartDetails[i].title}</h3>
         <div>₹ ${userCartDetails[i].price}</div>
       
        <div>${userCartDetails[i].category}</div>
         <div>${userCartDetails[i].color}</div>
         <div>${userCartDetails[i].size}</div>
         <button id=${userCartDetails[i].id}  class="removeFromCart">Remove From Cart</button>
     </div>`
}
cartProduct.innerHTML = "";
cartProduct.innerHTML = products;
//localStorage.removeItem("cartDetails")
function removeFromCart(i, userCartDetails) {
    userCartDetails.splice(i, 1);
    updateCartQuantity(userCartDetails)
    let updatedProducts = "";
    // cartDetails.forEach((product,j)=>{

    //     updatedProducts += `<div class="product">
    //         <img src="${product.image}" alt="">
    //         <h3>${product.title}</h3>
    //         <div>${product.price}</div>
    //         <div>
    //             ${product.description}
    //         </div>
    //         <div>${product.category}</div>
    //         <div>${product.color}</div>
    //         <div>${product.size}</div>
    //         <button id=${product.id} class="removeFromCart">Remove From Cart</button>
    //     </div>`

    // })
    for (let i = 1; i < userCartDetails.length; i++) {

        updatedProducts += `<div class="product">
             <img src="${userCartDetails[i].image}" alt="">
            <h3>${userCartDetails[i].title}</h3>
             <div>₹ ${userCartDetails[i].price}</div>
           
            <div>${userCartDetails[i].category}</div>
             <div>${userCartDetails[i].color}</div>
             <div>${userCartDetails[i].size}</div>
             <button id=${userCartDetails[i].id}  class="removeFromCart">Remove From Cart</button>
         </div>`
    }

    cartProduct.innerHTML = "";
    cartProduct.innerHTML = updatedProducts;
    localStorage.setItem("cartDetails", JSON.stringify(cartDetails))
    checkBill(userCartDetails)
    addRemoveFromCartListeners();
    orderPlaced()
    displayMessage(userCartDetails)
    if (userCartDetails.length === 1) {
        billContainer.innerHTML = "";
    }
}
function addRemoveFromCartListeners() {
    // userCartDetails.forEach((product, index) => {
    //   document.getElementById(`${product.id}`).addEventListener("click", (e) => {
    //     e.preventDefault();
    //     removeFromCart(index, userCartDetails);
    //   });
    // });
    for (let i = 1; i < userCartDetails.length; i++) {
        document.getElementById(`${userCartDetails[i].id}`).addEventListener('click', (e) => {
            e.preventDefault();
            removeFromCart(i, userCartDetails);
        })
    }
}


//let bill = document.getElementById("bill");
let billContainer = document.getElementById("bill-container");

function generateBill(bills, total) {
    //let bills ="";
    billContainer.innerHTML = "";

    let cheackoutlist = document.createElement("div");
    cheackoutlist.setAttribute("class", "cheackout-list");
    // billContainer.appendChild(cheackoutlist);

    let h3 = document.createElement("h3");
    h3.innerText = "Checkout List";
    cheackoutlist.appendChild(h3);

    let bill = document.createElement("div");
    bill.setAttribute("class", "bill");
    bill.setAttribute("id", "bill");

    // cartDetails.forEach((product)=>{
    //     bills += `<div class="bill-element">
    //         <div>${product.title}</div>
    //         <div>$ ${product.price}</div>
    //     </div>`
    // })

    bill.innerHTML = bills;
    cheackoutlist.appendChild(bill);

    billContainer.appendChild(cheackoutlist);

    let totalBill = document.createElement("div");
    totalBill.setAttribute("class", "bill-element total-bill");

    totalBill.innerHTML = `<div>Total</div>
                        <div>₹ ${total}</div>`

    billContainer.appendChild(totalBill);

    let checkoutButton = document.createElement("button");
    checkoutButton.setAttribute("class", "checkout");
    checkoutButton.setAttribute("id", "checkout");
    checkoutButton.innerText = "Checkout"
    billContainer.appendChild(checkoutButton);

}
let totals;
function checkBill(userCartDetails) {
    let total = 0;
    let bills = "";
    // cartDetails.forEach((product)=>{
    //     bills += `<div class="bill-element">
    //         <div>${product.title}</div>
    //         <div>$ ${product.price}</div>
    //     </div>`
    //     total +=product.price;
    // })
    for (let i = 1; i < userCartDetails.length; i++) {
        bills += `<div class="bill-element">
             <div>${userCartDetails[i].title}</div>
             <div>₹ ${userCartDetails[i].price}</div>
        </div>`
        total += userCartDetails[i].price;
    }
    total = total.toFixed(2);
    totals=total;
    if (bills) {
        generateBill(bills, total);
    }
}

checkBill(userCartDetails)

let message = document.getElementById("message");

function displayMessage(userCartDetails) {
    if (userCartDetails.length > 1) {
        message.style.display = "none"
    } else {
        message.style.display = "block"
    }
}



//update cart quantity
let digit = document.getElementById("digit");
function updateCartQuantity(userCartDetails) {
    digit.innerText = ""
    digit.innerText = `${userCartDetails.length - 1}`
}

updateCartQuantity(userCartDetails)
addRemoveFromCartListeners();
displayMessage(userCartDetails)
orderPlaced()

function initiatePayment() {
    const razorpayKey = 'rzp_test_ApCLsrudPNtAL0';
   
    // Create a new instance of Razorpay
    const razorpay = new Razorpay({
        key: razorpayKey,
        amount: totals*100, // Amount in paise (Example: 1000 paise = ₹10)
        currency: 'INR',
        name: '',
        description: 'Test Payment',
        image: 'https://example.com/your-logo.png',
        handler: function (response) {
            // Handle the payment success callback
            success()
            console.log(response);
        },
        prefill: {
            name: 'John Doe',
            email: 'john@example.com',
            contact: '+91 9876543210'
        }
    });
    razorpay.open();
}

function orderPlaced() {
    // Get a reference to the checkout button
    const checkoutButton = document.getElementById("checkout");
    // Add event listener to the checkout button
    checkoutButton.addEventListener("click", (e) => {

        e.preventDefault()
        // console.log(totals)
        // checkoutButton.style.display="none";
        let dotModelContainer = document.createElement("div");
        dotModelContainer.classList.add("dot-model-container");

        let dotModel = document.createElement("div");
        dotModel.classList.add("dots-model");

        for (let i = 0; i < 3; i++) {
            let dot = document.createElement("span");
            dot.classList.add("dot");
            dotModel.appendChild(dot);
        }

        dotModelContainer.appendChild(dotModel);
        document.body.appendChild(dotModelContainer);

        function animateDots() {
            let dots = document.querySelectorAll(".dot");
            let index = 0;


            function toggleDots() {

                dots[index].classList.toggle("visible")
                index = (index + 1) % dots.length;


            }

            setTimeout(toggleDots, 50);
            setInterval(toggleDots, 50);

        }
        animateDots()

        setTimeout(() => {
            dotModelContainer.remove();
            initiatePayment()
            

        }, 3000)
    });
}

function success(){
    
    let successMessage = document.createElement("div");
    successMessage.classList.add("successMessage")
    successMessage.innerHTML = `<div class="successMessag">
                <div>Your Order Placed Successfully</div>
                <img src="./orderPlaced.png" alt="">
                <audio id="audioPlayer" src="./wrong-answer-129254.mp3" style="display: none;"></audio>
                </div>`
    document.body.appendChild(successMessage);
    cartProduct.innerHTML = "";
    billContainer.innerHTML = "";
    message.style.display = "block";
    let sound = document.getElementById("audioPlayer")

    audioPlayer.play();
    userCartDetails.splice(1, userCartDetails.length - 1);
    localStorage.setItem("cartDetails", JSON.stringify(cartDetails))
    updateCartQuantity(userCartDetails)
    checkBill(userCartDetails)
    addRemoveFromCartListeners();
    // displayMessage(userCartDetails)
    message.style.display = "none"
}