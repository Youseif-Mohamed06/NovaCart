let user=document.querySelector("#username")
let email=document.querySelector("#email")
let pass=document.querySelector("#password")
let signup=document.querySelector("#sign_up")


signup.addEventListener("click",(e)=>{
    e.preventDefault();
    if(user.value===""||email.value===""||pass.value===""){
        alert("please fill the data");
    }
    else {
        localStorage.setItem("username",user.value);
        localStorage.setItem("email",email.value);
        localStorage.setItem("password",pass.value);
        setTimeout(()=>{
            window.location = "login.html";
        },500)
    }
})
