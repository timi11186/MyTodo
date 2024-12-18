<script setup lang="ts">
import { ref, onMounted } from 'vue'

const userName = ref(localStorage.getItem('userName') || '')
const selectedActivity = ref(localStorage.getItem('selectedActivity') || '')

const stats = ref({
  totalTasks: 0,
  completedTasks: 0,
  streak: 0
})

// 模拟获取用户统计数据
onMounted(() => {
  stats.value = {
    totalTasks: 24,
    completedTasks: 18,
    streak: 5
  }
})
</script>

<template>
  <div class="page-container">
    <main class="profile-page">
      <div class="profile-header">
        <div class="avatar">{{ userName.charAt(0) }}</div>
        <h1>{{ userName }}</h1>
        <p class="current-activity">当前活动：{{ selectedActivity }}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>总任务数</h3>
          <div class="stat-value">{{ stats.totalTasks }}</div>
        </div>
        <div class="stat-card">
          <h3>已完成</h3>
          <div class="stat-value">{{ stats.completedTasks }}</div>
        </div>
        <div class="stat-card">
          <h3>连续打卡</h3>
          <div class="stat-value">{{ stats.streak }} 天</div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 3rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.current-activity {
  color: var(--primary-color);
  margin-top: 0.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
  opacity: 0.8;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .profile-page {
    padding: 1rem;
  }

  .avatar {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .stats-grid {
    gap: 1rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style> 