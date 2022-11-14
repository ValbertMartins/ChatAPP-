const socket = io();
const sendMessageBtn = document.querySelector("#sendMessageBtn")
const inputMessage = document.querySelector('#inputMessage')
const messagesDisplayEl = document.querySelector(".messages-display-container")
const chatAppContainer = document.querySelector(".chatApp-container")

const verifyJWT = async () => {
     const accessToken = localStorage.getItem('accessToken')
     if(!accessToken){
         return chatAppContainer.innerHTML = "<img class='loadingImg' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' >"
     }

     

 }


const fetchMessages = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const response = await fetch("http://localhost:4000/loadMessages", {
        headers: { authorization: `Bearer ${accessToken}`}
    })
    const data = await response.json()
    return data
       
  
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
                <img src="http://localhost:4000/uploads/${data.profilePicture}"  alt="">

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
    try {

        const { name ,profilePicture } = await fetchUser()
       
        if(!name){
            return chatAppContainer.innerHTML = "<img class='loadingImg' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' >"
        }
        
        const data = { 
            message: inputMessage.value,
            name,
            profilePicture
    
        }
        socket.emit("message", data)
        inputMessage.value = ''
        messagesDisplayEl.insertAdjacentHTML("beforeend", createMessageStyle(data))
        messagesDisplayEl.scrollTop = messagesDisplayEl.scrollHeight;
    }catch(error){
        console.log(error)
        return chatAppContainer.innerHTML = "<img class='loadingImg' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' >"
    }
}


const renderOldMessages = async () => {

    try {

        const listMessages = await fetchMessages()
        
        listMessages.forEach( data => {
            messagesDisplayEl.insertAdjacentHTML("beforeend", createMessageStyle(data))
            messagesDisplayEl.scrollTop = messagesDisplayEl.scrollHeight;
        }) 

    }catch(error){
        return chatAppContainer.innerHTML = "<img class='loadingImg' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' >"
    }
}

//init
const init = () => {
    renderOldMessages()

    socket.on("receiveMessage", data => {

        console.log(data)
        if(!data.access) {
            return chatAppContainer.innerHTML = "<img class='loadingImg' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' >"
        }
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
    const accessToken = localStorage.getItem('accessToken')
    if(!accessToken){
        return chatAppContainer.innerHTML = "<img class='loadingImg' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' >"
    }
    init()
    
    //init()
}

testUserExists()
