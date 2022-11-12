
const accessToken = localStorage.getItem("accessToken")


const fetchUsers = async () => {

    try {
        const usersList = await fetch("http://localhost:4000/profile", {
            headers: {"content-type":"application/json", "authorization": `Bearer ${accessToken}`}
        })

        const data = await usersList.json()
        return data 
    }catch(error){
        console.log(error)
    }
    
}


const createUserEL = (username,profilePicture) => {
    return `<a href="./chat.html?${username}"><article class="message-container" alt= ${username} >
            <div class="profile-container">
                <div class="picture-container">
                    <img src="${profilePicture}"  alt="">
                </div>
                <div class="last-message-container">
                    <span class="usernameDisplay">${username}</span>
                    
                    <p class="last-message">last message</p>
                    
                </div>
            </div>

            <div class="date-container">

            </div>
            
        </article>
    </a>`
    
}



const renderUsers = async () => {
    const usersList = await fetchUsers()
    const chatAppEL = document.querySelector(".chatApp-container")
    usersList.forEach( user => {
        chatAppEL.insertAdjacentHTML('beforeend', createUserEL(user.name,user.profilePicture))
        
    });
    redirectUserToChat()
    
}

const redirectUserToChat = () => {
    const messageContainerEL = document.querySelectorAll(".message-container")
    
    messageContainerEL.forEach( messageContainer => {
        
        messageContainer.addEventListener('click', (event) => {
            const userName = messageContainer.attributes[1].value
            
            //window.location.href = `http://localhost:4000/chat.html`
        })
    })
}

const init = () => {
    renderUsers()
    
}

init()


const btnLogout = document.querySelector('.btnLogout')
btnLogout.addEventListener('click', () => {
    localStorage.removeItem("accessToken")
    window.location.href = "../auth/login.html"
})




