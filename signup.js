let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let conpassword = document.getElementById("confirm-password");

let signup = document.getElementById("sign-up");
let verifyText = document.getElementById("verify-text");

let userDetails=JSON.parse(localStorage.getItem("userDetails")) || [];
let cartDetails=JSON.parse(localStorage.getItem("cartDetails")) || [];

localStorage.setItem("userDetails",JSON.stringify(userDetails))
localStorage.setItem("cartDetails",JSON.stringify(cartDetails))

signup.addEventListener("click",(e)=>{
    e.preventDefault();

    if(firstName.value && lastName.value && email.value &&  password.value && conpassword.value){
        if(password.value===conpassword.value){
           
           setTimeout(()=>{
               upadteUserDetails()
           },1000)
           console.log(lastName.value)
      }
      else{
       verifyText.innerText="Error: Password and confirm should be same"
       verifyText.style.color="red";
      }
   }
   else{
       
       verifyText.innerText="Error: All the fields are mandatory"
       verifyText.style.color="red";
   }
})
function passwordHashing(password){
    let result ="";
    for(let i=0;i<password.length;i++){
        result += String.fromCharCode(password.charCodeAt(i)+1)
    }
    return result;
}
function upadteUserDetails(){
    let userDetail = {
        firstName:firstName.value,
        lastName:lastName.value,
        email:email.value,
        password:passwordHashing(password.value)
    }

    let userDetails = JSON.parse(localStorage.getItem("userDetails"))
    let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));
    let userExits = false;
    for(let i=0;i<userDetails.length;i++){
        if(userDetails[i].email===userDetail.email){
            userExits=true;
        }
    }
    if(!userExits){
        userDetails.push(userDetail);
        localStorage.setItem("userDetails",JSON.stringify(userDetails))

        let userCartDetails =[];
        userCartDetails[0]=userDetail.email;
        cartDetails.push(userCartDetails);
        localStorage.setItem("cartDetails",JSON.stringify(cartDetails))

        firstName.value="";
        lastName.value="";
        email.value="";
        password.value="";
        conpassword.value="";
        verifyText.innerText="Successfully Singned up, Redirecting you to login Page";
        verifyText.style.color="green"
        setTimeout(()=>{
            let link = document.createElement("a");
            link.href="./login.html";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
       },3000)
    }else{
       //alert("user exits")
       verifyText.innerText="User Exits, Redirecting you to login Page"
       verifyText.style.color="red";
       setTimeout(()=>{
            let link = document.createElement("a");
            link.href="./login.html";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
       },3000)
    }
}




