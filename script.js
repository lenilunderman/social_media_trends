// DOM elements to be used for the application 
const addUser = document.getElementById('add-users-btn')
const multipleUser = document.getElementById('multipleUser-btn')
const over250kUser = document.getElementById('search-btn')
const trline = document.getElementById('body-table')
const sortChannelUser = document.getElementById('sortUser-btn')

// DOM elements for the chart js
let ctx = document.getElementById('myChart')

// the place where all the users will be stored
let usersList = [];
let usersListShallow = []
let usersTrendingshallow = []
let user250kShallow = []
let userSortViewShallow = []

// Function to fetch the data for the API
async function fetchUserData(){
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    // create an instance of the results
    const user = data.results[0]
    // create the new object user
    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        social: Math.floor(Math.random() * 1000 )
    }
    // add the user to a function that will update the user list obj
    addData(newUser)
    //updateChart()
}


// Function to add the data to the array
function addData(obj) {
  
    // push the data to the array outside the function
    usersList.push(obj)
    
    // create a shallow copy of the array to be passed to the chart
    usersListShallow = [...usersList]

    // update the DOM with the information
    updateDOM()

    // update the Chart with the information
    updateChart(usersListShallow) 
}


// Function to update the chart with the right information
function updateChart(dataProvided = chartData) {
    
    // create the variable to hold the value
    const arrayUusers = []
    const arraySocials = []

    dataProvided.forEach(item => {

        // push the information for the correct array
        arrayUusers.push(item.name)
        arraySocials.push(item.social)
    })

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrayUusers,
            datasets: [{
                label: ' Views per channel ',
                data: arraySocials,
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
                borderWidth: 2
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
    // grab the list with all the users

    usersList = usersList.map(user => {
        // get the all the users, than set the social to a new value.
        return {...user, social: user.social * 1.5 }
    })
    usersTrendingshallow = [...usersList]
    // update the DOM with the new information
    
    updateDOM()
    updateChart(chartData = usersTrendingshallow)
  
}

// Function that will filter everything inside the object based on an condition user.social > 250
function over250kUserFilter() {
    usersList = usersList.filter( user => user.social > 250)
    user250kShallow = [...usersList]
    
    updateDOM()
    updateChart(providedData = user250kShallow)
}

// Function that will sort all the users based on the number of views
function sortChannelView() {
    // sort top to bottom
    usersList.sort((a,b) => b.social - a.social)
    userSortViewShallow = [...usersList]
    updateDOM()
    updateChart(providedData = userSortViewShallow)
}

// Events for tthe application
addUser.addEventListener('click', fetchUserData)
multipleUser.addEventListener('click', getnewTrends)
sortChannelUser.addEventListener('click', sortChannelView)
over250kUser.addEventListener('click', over250kUserFilter)


// Chart to load in case the data is empty...

let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: ' Views per channel ',
            //data: [3,15, 10],
            data: [],
            //data: [12, 10, 3, 5, 2, 3],
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