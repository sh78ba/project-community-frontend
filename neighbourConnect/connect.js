

document.addEventListener('DOMContentLoaded', () => {
    const createListingBtn = document.getElementById('createListingBtn');
    const createPostModal = document.getElementById('createPostModal');
    const createPostForm = document.getElementById('createPostForm');
    const listingsContainer = document.getElementById('listingsContainer');
    const closeBtn = document.querySelector('.close');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');

    const API_URL = 'https://project-community-xi.vercel.app/community/api/v1';

    async function fetchListings() {
        try {
            const response = await axios.get(`${API_URL}/neighbour/getAll`);
            const listings = response.data;
            listings.forEach(listing => createListing(listing.title, listing.description, listing.imageurl));
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    }

    createListingBtn.addEventListener('click', () => {
        createPostModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        createPostModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === createPostModal) {
            createPostModal.style.display = 'none';
        }
    });

    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });

    createPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('postTitle').value;
        const description = document.getElementById('postDescription').value;
        const image = document.getElementById('imageUpload').files[0];
        const email=localStorage.getItem("email");
       const phone=localStorage.getItem("phone");
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        ///test data
        formData.append('email',"root@gmail.com");
        formData.append('phone',"9876543210");


        try {
            const response = await axios.post(`${API_URL}/neighbour/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Assuming successful creation, add the new listing to the UI
            const newListing = response.data;
            createListing(newListing.title, newListing.description, newListing.imageUrl);
        
        // Fetch listings again to refresh the UI
        fetchListings();

        } catch (error) {
            console.error('Error saving listing:', error);
        }

        createPostModal.style.display = 'none';
        createPostForm.reset();
        imagePreview.style.display = 'none';
    });

    function createListing(title, description, imageUrl) {
        const listing = document.createElement('div');
        listing.className = 'listing';
        listing.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <div class="listing-content">
                <div class="listing-category">${title}</div>
                <p class="listing-description">${description}</p>
                <div class="listing-footer">
                    <span>Just now</span>
                    <div class="listing-actions">
                        <i class="far fa-heart like-btn"></i>
                        <i class="far fa-comment"></i>
                        <i class="fas fa-share share-btn"></i>
                    </div>
                </div>
                <a href="#" class="contact-btn">Contact</a>
            </div>
        `;
        listingsContainer.prepend(listing);

        // Add event listeners for like and share buttons
        const likeBtn = listing.querySelector('.like-btn');
        const shareBtn = listing.querySelector('.share-btn');

        likeBtn.addEventListener('click', function() {
            this.classList.toggle('fas');
            this.classList.toggle('far');
            this.style.color = this.classList.contains('fas') ? '#DB504A' : '';
        });

        shareBtn.addEventListener('click', function() {
            // Create a temporary input element
            const tempInput = document.createElement('input');
            // Set its value to the current page URL
            tempInput.value = window.location.href;
            // Append it to the body
            document.body.appendChild(tempInput);
            // Select the input content
            tempInput.select();
            // Copy the selected text
            document.execCommand('copy');
            // Remove the temporary element
            document.body.removeChild(tempInput);
    
            // Show a tooltip or notification
            alert('Link copied to clipboard!');
    
            // You can replace the alert with a custom tooltip or notification
            // For example:
            // showNotification('Link copied to clipboard!');
        });
    }
    
    // Optional: Custom notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--blue);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(notification);
    
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
    
        // Fade out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Fetch listings when page loads
    fetchListings();
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