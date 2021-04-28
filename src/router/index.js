import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/feed/list', name: 'feed-list', component: () => import('../views/feed/list.vue'), },
  { path: '/feed/info', name: 'feed-info', component: () => import('../views/feed/info.vue'), },
  { path: '/feed/new', name: 'feed-new', component: () => import('../views/feed/new.vue'), },
  { path: '/feed/edit', name: 'feed-edit', component: () => import('../components/FeedNew/NewFeedInputForm.vue'), },
  { path: '/feed/tag', name: 'feed-tag', component: () => import('../views/feed/tag.vue'), },
  { path: '/feed/diagram', name: 'feed-diagram', component: () => import('../views/feed/diagram.vue'), },
  {
    path: '/task',
    name: 'Task',
    component: () => import('../views/Task.vue'),
  },
  { path: '/task/list', name: "task-list", component: () => import('../views/task/list.vue') },
  { path: '/task/new', name: "task-new", component: () => import('../views/task/new.vue') },
  { path: '/task/edit', name: 'task-edit', component: () => import('../views/task/new.vue'), },
  { path: '/task/scenario', name: "task-scenario", component: () => import('../views/task/scenario.vue') },
  { path: '/task/diagram', name: "task-diagram", component: () => import('../views/task/diagram.vue') },
  { path: '/topic/list', name: 'topic-list', component: () => import('../views/topic/list.vue'), },
  { path: '/topic/info', name: 'topic-info', component: () => import('../views/topic/info.vue'), },
  { path: '/event', name: "event", component: () => import('../views/Events.vue') },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

if (process.env.NODE_ENV !== 'production') {
  routes.push(
    { path: '/test', name: "test", component: () => import('../views/TestPage.vue') }
  );
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
