const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function() {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function() {
    sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function(e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
})





if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}


window.addEventListener('resize', function() {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
})


//logout

// Function to handle logout

const logoutBtn=document.querySelector(".logout")
function handleLogout() {
    // Clear local storage
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem("id");
    localStorage.removeItem("imageurl");

    // Redirect to home or login page
    window.location.href = '../home/index.html';
}

logoutBtn.addEventListener('click', handleLogout);



//events display

document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.querySelector('.events-container');
    const API_URL_FETCH = "https://project-community-xi.vercel.app/community/api/v1/event/getallevents";

    // Fetch all events from the API
    async function fetchEvents() {
        try {
            const response = await axios.get(API_URL_FETCH);
            const events = response.data;

            // Create and display event elements
            events.forEach(eventData => {
                const eventElement = createEventElement(eventData);
                eventsContainer.appendChild(eventElement);
            });
        } catch (error) {
            console.error('Error fetching events:', error);
           
        }
    }

    // Function to create event element
    function createEventElement(eventData) {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';

        const img = document.createElement('img');
        img.src = eventData.imageurl;
        img.alt = eventData.title;

        const title = document.createElement('h2');
        title.textContent = eventData.title;

        const description = document.createElement('p');
        description.textContent = eventData.description;

        const joinButton = document.createElement('button');
        joinButton.className = 'join-btn';
        joinButton.textContent = 'Join Us';

        // You can add an event listener to the join button here if needed

        eventDiv.appendChild(img);
        eventDiv.appendChild(title);
        eventDiv.appendChild(description);
        eventDiv.appendChild(joinButton);

        return eventDiv;
    }

    // Fetch and display events on page load
    fetchEvents();
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the profile image URL from local storage
    const profileImageUrl = localStorage.getItem('imageurl');
    const profileName=localStorage.getItem("username")

    // Update the profile image in the navigation bar
    document.getElementById("userName").innerHTML=`Hi ${profileName}`;
    const profileImageNav = document.getElementById('profileimg');
    if (profileImageUrl) {
        profileImageNav.src = profileImageUrl;
    }
});


if(localStorage.length==0){
    window.location.href = "../signinSignup/index.html";
}