import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

import Home from '@/views/Home';
import WorkbenchView from '@/views/WorkbenchView';
import Help from '@/views/Help';
import About from '@/views/About';
import Contact from '@/views/Contact';
import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
    {
        name: 'LogIn',
        path: '/login',
        meta: {
            requiresAuth: false,
            title: 'Log in',
        },
        component: Login,
    },
    {
        name: 'SignUp',
        path: '/signup',
        meta: {
            requiresAuth: false,
            title: 'Sign up',
        },
        component: Login,
    },
    {
        name: 'Home',
        path: '/',
        meta: {
            requiresAuth: false,
        },
        component: Home,
    },
    {
        name: 'Dashboard',
        path: '/',
        meta: {
            requiresAuth: true,
        },
        component: Dashboard,
    },
    {
        name: 'Workbench',
        path: '/project/:project_id/workbench',
        meta: {
            requiresAuth: true,
        },
        component: WorkbenchView,
    },
    {
        name: 'Help',
        path: '/help',
        meta: {
            requiresAuth: false,
            title: 'Help',
        },
        component: Help,
    },
    {
        name: 'About',
        path: '/about',
        meta: {
            requiresAuth: false,
            title: 'About',
        },
        component: About,
    },
    {
        name: 'Contact',
        path: '/contact',
        meta: {
            requiresAuth: false,
            title: 'Contact',
        },
        component: Contact,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes,
});

const originalPush = router.push;
router.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            return err;
        }
        return Promise.reject(err);
    });
};

router.beforeEach((to, from, next) => {

    const requires_auth = to.matched.some(record => record.meta.requiresAuth);
    const is_logged_in = store.state.User.loggedIn;

    // Different homepage if logged in
    if (is_logged_in === true) {
        switch (to.name) {
            case 'Home':
            case 'LogIn':
            case 'SignUp':
                next({name: 'Dashboard'});
                break;
        }
    }

    if (requires_auth) {
        if (!is_logged_in) {
            sessionStorage.setItem('redirectPath', to.path);
            next({name: 'LogIn'});
        } else {
            next();
        }
    } else {
        next();
    }
});

const DEFAULT_TITLE = 'CV-S';
router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = (to.meta.title) ? DEFAULT_TITLE + ' | ' + to.meta.title : DEFAULT_TITLE;
    });
});

export default router;
