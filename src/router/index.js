import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

import Home from '@/views/Home';
import WorkbenchView from '@/views/WorkbenchView';
import Dashboard from '@/views/Dashboard';

Vue.use(VueRouter);

const routes = [
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
            next({name: 'Home'});
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
