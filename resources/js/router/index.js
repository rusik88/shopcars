import Vue from 'vue';
import Router from 'vue-router';

import AuthGuard from '../auth-quard';

import Home from '../components/Home';
import Ad from '../components/Ads/Ad';
import AdList from '../components/Ads/AdList';
import AdNew from '../components/Ads/AdNew'; 
import Orders from '../components/User/Orders';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Animate from '../components/Animate/Animate';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            name: 'home',
            component: Home
        },
        {
            path: '/ad/:id',
            name: '', 
            props: true,
            component: Ad
        },
        {
            path: '/list',
            name: 'list',
            component: AdList,
            beforeEnter: AuthGuard
        },
        {
            path: '/animate',
            name: 'animate',
            component: Animate, 
            beforeEnter: AuthGuard
        },
        {
            path: '/new',
            name: 'new',
            component: AdNew,
            beforeEnter: AuthGuard
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
            component: Orders,
            beforeEnter: AuthGuard
        },
    ],
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {

        if(savedPosition) {
          return savedPosition;
        }
    
        if(to.hash) {
          return { selector: to.hash }
        }
        
        return {
          x: 0,
          y: 0 
        } 
      }
});