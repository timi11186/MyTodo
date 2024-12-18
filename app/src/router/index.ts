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
  const currentUser = localStorage.getItem('currentUser')
  const selectedActivity = localStorage.getItem('selectedActivity')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!currentUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 如果用户已选择活动，直接跳转到待办页面
      if (selectedActivity && to.path === '/activities') {
        next('/todo')
      } else if (!selectedActivity && to.path !== '/activities') {
        // 如果用户未选择活动，除了活动选择页面外的其他页面都重定向到活动选择页面
        next('/activities')
      } else {
        next()
      }
    }
  } else {
    if (currentUser && to.path === '/login') {
      // 如果已登录用户访问登录页，重定向到合适的页面
      if (selectedActivity) {
        next('/todo')
      } else {
        next('/activities')
      }
    } else {
      next()
    }
  }
})

export default router 