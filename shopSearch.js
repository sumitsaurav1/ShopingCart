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
                <div>${product.price}</div>
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
                if(!cartDetails.some((item) => item.id === data[i].id)) {
                    cartDetails.push(data[i]);
                }
                localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
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
