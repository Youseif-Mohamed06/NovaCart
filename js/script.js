let userinfo =document.querySelector("#user_info")
let user =document.querySelector("#user")
let links =document.querySelector("#links")
if(localStorage.getItem("isLoggedIn")){
    links.remove();
    userinfo.style.display="flex"
    user.innerHTML=localStorage.getItem("username")
}

let logout=document.querySelector("#logout");

logout.addEventListener("click",()=>{
    localStorage.removeItem("isLoggedIn");
    setTimeout(()=>{
        window.location="login.html";
    }
)
},500)

let allproducts=document.querySelector(".products")
 let products = [
    {
    id: 1,
    title: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30 hours battery life.",
    price: 3499,
    imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_52_19 PM.png"
},
{
    id: 2,
    title: "Laptop Pro 15.6-inch",
    description: "Powerful 15.6-inch laptop with Intel Core i7 processor, 16GB RAM, 512GB SSD storage, and Full HD display. Perfect for gaming, programming, and professional work.",
    price: 24999,
    imageUrl: "image/ChatGPT Image Feb 25, 2026, 05_02_03 PM.png"
},
{
    id: 3,
    title: "Smart Watch Strap",
    description: "Comfortable silicone strap compatible with most smart watches.",
    price: 899,
    imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_26_41 PM.png"
},
{
    id: 4,
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with deep bass and 12 hours playtime.",
    price: 1799,
    imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_32_34 PM.png"
},
{
    id: 5,
    title: "Power Bank 20000mAh",
    description: "Fast charging power bank with dual USB ports and LED indicator.",
    price: 599,
    imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_31_04 PM.png"
},
{
    id: 6,
    title: "Wireless Charger",
    description: "Ultra-slim wireless charging pad compatible with all Qi-enabled devices.",
    price: 749,
    imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_43_27 PM.png"
},
{
    id: 7,
    title: "USB-C Cable",
    description: "High-speed USB-C cable with durable braided design.",
    price: 149,
    imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_41_22 PM.png"
},
{
   id: 8,
   title: "Gaming Mouse",
   description: "RGB gaming mouse with adjustable DPI and ergonomic design.",
   price: 1299,
   imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_44_10 PM.png"
},
{
   id: 9,
   title: "Mechanical Keyboard",
   description: "Mechanical keyboard with blue switches and customizable RGB lighting.",
   price: 2599,
   imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_45_20 PM.png"
},
{
   id: 10,
   title: "RGB Gaming Mouse Pad",
   description: "Large RGB gaming mouse pad with smooth microfiber surface and non-slip rubber base. Features customizable LED lighting modes for an immersive gaming experience.",
   price: 799,
   imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_49_25 PM.png"
},
{
   id: 11,
   title: "Car Phone Holder",
   description: "360° adjustable car phone holder with strong suction grip.",
   price: 249,
   imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_49_54 PM.png"
},
{
   id: 12,
   title: "AirPods Pro Case",
   description: "Protective silicone case for AirPods Pro with keychain attachment.",
   price: 779,
   imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_51_19 PM.png"
}

    ];



  function drowitem(arr){
    let y=arr.map((item)=>{
        return `
        <div class="product_item">
                       <img class="product_item_img" src="${item.imageUrl}"  alt=""  >
                       <div class="product_item_desc">
                           <h2>${item.title}</h2>
                           <p>${item.description}</p>
                           <span>Price: ${item.price}$</span>
                       </div>
                       <div class="product_item_action">
                        <button class="add_to_cart" onClick="addtocart(${item.id})" >Add To Cart</button>
                        <i class="far fa-heart fav" onClick="fav(${item.id})" ></i>
                       </div>
                   </div> `
    })
    allproducts.innerHTML=y.join("");
    }
    drowitem(products);

let badge=document.querySelector(".badge");
let cartsproductsdiv=document.querySelector(".carts_products div")


let totalElement = document.querySelector("#total_price");
let totalPrice = 0;

let addeditem = JSON.parse(localStorage.getItem("product")) || []
addeditem.forEach(item => {
    cartsproductsdiv.innerHTML += `<p>${item.title}</p>`
    badge.innerHTML++
    totalPrice += item.price
    totalElement.innerHTML = totalPrice
})






function addtocart(id){
    if(localStorage.getItem("isLoggedIn")){
        let choose=products.find((item)=>item.id===id)
        cartsproductsdiv.innerHTML+=`<p>${choose.title}</p>`;
        badge.innerHTML++;
        totalPrice +=choose.price;
        totalElement.innerHTML=totalPrice
        addeditem=[...addeditem,choose]
        localStorage.setItem("product",JSON.stringify(addeditem))
    }
    else{
        window.location="login.html";
    }


}

let shoppingcart=document.querySelector(".shopping_cart")
let cartsproducts=document.querySelector(".carts_products")
shoppingcart.addEventListener("click",()=>{
    if(cartsproductsdiv.innerHTML!=""){
        if(cartsproducts.style.display=="block")
        cartsproducts.style.display="none"; 
        else{
         cartsproducts.style.display="block";
    }
    }
})


let searchinput=document.querySelector("#search_input")
let searchbtn=document.querySelector("#search_btn");

searchbtn.addEventListener("click",()=>{
    let secrchvalue = searchinput.value.toLowerCase();
    let filteredProducts=products.filter((item)=>{
        return item.title.toLowerCase().includes(secrchvalue);
    })
    drowitem(filteredProducts);
})
let loveitem =[]
function fav (id){
    let love=products.find((item)=>item.id===id)
    loveitem=[...loveitem,love]
    localStorage.setItem("love",JSON.stringify(loveitem))
}





