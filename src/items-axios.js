import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://shoppingcart-6df6b.firebaseio.com/'
});

export default instance;