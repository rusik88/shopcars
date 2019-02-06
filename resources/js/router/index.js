import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home';
import Add from '../components/Adds/Add';
import AddList from '../components/Adds/AddList';
import NewAdd from '../components/Adds/NewAdd';
import Orders from '../components/User/Orders';
import Login from '../components/Auth//Login';
import Register from '../components/Auth//Register';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            name: 'home',
            component: Home
        },
        {
            path: '/add/:id',
            name: '',
            props: true,
            component: Add
        },
        {
            path: '/list',
            name: 'list',
            component: AddList
        },
        {
            path: '/new',
            name: 'new',
            component: NewAdd
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders
        },
    ],
    mode: 'history' 
});