import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomePage from '../views/HomePage.vue'
import ActivitySelect from '../views/ActivitySelect.vue'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/activities',
      name: 'activities',
      component: ActivitySelect,
      meta: { requiresAuth: true }
    },
    {
      path: '/todo',
      name: 'todo',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 如果用户未登录，重定向到登录页
  if (!localStorage.getItem('currentUser') && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router 