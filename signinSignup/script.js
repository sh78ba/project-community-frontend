

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.querySelector('.sign-up form');
const signInForm = document.querySelector('.sign-in form');

// Add event listeners for toggling between sign-up and sign-in forms
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const API_URL = "https://project-community-xi.vercel.app/community/api/v1";

// Function to handle form submissions
async function handleFormSubmit(event, type) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    

    try {
        if (type === 'signup') {
            let url = `${API_URL}/signup`;
            const response = await axios.post(url, data);
            //console.log('Response:', response.data);
            // Handle success response
            window.location.href = '../signinSignup/index.html';
            alert("SiginUp Successfull")
        }

          
        let url1 = `${API_URL}/signin`;
        const response = await axios.post(url1, data);
        //console.log('Response:', response.data);
        // Handle success response
        const { email, name,id } = response.data;

        // Store email and username in local storage
        localStorage.setItem('email', email);
        localStorage.setItem('username', name);
        localStorage.setItem("id",id);

        // Redirect to ../index.html after successful signup or signin
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Error:', error);
        // Handle error response
        alert(`Error: ${error.response.data.message}`);
    }
}

// Add event listeners for form submissions
signUpForm.addEventListener('submit', (event) => handleFormSubmit(event, 'signup'));
signInForm.addEventListener('submit', (event) => handleFormSubmit(event, 'signin'));
