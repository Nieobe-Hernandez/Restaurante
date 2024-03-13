import axios from 'axios';

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: 'http://192.168.56.1:8080', // Replace with your API base URL
    timeout: 5000, // Set a timeout value (in milliseconds)
    headers: {
        'Content-Type': 'application/json', // Set the request content type
    },
});


// Export the Axios instance
export default api;
