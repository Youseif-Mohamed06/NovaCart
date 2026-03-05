let user=document.querySelector("#username")
let pass=document.querySelector("#password")
let signin=document.querySelector("#sign_in")
let getuser=localStorage.getItem("username")
let getpass=localStorage.getItem("password")

signin.addEventListener("click",(e)=>{
    e.preventDefault()
    if(user.value==""||pass.value==""){
        alert("Please Enter Username Or Password")
    }
    else if(user.value!==getuser|| pass.value!==getpass){
        alert("Username Or Password Wrong")
    }
    else{
        localStorage.setItem("isLoggedIn", true);
        setTimeout(()=>{
            window.location="index.html"
        },500)
        
    }

})
