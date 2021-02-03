

const addUser = document.getElementById('add-users-btn')
const multipleUser = document.getElementById('multipleUser-btn')
const over250kUser = document.getElementById('search-btn')
const trline = document.getElementById('body-table')
const sortChannelUser = document.getElementById('sortUser-btn')


// the place where all the users will be stored
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
    // add the user to a function that will update the user list obj
    addData(newUser)  
}


function addData(obj) {
    // update the user obj
    usersList.push(obj)
    // update the information on the screen
    updateDOM()
}

function updateDOM( providedData = usersList){
    // clear everything on the screen before adding new items
    trline.innerHTML = '' 
    // create the node with the html part displaying the information
    providedData.forEach(item => {
        const element = document.createElement('tr')
        element.innerHTML = `
        <td class="has-text-left cname"> ${item.name} </td>
        <td class="has-text-right cview"> ${item.social} k</td>
        `
        // append that to the html part
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

// Function that will sort all the users based on the number of views
function sortChannelView() {
    // sort top to bottom
    usersList.sort((a,b) => b.social - a.social)
    updateDOM()
}

// Function that will filter everything inside the object based on an condition user.social > 250
function over250kUserFilter() {
    usersList = usersList.filter( user => user.social > 250)
    updateDOM()
}



// Events for tthe application

addUser.addEventListener('click', getnewUsers)
multipleUser.addEventListener('click', getnewTrends)
sortChannelUser.addEventListener('click', sortChannelView)
over250kUser.addEventListener('click', over250kUserFilter)

// Chart for the application Using a 3rd party.
// Any of the following formats may be used

const ctx = document.getElementById('myChart')
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: ' Views per channel ',
            data: [12, 10, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 184, 0, 1)',
                'red',
                'green',
                'blue',
                'pink',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});