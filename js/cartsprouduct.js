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
    let productincart = JSON.parse(localStorage.getItem("product"))||[]
    if(productincart){
        drow(productincart)
    }

   function drow(arr){
         let y=arr.map((item)=>{
        return `
        <div class="product_item">
                       <img class="product_item_img" src="${item.imageUrl}"  alt="">
                       <div class="product_item_desc">
                           <h2>${item.title}</h2>
                           <p>the new mobile from oppo company 6-2022</p>
                           <span>Price: ${item.price}$</span>
                       </div>
                       <div class="product_item_action">
                        <button class="add_to_cart" onClick="removefromcart(${item.id})" >Remove From Cart</button>
                       </div>
                       
                       </div>
                   </div> `
    })
    allproducts.innerHTML=y.join("");
    let total = arr.reduce((sum, item)=>{
        return sum + item.price
    }, 0)
    document.querySelector("#total_price").innerHTML = total
    }
    function removefromcart(id){

     let deleted = false
    let newProducts = productincart.filter(item =>{
        if(item.id === id && !deleted){
            deleted = true
            return false   // يمسح أول واحد بس
        }

        return true  // يسيب الباقي
    }
    )

    localStorage.setItem("product", JSON.stringify(newProducts))

    productincart = newProducts

    drow(newProducts)
}


function drawFavItems(){

    let favItems = JSON.parse(localStorage.getItem("love")) || []

    let favContainer = document.querySelector(".favorites_container")

    let y = favItems.map((item)=>{
        return `
        <div class="product_item">
            <img class="product_item_img" src="${item.imageUrl}">
            <div class="product_item_desc">
                <h2>${item.title}</h2>
                <p>the new mobile from oppo company 6-2022</p>
                <div class="price_row">
                <span>Price: ${item.price}$</span>
                <i class="fas fa-heart fav red-heart" onClick="removeFromFav(${item.id})"></i>
            
                </div>    
            </div>
        </div>
        `
    })

    favContainer.innerHTML = y.join("")
}

drawFavItems();

function removeFromFav(id){

    let favItems = JSON.parse(localStorage.getItem("love")) || []

    let deleted = false

    let newFav = favItems.filter(item=>{
        if(item.id === id && !deleted){
            deleted = true
            return false
        }
        return true
    })

    localStorage.setItem("love", JSON.stringify(newFav))

    drawFavItems()
}