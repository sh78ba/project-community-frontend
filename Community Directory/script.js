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



const BASE_URL = "https://project-community-xi.vercel.app";

const getCommunityList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/community/api/v1/cummunitydir/getAll`);
       // console.log('API Response:', response); // Log the response to check the structure
        const data = response.data;
        displayCommunityList(data);
    } catch (error) {
        console.error("Error fetching community list:", error);
    }
};

const displayCommunityList = (data) => {
    //console.log('Community List Data:', data); // Log the data to verify its structure
    const emergencyContactsContainer = document.getElementById('emergency-contacts');
    const municipalServicesContainer = document.getElementById('municipal-services');

    data.forEach(item => {
        // console.log(item)
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${item.imageurl}" alt="${item.title}" class="card-image">
            <div class="card-content">
                <div class="card-title">${item.title}</div>
                <div class="card-info">
                    <span class="icon">📍</span>
                    <span>${item.address}</span>
                </div>
                <div class="card-info">
                    <span class="icon">📞</span>
                    <span>+${item.phone}</span>
                </div>
            </div>
        `;

        if (item.service === 'emergency') {
            emergencyContactsContainer.appendChild(card);
        } else if (item.service === 'municipal') {
            municipalServicesContainer.appendChild(card);
        }
    });
};

getCommunityList();


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

