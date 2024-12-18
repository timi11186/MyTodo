<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentActivityName = ref(localStorage.getItem("selectedActivity") || "");
const currentActivityProgress = ref(localStorage.getItem("currentActivityProgress") || "0");
// 激励词，根据不同的完成度，指定不同的激励词
const motivationWords = computed(() => {
  const words = [
    "坚持就是胜利，加油！",
    "不要放弃，继续努力！",
    "你是最棒的，继续加油！",
    "坚持不懈，成功就在眼前！",
    "不要停止前进，继续努力！",
  ];
  let index = Math.floor(Number(currentActivityProgress.value) / 10);
  if (index >= words.length) {
    index = words.length - 1;
  }
  // 到达百分百时，直接设置一个词
  if (currentActivityProgress.value === "100") {
    return "你已经完成了今天的任务，继续加油！";
  }
  return words[index];
});

const features = [
  {
    title: "活动参与",
    description: "参与各种有趣的打卡活动，培养良好习惯",
    icon: "🎯",
    route: "/activities",
  },
  {
    title: "待办管理",
    description: "轻松管理你的每日待办事项",
    icon: "✅",
    route: "/todo",
  },
  {
    title: "个人中心",
    description: "查看你的活动记录和成就",
    icon: "👤",
    route: "/profile",
  },
];
</script>

<template>
  <div class="page-container">
    <main class="home-page">
      <!-- 当前活动 -->
      <section v-if="currentActivityName" class="current-activity">
        <div class="current-activity-container">
          <h2>当前活动:</h2>
          <h3>{{ currentActivityName }}</h3>
        </div>
        <div class="current-activity-progress">
          今日完成度:{{ currentActivityProgress }}%
          <div class="progress-bar">
            <div class="progress-bar-fill" :style="{ width: `${currentActivityProgress}%` }"></div>
          </div>
          <!-- 激励词 -->
          <div class="current-activity-motivation">
            <p>{{ motivationWords }}</p>
          </div>
        </div>
      </section>

      <!-- 未参加活动时显示 -->
      <section v-else class="hero">
        <h1 class="hero-title">打卡助手</h1>
        <p class="hero-subtitle">让每一天都充满动力和成就感</p>
        <button class="cta-button" @click="router.push('/todo')">开始打卡</button>
      </section>

      <!-- 功能区域 -->
      <section class="features">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature-card"
          @click="router.push(feature.route)"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.current-activity {
  margin-bottom: 3rem;

  &-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h2 {
      font-size: 1.8rem;
      color: var(--text-color);
      margin: 0;
    }

    h3 {
      font-size: 1.8rem;
      color: var(--text-color);
      background: linear-gradient(45deg, var(--primary-color), #00c6fb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.8;
      margin: 0;
    }
  }

  &-progress {
    font-size: 1.2rem;
    color: var(--text-color);
    opacity: 0.8;
    margin-top: 1rem;
    .progress-bar {
      width: 100%;
      height: 10px;
      background-color: #ddd;
      border-radius: 5px;
      .progress-bar-fill {
        height: 100%;
        background-color: var(--primary-color);
        border-radius: 5px;
      }
    }
  }

}

.hero {
  text-align: center;
  padding: 4rem 0;

  &-title {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary-color), #00c6fb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }

  &-subtitle {
    font-size: 1.2rem;
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 2rem;
  }
}

.cta-button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.2);
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.feature-card {
  padding: 2rem;
  border-radius: 12px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  p {
    color: var(--text-color);
    opacity: 0.8;
    line-height: 1.6;
  }
}
</style>
