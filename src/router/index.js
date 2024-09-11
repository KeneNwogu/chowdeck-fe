import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import OrderView from '../views/OrderView.vue'
import RestaurantMenuView from '../views/RestaurantMenuView.vue'
import CartCheckoutView from '@/views/CartCheckoutView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderView
  },
  {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: RestaurantMenuView
  },
  {
    path: '/restaurants/:id/checkout',
    name: 'checkout',
    component: CartCheckoutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
