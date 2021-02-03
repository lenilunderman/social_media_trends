const addUser = document.getElementById('add-users-btn')
const multipleUser = document.getElementById('multipleUser-btn')
const searchUser = document.getElementById('search-btn')
const calculateUser = document.getElementById('calculateUser-btn')
const trline = document.getElementById('body-table')


let usersList = [];

async function getnewUsers(){
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    // create an instance of the results
    const user = data.results[0]
    // create the new user
    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        social: Math.floor(Math.random() * 1000 )
    }
    // update the new user to the database...
    
    addData(newUser)  
}


function addData(obj) {
    usersList.push(obj)
    // update the information on the screen
    updateDOM()
}

function updateDOM( providedData = usersList){
    trline.innerHTML = '' // clear everything before adding new stuff
   
    providedData.forEach(item => {
        const element = document.createElement('tr')
        element.innerHTML = `
        <td class="has-text-left cname"> ${item.name} </td>
        <td class="has-text-right cview"> ${item.social} k</td>
        `
        trline.appendChild(element) 
    })
}

function getnewTrends() {
    usersList = usersList.map((user) => {
        // get the all the users, than set the social to a new value.
        return {...user, social: user.social * 1.5 }
    })
    updateDOM()
}








addUser.addEventListener('click', getnewUsers)
multipleUser.addEventListener('click', getnewTrends)