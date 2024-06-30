
const interests = [
    { name: 'Football', icon: 'fas fa-futbol' },
    { name: 'Fine dining', icon: 'fas fa-utensils' },
    { name: 'Poetry', icon: 'fas fa-feather-alt' },
    { name: 'Cars', icon: 'fas fa-car' },
    { name: 'Arts', icon: 'fas fa-palette' },
    { name: 'History', icon: 'fas fa-landmark' },
    { name: 'Science & Tech', icon: 'fas fa-microscope' },
    { name: 'Travel', icon: 'fas fa-plane' },
    { name: 'Film', icon: 'fas fa-film' }
];

function renderInterests() {
    const interestTags = document.getElementById('interestTags');
    interestTags.innerHTML = '';
    interests.forEach(interest => {
        const tag = document.createElement('span');
        tag.className = 'interest-tag';
        tag.innerHTML = `<i class="${interest.icon} icon"></i>${interest.name}`;
        interestTags.appendChild(tag);
    });
}

// edit profile

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function saveProfile() {
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const password = document.getElementById('editPassword').value;
    const confirmPassword = document.getElementById('editConfirmPassword').value;

    // Here you would typically validate the input and send it to a server
    // For this example, we'll just update the visible profile information
    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    document.getElementById('profileName').textContent = name;
    document.getElementById('profileEmail').textContent = email;

    // Close the modal
    closeModal('editProfileModal');

    // You might want to show a success message here
    alert("Profile updated successfully!");
}

 


// interest edit

function openEditInterestsModal() {
    document.getElementById('editInterestsModal').style.display = 'block';
    document.getElementById('editInterests').value = interests.map(i => i.name).join(', ');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function saveInterests() {
    const newInterests = document.getElementById('editInterests').value;
    interests.length = 0;
    newInterests.split(',').forEach(name => {
        interests.push({ name: name.trim(), icon: 'fas fa-star' });
    });
    renderInterests();
    closeModal('editInterestsModal');
}

function openFileUpload() {
    document.getElementById('profilePicInput').click();
}

function handleProfilePicUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePic = document.getElementById('profilePic');
            profilePic.style.backgroundImage = `url(${e.target.result})`;
            profilePic.style.backgroundSize = 'cover';
            profilePic.style.backgroundPosition = 'center';
            profilePic.textContent = '';
        };
        reader.readAsDataURL(file);
    }
}

// Add event listener for file input change
document.getElementById('profilePicInput').addEventListener('change', handleProfilePicUpload);

function animateProgress(targetPercentage) {
    const progressCircle = document.getElementById('progressCircle');
    const progressInner = progressCircle.querySelector('.progress-inner');
    let currentPercentage = 0;
    
    const interval = setInterval(() => {
        if (currentPercentage >= targetPercentage) {
            clearInterval(interval);
        } else {
            currentPercentage++;
            progressCircle.style.background = `conic-gradient(var(--blue) ${currentPercentage * 3.6}deg, var(--grey) 0deg)`;
            progressInner.textContent = currentPercentage + '%';
        }
    }, 20);
}

renderInterests();
animateProgress(70);

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}


//for update photo
// API URLs
const API_URL_UPDATE_PHOTO = 'https://project-community-xi.vercel.app/community/api/v1/updatephoto';
const API_URL_GET_USER = 'https://project-community-xi.vercel.app/community/api/v1/getuser';

// Function to open file upload dialog
function openFileUpload() {
document.getElementById('profilePicInput').click();
}

// Function to handle profile photo update
document.getElementById('profilePicInput').addEventListener('change', async function() {
const file = this.files[0]; // Get the selected file

// Prepare form data for photo update
const formData = new FormData();
formData.append('email', localStorage.getItem("email")); // Replace with actual email
formData.append('image', file);

try {
// Send POST request to update photo API
const response = await axios.put(API_URL_UPDATE_PHOTO, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

// Handle success
if (response.status === 200) {
    // Fetch updated user details after updating photo
    const userDataResponse = await axios.get(API_URL_GET_USER, {
        params: {
            email: localStorage.getItem("email") // Replace with actual email
        }
    });

    // Handle user data response
    if (userDataResponse.status === 200) {
        const userData = userDataResponse.data;
        const profileImageUrl = userData.photourl;

        // Update profile pic display
        displayProfileImage(profileImageUrl);

        // Store image URL in localStorage (optional)
        localStorage.setItem('imageurl', profileImageUrl);

        // Display success message (optional)
    }
}
} catch (error) {
// Handle error
console.error('Error updating profile photo:', error);

}
});

// Function to display profile image in profile div
function displayProfileImage(imageUrl) {
const profilePicDiv = document.getElementById('profilePic');
profilePicDiv.innerHTML = `<img src="${imageUrl}">`;
}



// Initial fetch of user profile photo (optional)
async function fetchUserProfile() {
try {
const userDataResponse = await axios.get(API_URL_GET_USER, {
    params: {
        email: localStorage.getItem("email") // Replace with actual email
    }
});

if (userDataResponse.status === 200) {
    const userData = userDataResponse.data;
    const profileImageUrl = userData.photourl;

    // Display profile image
    displayProfileImage(profileImageUrl);

    // Store image URL in localStorage (optional)
    localStorage.setItem('imageurl', profileImageUrl);

}
} catch (error) {
console.error('Error fetching user profile:', error);
}
}

// Fetch user profile photo on page load (optional)
fetchUserProfile();

document.addEventListener('DOMContentLoaded', function() {
// Function to fetch user details from localStorage
function fetchUserProfile() {
const storedName = localStorage.getItem('username');
const storedEmail = localStorage.getItem('email');

if (storedName && storedEmail) {
    // Update profile name and email in the DOM
    document.getElementById('profileName').textContent = storedName;
    document.getElementById('profileEmail').textContent = storedEmail;
} else {
    // Handle case where data isn't available in localStorage
    console.log('Profile data not found in localStorage');
}
}

// Call fetchUserProfile when DOM content is loaded
fetchUserProfile();
});


// Example code to update profile image in the navigation bar from local storage
document.addEventListener('windowsonload', function() {
// Fetch the profile image URL from local storage
const profileImageUrl = localStorage.getItem('imageurl');

// Update the profile image in the navigation bar
const profileImageNav = document.getElementById('profileimg');
if (profileImageUrl) {
profileImageNav.src = profileImageUrl;
}
});


async function saveProfile() {
const editName = document.getElementById('editName').value;
const editEmail = document.getElementById('editEmail').value;
const editPhone = document.getElementById('editPhone').value;
const editPassword = document.getElementById('editPassword').value;

// Validate inputs (e.g., password match validation)

const payload = {
id:localStorage.getItem("id"),
name: editName,
email: editEmail,
phone: editPhone,
password: editPassword // Note: Ensure proper security measures for password handling
};

try {
const response = await axios.put("https://project-community-xi.vercel.app/community/api/v1/updateprofile", payload);
if (response.status === 200) {
    // Update UI or show success message
    alert('Profile updated successfully');
    closeModal('editProfileModal'); // Close modal after successful update
} else {
    alert('Failed to update profile');
}
} catch (error) {
console.error('Error updating profile:', error);
alert('Failed to update profile');
}
}

if(localStorage.length==0){
    window.location.href = "../signinSignup/index.html";
}