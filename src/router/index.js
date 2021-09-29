import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import WorkingView from '@/views/WorkingView'
import Help from '@/views/Help'
import About from '@/views/About'
import Contact from '@/views/Contact'
import ProjectView from "@/views/ProjectView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/projects',
        name: 'ProjectView',
        component: ProjectView,
    },
    {
        path: '/working-view',
        name: 'WorkingView',
        component: WorkingView,
    },
    {
        path: '/help',
        name: 'Help',
        component: Help,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes,
})

export default router
