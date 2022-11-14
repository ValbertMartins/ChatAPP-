const preview = document.querySelector('#preview')
const inputFile = document.querySelector("input[type=file]")
const btnSave = document.querySelector("#saveBtn")
const accessToken = localStorage.getItem('accessToken')
const btnBack = document.querySelector('.btnBack')
inputFile.addEventListener('change',() => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        preview.style.backgroundImage = `url(${reader.result})`
        
    })
    reader.readAsDataURL(inputFile.files[0])
    
} )
btnBack.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = "./chat.html"
})


const submitImg = async () => {
    
    const formData = new FormData()
    formData.append('avatar', inputFile.files[0])
    try {
        const response = await fetch("http://localhost:4000/storeAvatar", {
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            method:"POST",  
             
            body: formData
        })
        const avatar = await response.json()
        console.log(avatar)
        preview.style.backgroundImage = `http://localhost:4000/uploads/${avatar}`
    }catch(error){
        console.log(error)
    }
}

btnSave.addEventListener('click', () => {
    submitImg()
})


const fetchUser = async () => {
    const accessToken = localStorage.getItem("accessToken")
    try {

        const response = await fetch('http://localhost:4000/profile', {
            headers: {authorization: `Bearer ${accessToken}`}
        })
        const user = await response.json()
        return user
    }catch(error){
        console.log(error)
    }
}

const showInfoUser = async () => {
    const userNameEl = document.querySelector("#userNameEl")
    const user = await fetchUser()
    preview.style.backgroundImage = `url(http://localhost:4000/uploads/${user.profilePicture})`
    userNameEl.innerText = user.name
}



const init = () => {
    showInfoUser()
    
}

init()