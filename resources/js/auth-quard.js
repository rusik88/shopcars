import Store from './store/index';

export default function(to, from, next) {
    if(Store.getters.authStat) {
        return next();
    }
    else {
        next('/login?loginError=yes'); 
    }
}