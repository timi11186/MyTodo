<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import SettingsModal from './components/SettingsModal.vue'

const isDarkMode = ref(false)
const router = useRouter()
const currentTime = ref(new Date().toLocaleString())
const showSettings = ref(false)

// 更新时间的函数
const updateTime = () => {
  currentTime.value = new Date().toLocaleString()
}

// 创建定时器
let timer: number

onMounted(() => {
  // 每秒更新一次时间
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  // 清除定时器
  if (timer) {
    clearInterval(timer)
  }
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  router.push('/login')
}

// 点击其他地方关闭设置菜单
const closeSettings = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.classList.contains('settings-modal')) {
    showSettings.value = false
  }
}
</script>

<template>
  <div class="app-container" :class="{ 'dark-mode': isDarkMode }">
    <header class="app-header" v-if="$route.meta.requiresAuth">
      <nav class="nav-bar">
        <div class="nav-left">
          <div class="nav-logo" v-if="$route.path == '/'">打卡助手</div>
          <router-link to="/" class="nav-logo" v-else>首页</router-link>
        </div>
        <div class="nav-middle">
          <div class="time">{{ currentTime }}</div>
        </div>
        <div class="nav-right">
          <button 
            class="settings-button"
            @click="showSettings = true"
          >
            ⚙️
          </button>
        </div>
      </nav>
    </header>

    <SettingsModal
      v-model:show="showSettings"
      :isDarkMode="isDarkMode"
      @toggle-theme="toggleDarkMode"
      @logout="handleLogout"
    />
    
    <RouterView />
  </div>
</template>

<style>
:root {
  --primary-color: #007AFF;
  --primary-color-rgb: 0, 122, 255;
  --background-color: #ffffff;
  --background-color-rgb: 255, 255, 255;
  --text-color: #333333;
  --border-color: #e0e0e0;
  --hover-color: #f5f5f5;
  --nav-height: 64px;
}

.dark-mode {
  --primary-color: #0A84FF;
  --primary-color-rgb: 10, 132, 255;
  --background-color: #1c1c1e;
  --background-color-rgb: 28, 28, 30;
  --text-color: #ffffff;
  --border-color: #2c2c2e;
  --hover-color: #2c2c2e;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  min-height: 100vh;
  position: relative;
}

.app-container {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(var(--background-color-rgb), 0.8);
}

.nav-bar {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.nav-middle {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-left, .nav-middle, .nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-item {
  padding: 0.5rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: var(--hover-color);
}

.router-link-active {
  color: var(--primary-color);
  font-weight: 500;
}

.theme-toggle {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background: var(--hover-color);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.toggle-icon {
  font-size: 1.2rem;
}

/* 为了避免导航栏遮挡内容 */
main {
  padding-top: calc(var(--nav-height) + 20px);
  padding-bottom: 20px;
}

@media (max-width: 768px) {
  
  .nav-right {
    gap: 0.5rem;
  }
  
  .nav-item {
    padding: 0.5rem;
  }
  
  .nav-bar {
    padding: 0 0.5rem;
  }
  
  /* 确保所有容器在移动端都不会产生水平滚动 */
  .home-page,
  .profile-page,
  .activity-container {
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }
}

.page-container {
  padding-top: var(--nav-height);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background-color: var(--background-color);
  transition: background-color 0.3s ease;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

/* 确保背景色应用到整个页面 */
.page-container {
  padding-top: var(--nav-height);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background-color: var(--background-color);
  transition: background-color 0.3s ease;
}

/* 添加平滑过渡效果 */
* {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              color 0.3s ease;
}

.logout-button {
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background: var(--hover-color);
}

.time {
  font-size: 1rem;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  background: var(--hover-color);
  border-radius: 6px;
  min-width: 200px;
  text-align: center;
}

@media (max-width: 768px) {
  .time {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    min-width: 150px;
  }
}

.settings-container {
  position: relative;
}

.settings-button {
  padding: 8px;
  border-radius: 50%;
  background: var(--hover-color);
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.settings-button:hover {
  transform: rotate(30deg);
}

.settings-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.settings-modal-content {
  background: var(--background-color);
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.3s ease;
  border: 1px solid var(--border-color);
}

.settings-modal-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
}

.settings-modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-color);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: var(--hover-color);
}

.settings-modal-body {
  padding: 1rem;
}

.settings-item {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: var(--text-color);
}

.settings-item:hover {
  background: var(--hover-color);
}

.settings-item-left {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.settings-item-right {
  color: var(--primary-color);
  font-weight: 500;
}

.settings-icon {
  font-size: 1.2rem;
}

.settings-item.danger {
  color: #ff3b30 !important;
}

.settings-item.danger:hover {
  background: rgba(255, 59, 48, 0.1);
}

.settings-divider {
  height: 1px;
  background: var(--border-color);
  margin: 0.5rem 0;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .settings-modal-content {
    width: 100%;
    max-width: none;
    margin: 1rem;
    border-radius: 16px;
  }

  .settings-item {
    padding: 1rem;
  }

  .close-button {
    width: 40px;
    height: 40px;
  }
}
</style> 