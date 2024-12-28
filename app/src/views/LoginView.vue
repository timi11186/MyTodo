<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/user'
import {sm2} from 'sm-crypto'
import { log } from 'console'

const router = useRouter()
const isLogin = ref(true) // true为登录，false为注册
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const cipherMode = 1

const handleSubmit = async () => {
  if (!username.value || !password.value) {
    alert('请填写完整信息')
    return
  }

  if (!isLogin.value && password.value !== confirmPassword.value) {
    alert('两次密码不一致')
    return
  }

  // 这里简单使用 localStorage 模拟用户数据存储
  // 实际项目中应该使用后端 API
  if (isLogin.value) {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    if (!users[username.value] || users[username.value] !== password.value) {
      alert('用户名或密码错误')
      return
    }
    localStorage.setItem('currentUser', username.value)
  } else {
    // const users = {}  
    // if (users[username.value]) {
    //   alert('用户名已存在')
    //   return
    // }
    // users[username.value] = password.value
    // 加密密码
    const publicKey = import.meta.env.VITE_PUBLIC_KEY 
    console.log(publicKey);
    let encryptedPassword = sm2.doEncrypt(password.value, publicKey,cipherMode);
    console.log(encryptedPassword);
    


    const res = await register({
      username: username.value,
      password: encryptedPassword
    })
    console.log(res)
 
  }

  router.push('/')
}

const toggleMode = () => {
  isLogin.value = !isLogin.value
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">{{ isLogin ? '登录' : '注册' }}</h1>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="input-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="请输入用户名"
            required
          />
        </div>
        
        <div class="input-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>

        <div v-if="!isLogin" class="input-group">
          <label for="confirmPassword">确认密码</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            required
          />
        </div>

        <button type="submit" class="submit-button">
          {{ isLogin ? '登录' : '注册' }}
        </button>
      </form>

      <div class="toggle-mode">
        <span>{{ isLogin ? '没有账号？' : '已有账号？' }}</span>
        <button class="toggle-button" @click="toggleMode">
          {{ isLogin ? '立即注册' : '去登录' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--background-color);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 12px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
  font-size: 1.8rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  color: var(--text-color);
  font-size: 0.9rem;
}

.input-group input {
  padding: 0.8rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
}

.submit-button {
  padding: 0.8rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.2);
}

.toggle-mode {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-color);
}

.toggle-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0.5rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .login-card {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
</style> 