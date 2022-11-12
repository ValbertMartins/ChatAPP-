const registerForm = document.querySelector('#form-auth')
const username = document.querySelector("input[name=name]") 
const password = document.querySelector("input[name=password]") 
const messageDisplay = document.querySelector(".api-response")

const submitForm = async (name,password) => {
     
    try {
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: { "content-type": "application/json"},
            body: JSON.stringify({name,password})
        })
        const {message} = await response.json()
        messageDisplay.innerHTML = `<span>${message}</span>`
        
        
    } catch(error){
        console.log(error)
    } 

}




registerForm.addEventListener('submit', event => {
    event.preventDefault()
    submitForm(username.value , password.value)
})


