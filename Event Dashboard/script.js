
document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const eventModal = document.getElementById('eventModal');
    const closeBtn = document.querySelector('.close');
    const eventForm = document.getElementById('eventForm');
    const eventImage = document.getElementById('eventImage');
    const fileName = document.getElementById('fileName');
    const eventsContainer = document.querySelector('.events-container');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterBtn = document.querySelector('.close-register');
    const registerForm = document.getElementById('registerForm');
    const API_URL_CREATE = "https://project-community-xi.vercel.app/community/api/v1/event/create";
    const API_URL_FETCH = "https://project-community-xi.vercel.app/community/api/v1/event/getallevents";

    // Handle file input change to update file name display
    eventImage.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = 'No file chosen';
        }
    });

    // Handle event form submission
    eventForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', eventImage.files[0]);
        formData.append('title', document.getElementById('eventTitle').value);
        formData.append('subtitle', document.getElementById('eventSubtitle').value);
        formData.append('description', document.getElementById('eventDescription').value);
        formData.append('location', document.getElementById('eventLocation').value);
        formData.append('hostname', document.getElementById('eventHost').value);
        formData.append('hostemail', document.getElementById('eventHostEmail').value);
        formData.append('fromdate', document.getElementById('eventDate').value);
        formData.append('todate', document.getElementById('eventDate').value);

        try {
            const response = await axios.post(API_URL_CREATE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                const eventData = response.data.event_created;
                createAndAddEvent(eventData);

                // Close the modal and reset the form
                eventModal.style.display = 'none';
                eventForm.reset();
                fileName.textContent = 'No file chosen';

                // Show success message
                alert('Event created successfully!');
            }
        } catch (error) {
            console.error('Error while creating the event:', error);
            alert('Error while creating the event');
        }
    });

    // Function to create and add event element
    function createAndAddEvent(eventData) {
        const newEvent = createEventElement(eventData);
        eventsContainer.appendChild(newEvent);
    }

    // Function to create event element
    function createEventElement(eventData) {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'events';

        const img = document.createElement('img');
        img.className = 'event-image';
        img.src = eventData.imageurl;
        img.alt = eventData.title;

        const title = document.createElement('h3');
        title.textContent = eventData.title;

        const date = document.createElement('p');
        date.textContent = `Date: ${formatDateRange(eventData.fromdate, eventData.todate)}`;

        const location = document.createElement('p');
        location.textContent = `Location: ${eventData.location}`;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'event-buttons';

        const registerButton = document.createElement('button');
        registerButton.className = 'event-button register-button';
        registerButton.textContent = 'Register';


        buttonsDiv.appendChild(registerButton);

        eventDiv.appendChild(img);
        eventDiv.appendChild(title);
        eventDiv.appendChild(date);
        eventDiv.appendChild(location);
        eventDiv.appendChild(buttonsDiv);

        // Add event listener for register button to show registration modal
        registerButton.addEventListener('click', () => {
            registerModal.style.display = 'block';
            registerModal.style.opacity="1";
        });

        return eventDiv;
    }

    // Function to format the date range
    function formatDateRange(fromDate, toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);

        const fromDay = from.getDate();
        const toDay = to.getDate();
        const month = from.toLocaleString('default', { month: 'long' });
        const year = from.getFullYear();

        return `${month}-${fromDay}-${year}`;
    }

    // Open and close modal functions
    openModalBtn.onclick = function() {
        eventModal.style.display = 'block';
       
    };

    closeBtn.onclick = function() {
        eventModal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == eventModal) {
            eventModal.style.display = 'none';
        }
    };

    // Close registration modal when clicking the close button
    closeRegisterBtn.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    // Close registration modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Handle registration form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        console.log('Registration data:', formData);

        alert('Registered successfully!');
        registerModal.style.display = 'none';
        registerForm.reset();
    });

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
            alert('Error fetching events');
        }
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


    // Fetch and display events on page load
    fetchEvents();
});

