const loginForm = document.querySelector('#form-auth')
const username = document.querySelector("input[name=name]") 
const password = document.querySelector("input[name=password]") 
const messageDisplay = document.querySelector(".api-response")



const submitForm = async (name,password) => {
     
    try {


        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "content-type": "application/json"},
            body: JSON.stringify({name,password})
        })
        const { message , accessToken , user } = await response.json()
        if(!accessToken) {
            return messageDisplay.innerHTML = `<span>${message}</span>`
        }
        
        localStorage.setItem("accessToken", accessToken)


        window.location.href = "../home/chat.html"
        
        
    } catch(error){
        console.log(error)
    } 

}

loginForm.addEventListener('submit', event => {
    event.preventDefault()
    submitForm(username.value, password.value)
    

})