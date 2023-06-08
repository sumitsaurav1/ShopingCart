let email= document.getElementById("email");
let password= document.getElementById("password");

let login = document.getElementById("login");
let verifyText = document.getElementById("verify-text")
login.addEventListener("click",(e)=>{
    e.preventDefault();
    let userDetails = JSON.parse(localStorage.getItem("userDetails"))
    
    let userEmailExits = false;
    let emailIndex;
    if(userDetails){
        for(let i=0;i<userDetails.length;i++){
            if(userDetails[i].email===email.value){
                userEmailExits=true;
                emailIndex=i;
            }
        }
    }
    function verifyPassword(i,userDetails){
        let result = "";
        for(let j=0;j<userDetails[i].password.length;j++){
            result += String.fromCharCode(userDetails[i].password.charCodeAt(j)-1)
        }
        return result;
    }

    function generateAccessToken(){
        result = '';
        let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for(let i=0;i<16;i++){
            let randomIndex= Math.floor(Math.random()*string.length)
            result += string[randomIndex]; 
        }
        return result;
    }
    if(userEmailExits){
        verifyText.innerText="";
       
        if(userDetails[emailIndex].email===email.value && password.value===verifyPassword(emailIndex,userDetails)){
            userDetails[emailIndex].accessToken = generateAccessToken();
            localStorage.setItem("userDetails", JSON.stringify(userDetails))
           // console.log("accsess",userDetails[emailIndex].accessToken)
            localStorage.setItem("userName",`${userDetails[emailIndex].firstName} ${userDetails[emailIndex].lastName}`)
            localStorage.setItem("userIndex",JSON.stringify(emailIndex))
            let link = document.createElement("a");
            link.href= "./shop.html";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
        }else{
            verifyText.innerText="Invalid Password"
            verifyText.style.color="red"
        }
        
    }else{
        // verifyText.innerText="Didn't find user"
        // verifyText.style.color="red"
        verifyText.innerHTML= `<span class="Unkonwn">Didn't find user</span>
                                <a href="signup.html">Sign Up</a>`
        // setTimeout(()=>{
        //     let link = document.createElement("a");
        //     link.href="./signup.html";
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        // },1500)
    }
})




