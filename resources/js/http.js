import Axios from 'axios';

import Store from './store/index';
import Router from './router/index'; 

export const HTTP = Axios.create({
    baseURL: 'http://shopcars.os/api/',
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+localStorage.getItem('token_auth')
    }
});

HTTP.interceptors.request.use(config =>  {
        if(localStorage.getItem('token_auth')) {
            config.headers['Authorization'] = "Bearer "+localStorage.getItem('token_auth');
        }  
        return config;
    },
    function(error) {
      return Promise.reject(error);
    } 
);

HTTP.interceptors.response.use(response => response, error => {
    if(error.response.status == 401) {
        if(error.response.data.message !== 'Unauthenticated.'){
            Store.dispatch('clearError'); 
            Store.dispatch('setError', error.response.data.message);
        }
        else if(localStorage.getItem('token_auth')) {
            if(localStorage.getItem('token_auth')) {
                Store.dispatch('clearError'); 
                Store.dispatch('setError', error.response.data.message);
            } 
        }
    }
    else { 
       Store.dispatch('clearError');  
       Store.dispatch('setError', error.response.statusText);
    }

    
    return Promise.reject(error);
});