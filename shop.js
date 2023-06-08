 let productContainer = document.getElementById("product-container");
 let filter = document.getElementById("filter-button");

 let red = document.getElementById("red");
 let blue = document.getElementById("blue");
 let black = document.getElementById("black");

 let s = document.getElementById("s");
 let l = document.getElementById("l");
 let m = document.getElementById("m");
 let xl = document.getElementById("xl");

 let $0to25=document.getElementById("0to25");
 let $25to50 = document.getElementById("25to50");
 let $50to100 = document.getElementById("50to100");
 let $100plus = document.getElementById("100plus")

 let profile = document.getElementById("profile");

 let userName = localStorage.getItem("userName");
 if(userName){
    profile.innerText=`Hi, ${userName}`
    // localStorage.removeItem("userName");
 }

 //update cart quantity
let digit = document.getElementById("digit");
function updateCartQuantity(userCartDetails){
    digit.innerText=""
    digit.innerText=`${userCartDetails.length-1}`
}

async function loadProducts(){
    let url = `https://fakestoreapi.com/products`;
    
    try{
        let response =await fetch(url);
        let data = await response.json();
        modifyData(data)
    }
    catch(error){
        console.log(error)
    }
}

loadProducts();

let colors = ["red","blue","black"];
let size = ["s","m",'l',"xl"];

function modifyData(data){
    data.forEach((product)=>{
        product.color=randomColor();
        product.size=randomSize();
    })
    localStorage.setItem("productList",JSON.stringify(data));
    
}
function randomColor(){
    let randomIndex = Math.floor(Math.random()*colors.length);
    return colors[randomIndex]
}

function randomSize(){
    let randomIndex = Math.floor(Math.random()*size.length);
    return size[randomIndex]
}

let userDetails = JSON.parse(localStorage.getItem("userDetails"))
let userIndex = JSON.parse(localStorage.getItem("userIndex"));
//let `${userDetails[userIndex].lastName}` = JSON.parse(localStorage.getItem("`${userDetails[userIndex].lastName}`")) || [];
let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));

function f(cartDetails){
    let userCartDetails = getUserCartDetails(cartDetails);
    updateCartQuantity(userCartDetails)
}
f(cartDetails)

localStorage.setItem("cartDetails",JSON.stringify(cartDetails))
let data = JSON.parse(localStorage.getItem("productList"))

function getUserCartDetails(cartDetails){
    let r;
    cartDetails.forEach((userCart)=>{
        if(userCart[0]===`${userDetails[userIndex].email}`){
            console.log(userCart)
            r=userCart
        }
    })
    return r;
}

function showData(){

    let data = JSON.parse(localStorage.getItem('productList'));
    console.log(data)
    productContainer.innerHTML=""
    let products = "";
    data.forEach((product)=>{
        
       products += `<div class="product">
            <img src="${product.image}" alt="">
            <h3>${product.title}</h3>
            <div>₹ ${product.price}</div>
            <div>
                ${product.description}
            </div>
            <div>${product.category}</div>
            <div>${product.color}</div>
            <div>${product.size}</div>
            <button id=${product.id} class="addToCartButton">Add to Cart</button>
        </div>`
    })
    productContainer.innerHTML=products;
    
    for(let i=0;i<data.length;i++){
    document.getElementById(`${data[i].id}`).addEventListener("click",(e)=>{
            e.preventDefault();
            // data[i].id.innerText=""
            // document.getElementById(data[i].id).innerText = "Added To Cart";
            let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));
            let userCartDetails = getUserCartDetails(cartDetails);
            // console.log(getUserCartDetails(cartDetails))
            // userCartDetails.some(item => item.id === data[i].id
           if (!userCartDetails.some(item => item.id === data[i].id)) {
                userCartDetails.push(data[i]);
                //updatedProductButton(cartDetails)
                updateCartQuantity(userCartDetails)

            }
            localStorage.setItem("cartDetails",JSON.stringify(cartDetails))

        })
       // updatedProductButton(cartDetails);
    }

}
showData()

let filterData = []
console.log(data)
red.addEventListener("change",(e)=>{
    e.preventDefault();
    
    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && product.color==="red"){
                filterData.push(product);
            }
        })
    }else{
    for (let i = filterData.length - 1; i >= 0; i--) {
        if(filterData[i].color === "red") {
            filterData.splice(i, 1);
        }
        }
    }
})

blue.addEventListener("change",(e)=>{
    e.preventDefault();
    
    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && product.color==="blue"){
                filterData.push(product);
            }
        })
    }else{
    for (let i = filterData.length - 1; i >= 0; i--) {
        if(filterData[i].color === "blue") {
            filterData.splice(i, 1);
        }
        }

    }
})

black.addEventListener("change",(e)=>{
    e.preventDefault();
    
    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && product.color==="black"){
                filterData.push(product);
            }
        })
    }else{
    for (let i = filterData.length - 1; i >= 0; i--) {
        if(filterData[i].color === "black") {
            filterData.splice(i, 1);
        }
        }
    }
})

s.addEventListener("change",(e)=>{
    e.preventDefault();
    
    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && product.size==="s"){
                filterData.push(product);
            }
        })
    }else{
    for (let i = filterData.length - 1; i >= 0; i--) {
        if(filterData[i].size === "s") {
            filterData.splice(i, 1);
        }
        }
    }
})

m.addEventListener("change",(e)=>{
    e.preventDefault();
    
    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && product.size==="m"){
                filterData.push(product);
            }
        })
    }else{
    for (let i = filterData.length - 1; i >= 0; i--) {
        if(filterData[i].size === "m") {
            filterData.splice(i, 1);
        }
        }
    }
})

l.addEventListener("change",(e)=>{
    e.preventDefault();
    
    if(e.target.checked){
    data.forEach((product)=>{
        if(filterData.includes(product)==false && product.size==="l"){
            filterData.push(product);
        }
    })
    }else{
    for (let i = filterData.length - 1; i >= 0; i--) {
        if(filterData[i].size === "l") {
            filterData.splice(i, 1);
        }
    }
    }
})

xl.addEventListener("change",(e)=>{
    e.preventDefault();
    
    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && product.size==="xl"){
                filterData.push(product);
            }
        })
    }else{
        for(let i = filterData.length - 1; i >= 0; i--) {
            if(filterData[i].size === "xl") {
                filterData.splice(i, 1);
            }
        }
        }
})

$0to25.addEventListener("change",(e)=>{
    e.preventDefault();

    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && (product.price>0 && product.price<=25)){
                filterData.push(product);
            }
        })
    }else{
        for(let i = filterData.length - 1; i >= 0; i--) {
            if(filterData[i].price>0 && filterData[i].price<=25) {
                filterData.splice(i, 1);
            }
        }
    }
})

$25to50.addEventListener("change",(e)=>{
    e.preventDefault();

    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && (product.price>25 && product.price<=50)){
                filterData.push(product);
            }
        })
    }else{
        for(let i = filterData.length - 1; i >= 0; i--) {
            if(filterData[i].price>25 && filterData[i].price<=50) {
                filterData.splice(i, 1);
            }
        }
    }
})

$50to100.addEventListener("change",(e)=>{
    e.preventDefault();

    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && (product.price>50 && product.price<=100)){
                filterData.push(product);
            }
        })
    }else{
        for(let i = filterData.length - 1; i >= 0; i--) {
            if(filterData[i].price>50 && filterData[i].price<=100) {
                filterData.splice(i, 1);
            }
        }
    }
})

$100plus.addEventListener("change",(e)=>{
    e.preventDefault();

    if(e.target.checked){
        data.forEach((product)=>{
            if(filterData.includes(product)==false && (product.price>100)){
                filterData.push(product);
            }
        })
    }else{
        for(let i = filterData.length - 1; i >= 0; i--) {
            if(filterData[i].price>100) {
                filterData.splice(i, 1);
            }
        }
    }
})

function setupAddToCartListeners(filterData){
    if(filterData.length>0){
        for(let i=0;i<filterData.length;i++){
            document.getElementById(`${filterData[i].id}`).addEventListener("click",(e)=>{
                e.preventDefault();
               // filterData[i].id.innerText="Added To Cart"
               let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));
               let userCartDetails = getUserCartDetails(cartDetails);
               if (!userCartDetails.some(item => item.id === filterData[i].id)) {
                   userCartDetails.push(filterData[i]);
                   //updatedProductButton(cartDetails)
                   updateCartQuantity(userCartDetails)
   
                  }
                  localStorage.setItem("cartDetails",JSON.stringify(cartDetails))
            })
           // updatedProductButton(cartDetails);
        }
    }
}

filter.addEventListener("click",(e)=>{
    e.preventDefault();
    

    console.log(filterData)
    productContainer.innerHTML=""
    let products = "";
    console.log(filterData)
    if(filterData.length>0){
        filterData.forEach((product)=>{
            products += `<div class="product">
                 <img src="${product.image}" alt="">
                 <h3>${product.title}</h3>
                 <div>₹ ${product.price}</div>
                 <div>
                     ${product.description}
                 </div>
                 <div>${product.category}</div>
                 <div>${product.color}</div>
                 <div>${product.size}</div>
                <button id=${product.id} class="addToCartButton">Add to Cart</button>
            </div>`
         })
        productContainer.innerHTML=products;
        setupAddToCartListeners(filterData);
    }else{
        // let data = JSON.parse(localStorage.getItem('productList'));
        // console.log(data)
        // // productContainer.innerHTML=""
        // // let products = "";
        // data.forEach((product)=>{
            
        // products += `<div class="product">
        //         <img src="${product.image}" alt="">
        //         <h3>${product.title}</h3>
        //         <div>${product.price}</div>
        //         <div>
        //             ${product.description}
        //         </div>
        //         <div>${product.category}</div>
        //         <div>${product.color}</div>
        //         <div>${product.size}</div>
        //         <button id=${product.id} class="addToCartButton">Add to Cart</button>
        //     </div>`
        // })
        showData()
    }
    // productContainer.innerHTML=products;
    //filterData=[]
})

profile.href="./profile.html";
//let data = JSON.parse(localStorage.getItem('productList'));


//console.log(cartDetails)
// function updatedProductButton(cartDetail){
//     // cartDetail= JSON.parse(localStorage.getItem("cartDetails"));
//     data.forEach((product)=>{
//         if(cartDetail.some((item)=>item.id===product.id)){
//             document.getElementById(`${product.id}`).innerText="Added To Cart";
//         }else{
//             document.getElementById(`${product.id}`).innerText="Add To Cart";
//         }
//     })
// }

let all = document.getElementById("all");
let mens = document.getElementById("mens");
let womens = document.getElementById("womens");
let jewellery = document.getElementById("jewellery");
let electronics = document.getElementById("electronics");

//All Button functionality.
all.addEventListener('click',(e)=>{
    e.preventDefault();
    all.style.backgroundColor="black";
    all.style.color="white"
    mens.style.backgroundColor="inherit";
    mens.style.color="black"
    womens.style.backgroundColor="inherit";
    womens.style.color="black"
    jewellery.style.backgroundColor="inherit";
    jewellery.style.color="black"
    electronics.style.backgroundColor="inherit";
    electronics.style.color="black"
    
    showData()
})

//mens button functionality.
let filetrCategoryData =[];

mens.addEventListener('click',(e)=>{
    e.preventDefault();

    all.style.backgroundColor="inherit";
    all.style.color="black"
    mens.style.backgroundColor="black";
    mens.style.color="white"
    womens.style.backgroundColor="inherit";
    womens.style.color="black"
    jewellery.style.backgroundColor="inherit";
    jewellery.style.color="black"
    electronics.style.backgroundColor="inherit";
    electronics.style.color="black"
    filetrCategoryData=[];
    data.forEach((product)=>{
        if(filetrCategoryData.includes(product)==false && product.category==="men's clothing"){
            filetrCategoryData.push(product);
        }
    })
    
    console.log(filetrCategoryData)
    productContainer.innerHTML=""
    let products = "";
    //console.log(filterData)
    if(filetrCategoryData.length>0){
        filetrCategoryData.forEach((product)=>{
            products += `<div class="product">
                 <img src="${product.image}" alt="">
                 <h3>${product.title}</h3>
                 <div>₹ ${product.price}</div>
                 <div>
                     ${product.description}
                 </div>
                 <div>${product.category}</div>
                 <div>${product.color}</div>
                 <div>${product.size}</div>
                <button id=${product.id} class="addToCartButton">Add to Cart</button>
            </div>`
         })
        productContainer.innerHTML=products;
        setupAddToCartListeners(filetrCategoryData);
    }
})

// womens button functionality.
womens.addEventListener('click',(e)=>{
    e.preventDefault();

    all.style.backgroundColor="inherit";
    all.style.color="black"
    mens.style.backgroundColor="inherit";
    mens.style.color="black"
    womens.style.backgroundColor="black";
    womens.style.color="white";
    jewellery.style.backgroundColor="inherit";
    jewellery.style.color="black"
    electronics.style.backgroundColor="inherit";
    electronics.style.color="black"
    filetrCategoryData=[];
    data.forEach((product)=>{
        if(filetrCategoryData.includes(product)==false && product.category==="women's clothing"){
            filetrCategoryData.push(product);
        }
    })
    
    console.log(filetrCategoryData)
    productContainer.innerHTML=""
    let products = "";
    //console.log(filterData)
    if(filetrCategoryData.length>0){
        filetrCategoryData.forEach((product)=>{
            products += `<div class="product">
                 <img src="${product.image}" alt="">
                 <h3>${product.title}</h3>
                 <div>₹ ${product.price}</div>
                 <div>
                     ${product.description}
                 </div>
                 <div>${product.category}</div>
                 <div>${product.color}</div>
                 <div>${product.size}</div>
                <button id=${product.id} class="addToCartButton">Add to Cart</button>
            </div>`
         })
        productContainer.innerHTML=products;
        setupAddToCartListeners(filetrCategoryData);
    }
})

// jewellery button functionality.
jewellery.addEventListener('click',(e)=>{
    e.preventDefault();

    all.style.backgroundColor="inherit";
    all.style.color="black"
    mens.style.backgroundColor="inherit";
    mens.style.color="black"
    womens.style.backgroundColor="inherit";
    womens.style.color="black"
    jewellery.style.backgroundColor="black";
    jewellery.style.color="white";
    electronics.style.backgroundColor="inherit";
    electronics.style.color="black"
    filetrCategoryData=[];
    data.forEach((product)=>{
        if(filetrCategoryData.includes(product)==false && product.category==="jewelery"){
            filetrCategoryData.push(product);
        }
    })
    
    console.log(filetrCategoryData)
    productContainer.innerHTML=""
    let products = "";
    //console.log(filterData)
    if(filetrCategoryData.length>0){
        filetrCategoryData.forEach((product)=>{
            products += `<div class="product">
                 <img src="${product.image}" alt="">
                 <h3>${product.title}</h3>
                 <div>₹ ${product.price}</div>
                 <div>
                     ${product.description}
                 </div>
                 <div>${product.category}</div>
                 <div>${product.color}</div>
                 <div>${product.size}</div>
                <button id=${product.id} class="addToCartButton">Add to Cart</button>
            </div>`
         })
        productContainer.innerHTML=products;
        setupAddToCartListeners(filetrCategoryData);
    }
})


// electronics  button functionality.
electronics.addEventListener('click',(e)=>{
    e.preventDefault();

    all.style.backgroundColor="inherit";
    all.style.color="black"
    mens.style.backgroundColor="inherit";
    mens.style.color="black"
    womens.style.backgroundColor="inherit";
    womens.style.color="black"
    jewellery.style.backgroundColor="inherit";
    jewellery.style.color="black"
    electronics.style.backgroundColor="black";
    electronics.style.color="white";
    filetrCategoryData=[];
    data.forEach((product)=>{
        if(filetrCategoryData.includes(product)==false && product.category==="electronics"){
            filetrCategoryData.push(product);
        }
    })
    
    console.log(filetrCategoryData)
    productContainer.innerHTML=""
    let products = "";
    //console.log(filterData)
    if(filetrCategoryData.length>0){
        filetrCategoryData.forEach((product)=>{
            products += `<div class="product">
                 <img src="${product.image}" alt="">
                 <h3>${product.title}</h3>
                 <div>₹ ${product.price}</div>
                 <div>
                     ${product.description}
                 </div>
                 <div>${product.category}</div>
                 <div>${product.color}</div>
                 <div>${product.size}</div>
                <button id=${product.id} class="addToCartButton">Add to Cart</button>
            </div>`
         })
        productContainer.innerHTML=products;
        setupAddToCartListeners(filetrCategoryData);
    }
})

// search functionalaty code
let searchInput = document.getElementById("search-input");

let originalPosition = window.pageYOffset;

window.addEventListener("scroll", function() {
   let currentPosition = window.pageYOffset;
   if (currentPosition <= originalPosition) {
        searchInput.style.display = "block";
   } else {
        searchInput.style.display = "none";
   }
});

function debounce(loadData, timer) {
    let timerId;
    return ((e) => {
        if (timerId) {
            clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
            loadData(e.target.value)
        }, timer)
    })
}

function loadSearchProducts(input) {
    let data = JSON.parse(localStorage.getItem('productList'));
    console.log(data)
    productContainer.innerHTML = "";
    let products = "";
    data.forEach((product) => {
        if (product.color.includes(input) ||
            input.includes(product.color) ||
            input.includes(product.title) ||
            product.title.includes(input) ||
            input.includes(product.category) ||
            product.category.includes(input)
        ) {
            products += `<div class="product">
                <img src="${product.image}" alt="">
                <h3>${product.title}</h3>
                <div>₹ ${product.price}</div>
                <div>
                    ${product.description}
                </div>
                <div>${product.category}</div>
                <div>${product.color}</div>
                <div>${product.size}</div>
                <button id="${product.id}" class="addToCartButton">Add to Cart</button>
            </div>`;
        }
    });
    if (products) {
        productContainer.innerHTML = products;
    } else {
        productContainer.innerHTML = `
            <div class="notFound">
                Couldn’t find ${input}
            </div>
        `;
        productContainer.style.backgroundColor = "gainsboro";
        productContainer.style.width = "100vw";
        productContainer.style.height = "100vh";
    }
    let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));

    for (let i = 0; i < data.length; i++) {
        if(document.getElementById(`${data[i].id}`)){
            document.getElementById(`${data[i].id}`).addEventListener("click", (e) => {
                e.preventDefault();
                let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));
                let userCartDetails = getUserCartDetails(cartDetails);
                // console.log(getUserCartDetails(cartDetails))
                // userCartDetails.some(item => item.id === data[i].id
                if (!userCartDetails.includes(data[i])) {
                    userCartDetails.push(data[i]);
                    //updatedProductButton(cartDetails)
                    updateCartQuantity(userCartDetails)
    
                }
                localStorage.setItem("cartDetails",JSON.stringify(cartDetails))
            });
        }
        
    }
}

function loadData(input) {
    console.log(input);
    if (input.length > 0) {
        loadSearchProducts(input);
    } else if (input.length == 0) {
        showData();
    }
}

let searchString = debounce(loadData, 1000);
searchInput.addEventListener('keyup', searchString);





