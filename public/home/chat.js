const socket = io();
const sendMessageBtn = document.querySelector("#sendMessageBtn")
const inputMessage = document.querySelector('#inputMessage')
const messagesDisplayEl = document.querySelector(".messages-display-container")


const fetchMessages = async () => {

    try {
        const response = await fetch("http://localhost:4000/loadMessages")
        const data = await response.json()
        return data
       
    }catch(error){
        console.log(error)
    }
}



const fetchUser = async () => {
    const accessToken = localStorage.getItem("accessToken")
    
    try {
        const response = await fetch("http://localhost:4000/profile", {
            headers: {
                "Content-type": "application/json",
                authorization:  `Bearer ${accessToken}`
            },
        })
        const userInfo = await response.json()
        return userInfo

    }catch(error){
        console.log(error)
    }
}

//render message
const createMessageStyle = data => {
    return `
        <div class="receivedMessage-container">
            <div class="receivedMessage">
                <img src="${data.profilePicture}"  alt="">

                <div>
                    <h4>${data.name}</h4>
                    ${data.message}
                </div>
            </div>
        </div>
        `
}
  

//receive message


const sendMessage = async () => {
    const { name ,profilePicture } = await fetchUser()
    const data = { 
        message: inputMessage.value,
        name,
        profilePicture
        
    }
    socket.emit("message", data)
    inputMessage.value = ''
    messagesDisplayEl.insertAdjacentHTML("beforeend", createMessageStyle(data))
    messagesDisplayEl.scrollTop = messagesDisplayEl.scrollHeight;
}

// window.setTimeout(() => {
        
    
        
// }, 100);
const renderOldMessages = async () => {
    const listMessages = await fetchMessages()
    
    listMessages.forEach( data => {
        messagesDisplayEl.insertAdjacentHTML("beforeend", createMessageStyle(data))
        messagesDisplayEl.scrollTop = messagesDisplayEl.scrollHeight;
    }) 
}


const init = () => {
    fetchUser()
    renderOldMessages()

    socket.on("receiveMessage", data => {
        messagesDisplayEl.insertAdjacentHTML("beforeend", createMessageStyle(data))
        
    
    })


    inputMessage.addEventListener("keypress" , (event) => {

        if(event.key == "Enter" && inputMessage.value.length !== 0) sendMessage()
    })
    sendMessageBtn.addEventListener('click', () => {
        if(inputMessage.value.length !== 0 ) sendMessage()
    })
}



//logout
const btnLogout = document.querySelector('.btnLogout')
btnLogout.addEventListener('click', () => {
    localStorage.removeItem("accessToken")
    window.location.href = "../auth/login.html"
})



const testUserExists = () => {
    const accessToken = localStorage.getItem("accessToken")
    const chatAppContainer = document.querySelector(".chatApp-container")
    if(!accessToken){
        return chatAppContainer.innerHTML = ""
    }
    init()
}


testUserExists()