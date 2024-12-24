<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { type Activity, type Todo } from '@/type/Activit'
const router = useRouter()
const userName = ref('')
const selectedActivity = ref('')

// 每个活动的固定安排
const activitySchedules: Record<string, Todo[]> = {
  '每日打卡活动': [
    {
      id: 1,
      text: '晨间计划制定',
      type:"daily",
      typeData: {
        startTime: '08:00',
        creationTime: new Date(),
        modificationTime: new Date(),
      },
      completed: false,
      from: 1,
      createdAt: new Date(),
    },
    {
      id: 2,
      text: '午间进度检查',
      type:"daily",
      typeData: {
        startTime: '12:00',
        creationTime: new Date(),
        modificationTime: new Date(),
      },
      completed: false,
      from: 1,
      createdAt: new Date(),
    },
    {
      id: 3,
      text: '总结今日完成情况',
      type:"daily",
      typeData: {
        startTime: '18:00',
        creationTime: new Date(),
        modificationTime: new Date(),
      },
      completed: false,
      createdAt: new Date(),
      from: 1,
    }
  ],
  '学习成长计划': [
    {
      id: 4,
      text: '制定今日学习目标',
      type:"daily",
      typeData: {
        startTime: '08:00',
        creationTime: new Date(),
        modificationTime: new Date(),
      },
      completed: false,
      from: 2,
      createdAt: new Date(),
    },
    {
      id: 5,
      text: '复习巩固',
      type:"daily",
      typeData: {
        startTime: '12:00',
        creationTime: new Date(),
        modificationTime: new Date(),
      },
      completed: false,
      from: 2,
      createdAt: new Date(),
    },
    {
      id: 6,
      text: '记录学习心得',
      type:"daily",
      typeData: {
        startTime: '20:00',
        creationTime: new Date(),
        modificationTime: new Date(),
      },
      completed: false,
      from: 2,
      createdAt: new Date(),
    }
  ],
  '健康生活挑战': [
    {
      id: 7,
      text: '晨间运动',
      type:"daily",
      typeData: {
        startTime: '08:00',
        creationTime: new Date(),
        modificationTime: new Date(),
      },
      completed: false,
      from: 3,
      createdAt: new Date(),
    },
    {
      id: 8,
      text: '营养午餐打卡',
      type:"daily",
      typeData: {
        startTime: '12:00',
        creationTime: new Date(),
        modificationTime: new Date(),
      },
      completed: false,
      from: 3,
      createdAt: new Date(),
    },
    {
      id: 9,
      text: '睡前放松活动',
      type:"daily",
      typeData: {
        startTime: '22:00',
        creationTime: new Date(),
        modificationTime: new Date(),
      },
      completed: false,
      from: 3,
      createdAt: new Date(),
    }
  ]
}

const activities: Activity[] = [
  {
    id: 1,
    name: '每日打卡活动',
    description: '坚持每日完成待办事项，培养良好习惯',
    startTime: "2024-12-18 10:00:00",
    duration: '30天'
  },
  {
    id: 2,
    name: '学习成长计划',
    description: '制定学习目标，追踪学习进度',
    startTime: "2024-12-18 10:00:00",
    duration: '60天'
  },
  {
    id: 3,
    name: '健康生活挑战',
    description: '培养健康的生活方式，提高生活质量',
    startTime: "2024-12-18 10:00:00",
    duration: '21天'
  }
]

const todoType = (type:string)=>{
  switch (type) {
    case "daily":
      return "每日任务"
    case "weekly":
      return "每周任务"
    case "monthly":
      return "每月任务"
    case "yearly":
      return "每年任务"
    case "specifiedTime":
      return "指定时间任务"
    default:
      return "未知任务"
  }

}

// 活动详情
const activityDetails = (activity:Activity)=>{
  router.push(`/activity-details/${activity.id}`)
}

// 检查是否已经选择了活动
onMounted(() => {
  const selectedActivity = localStorage.getItem('selectedActivity')
  if (selectedActivity) {
    router.push('/todo')
  }
})

const joinActivity = () => {
  if (!userName.value || !selectedActivity.value) {
    alert('请填写姓名并选择活动')
    return
  }

  // 为每个任务添加创建时间
  const schedulesWithTime = activitySchedules[selectedActivity.value].map(todo => ({
    ...todo,
    createdAt: new Date()
  }))

  localStorage.setItem('userName', userName.value)
  localStorage.setItem('selectedActivity', selectedActivity.value)
  localStorage.setItem('activitySchedule', JSON.stringify(schedulesWithTime))

  router.push('/todo')
}
</script>

<template>
  <div class="page-container">
    <div class="activity-container">
      <div class="welcome-section">
        <h1 class="title">欢迎加入</h1>
        <p class="subtitle">选择一个适合你的活动开始吧！</p>
      </div>

      <div class="form-section">
        <div class="input-group">
          <label for="userName">你的名字</label>
          <input
            id="userName"
            v-model="userName"
            type="text"
            placeholder="请输入你的名字"
            class="name-input"
          />
        </div>

        <div class="activities-grid">
          <div class="activities-title">当前热门活动</div>
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="activity-card"
            :class="{ selected: selectedActivity === activity.name }"
            @click="selectedActivity = activity.name"
          >
            <div class="activity-header">
              <h3>{{ activity.name }}</h3>
              <span class="duration-badge" v-show="selectedActivity != activity.name">{{
                activity.duration
              }}</span>
            </div>
            <p class="description">{{ activity.description }}</p>

            <!-- 活动详细安排 -->
            <div class="schedule-preview" v-if="selectedActivity === activity.name">
              <h4>活动安排</h4>
              <div class="schedule-items">
                <div v-for="index in 3" :key="index" class="schedule-item">
                  <div class="schedule-time">
                    <span class="time-icon">⏰</span>
                    <span>{{
                      activitySchedules[activity.name][index - 1].typeData.startTime
                    }}</span>
                  </div>
                  <div class="schedule-content">
                    <div class="schedule-name type-name">
                      {{ todoType(activitySchedules[activity.name][index - 1].type) }}
                    </div>
                    <div class="schedule-name">
                      {{ activitySchedules[activity.name][index - 1].text }}
                    </div>
                  </div>
                </div>
                <div
                  class="more-tasks"
                  v-if="activitySchedules[activity.name].length > 3"
                >
                  <span
                    >还有 {{ activitySchedules[activity.name].length - 3 }} 个任务</span
                  >
                </div>
              </div>
              <!-- 更多任务 -->
              <div
                class="more-tasks"
                v-if="activitySchedules[activity.name].length > 3"
                @click="activityDetails(activity)"
              >
                <span>还有 {{ activitySchedules[activity.name].length - 3 }} 个任务</span>
              </div>
            </div>

            <div class="selection-indicator" v-show="selectedActivity == activity.name">
              <span class="check-icon">✓</span>
              <span>已选择</span>
            </div>
          </div>
        </div>

        <button
          class="join-button"
          @click="joinActivity"
          :disabled="!userName || !selectedActivity"
        >
          开始活动
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.activity-card {
  padding: 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: var(--background-color);

  &.selected {
    border-color: var(--primary-color);
    background: rgba(var(--primary-color-rgb), 0.05);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .activity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.3rem;
      margin: 0;
      color: var(--text-color);
    }
  }

  .duration-badge {
    font-size: 0.9rem;
    color: var(--primary-color);
    background: rgba(var(--primary-color-rgb), 0.1);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-weight: 500;
  }

  .description {
    font-size: 1rem;
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
}

.schedule-preview {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);

  h4 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .schedule-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .schedule-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: rgba(var(--primary-color-rgb), 0.05);
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(var(--primary-color-rgb), 0.08);
      transform: translateX(4px);
    }
  }

  .schedule-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px;

    .time-icon {
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }

    span {
      color: var(--primary-color);
      font-weight: 500;
    }

    .duration-tag {
      font-size: 0.8rem;
      background: rgba(var(--primary-color-rgb), 0.1);
      padding: 0.2rem 0.5rem;
      border-radius: 12px;
      margin-top: 0.3rem;
    }
  }

  .schedule-content {
    flex: 1;
    .type-name {
      font-size: 0.8rem;
      color: var(--text-color);
      background: linear-gradient(45deg, var(--primary-color), #00c6fb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.8;
    }

    .schedule-name {
      font-weight: 500;
      margin-bottom: 0.3rem;
      color: var(--text-color);
    }

    .schedule-desc {
      font-size: 0.9rem;
      color: var(--text-color);
      opacity: 0.8;
    }
  }
}

.selection-indicator {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 500;

  .check-icon {
    font-size: 1.2rem;
  }
}

.activities-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.activity-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(45deg, var(--primary-color), #00c6fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.8;
}

.form-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.name-input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.name-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
}

.activities-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.join-button {
  width: 100%;
  padding: 0.8rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.join-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.more-tasks {
  text-align: center;
  padding: 0.5rem;
  color: var(--text-color);
  opacity: 0.8;
  font-size: 0.9rem;

  span {
    background: linear-gradient(45deg, var(--primary-color), #00c6fb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .activity-container {
    padding: 1rem 0.5rem;
  }

  .form-section {
    padding: 0 0.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .activity-card {
    padding: 0.8rem;
  }

  .activity-card h3 {
    font-size: 1rem;
  }

  .activity-card p {
    font-size: 0.8rem;
  }

  .schedule-preview {
    margin-top: 0.8rem;
    padding-top: 0.8rem;
  }

  .schedule-item {
    font-size: 0.8rem;
  }

  .duration {
    font-size: 0.8rem;
    padding: 0.1rem 0.4rem;
  }
}
</style>
