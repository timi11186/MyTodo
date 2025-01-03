<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Todo, type TodoType } from '@/type/Activit'

const todos = ref<Todo[]>([])
const newTodoText = ref('')
const newTodoDesc = ref('')
const newTodoType = ref({
  type: 'daily',
  startTime: '08:00',
  endTime: '10:00',
  week: 1,
  month: 1,
  year: 2024,
})
const filter = ref<'all' | 'active' | 'completed'>('all')
const activityName = ref(localStorage.getItem('selectedActivity') ?? '')// 当前活动名称
const activitySchedule = ref<any[]>(JSON.parse(localStorage.getItem('activitySchedule') ?? '[]'))// 当前活动
console.log(activitySchedule.value);



// 添加用户信息
const userName = ref(localStorage.getItem('userName') ?? '')

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed)
    case 'completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})

const completionRate = computed(() => {
  if (todos.value.length === 0) return 0
  const completedCount = todos.value.filter(todo => todo.completed).length
  return Math.round((completedCount / todos.value.length) * 100)
})

const addTodo = () => {
  if (!newTodoText.value.trim()) return
  let todo: Todo = {
    id: Date.now(),
    text: newTodoText.value.trim(),
    desc: newTodoDesc.value.trim(),
    completed: false,
    createdAt: new Date(),
    type: newTodoType.value.type as 'daily' | 'weekly' | 'monthly' | 'yearly',
    typeData: newTodoType.value as TodoType,
  }

  todos.value.push(todo)

  newTodoText.value = ''
  newTodoType.value = {
    type: 'daily',
    startTime: '08:00',
    endTime: '10:00',
    week: 1,
    month: 1,
    year: 2024,
  }
}

const toggleTodo = (todo: Todo) => {
  todo.completed = !todo.completed
}

const deleteTodo = (todoId: number) => {
  todos.value = todos.value.filter(todo => todo.id !== todoId)
}
</script>

<template>
  <div class="page-container">
    <div class="todo-container">
      <div class="user-info">
        <h2>{{ userName }}的待办事项</h2>
        <p class="activity-name">{{ activityName }}</p>
      </div>

      <h1 class="title">待办事项</h1>

      <div class="progress-bar">
        <div class="progress" :style="{ width: `${completionRate}%` }"></div>
        <span class="progress-text">完成度: {{ completionRate }}%</span>
      </div>

      <div class="input-container">
        <input
          v-model="newTodoText"
          @keyup.enter="addTodo"
          placeholder="添加新的待办事项标题..."
          class="todo-input"
        />
        <textarea
          v-model="newTodoDesc"
          placeholder="待办事项描述..."
          class="todo-input textarea"
        ></textarea>
        <!-- 选择类型 -->
        <div class="todo-input-type">
          <span>选择类型</span>
          <select v-model="newTodoType.type" class="todo-input-type-select">
            <option value="daily">每日</option>
            <option value="weekly">每周</option>
            <option value="monthly">每月</option>
          </select>
          <!-- 根据不同的类型，显示不同的输入框 -->
          <div v-if="newTodoType.type === 'daily'">
            <span>选择时间</span>
            <!-- 选择开始时间  -->
            <input v-model="newTodoType.startTime" type="time" class="todo-input-time" />
            <!-- 选择结束时间 -->
            <input v-model="newTodoType.endTime" type="time" class="todo-input-time" />
          </div>
          <div v-if="newTodoType.type === 'weekly'">
            <span>选择周几 1-7</span>
            <select v-model="newTodoType.week" class="todo-input-type-select">
              <option value="1">周一</option>
              <option value="2">周二</option>
              <option value="3">周三</option>
              <option value="4">周四</option>
              <option value="5">周五</option>
              <option value="6">周六</option>
              <option value="7">周日</option>
            </select>
          </div>
          <div v-if="newTodoType.type === 'monthly'">
            <span>选择日期</span>
            <select v-model="newTodoType.month" class="todo-input-type-select">
              <option v-for="i in 31" :value="i">{{ i }}</option>
            </select>
          </div>
        </div>

        <button @click="addTodo" class="add-button">添加</button>
      </div>

      <div class="filters">
        <button
          v-for="option in ['all', 'active', 'completed']"
          :key="option"
          @click="filter = option"
          :class="{ active: filter === option }"
          class="filter-button"
        >
          {{ option === "all" ? "全部" : option === "active" ? "进行中" : "已完成" }}
        </button>
      </div>

      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo)"
            class="todo-checkbox"
          />
          <span class="todo-text">{{ todo.text }}</span>
          <button @click="deleteTodo(todo.id)" class="delete-button">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  background-color: var(--background-color);
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, var(--primary-color), #00c6fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.progress-bar {
  height: 6px;
  background-color: var(--border-color);
  border-radius: 3px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(45deg, var(--primary-color), #00c6fb);
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 0.9rem;
  color: var(--text-color);
}

.input-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  span {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
  .todo-input-time {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    background: var(--background-color);
    color: var(--text-color);
    box-sizing: border-box;
  }
  .todo-input-week {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    background: var(--background-color);
    color: var(--text-color);
    box-sizing: border-box;
  }
  .todo-input-type {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-direction: column;
    .todo-input-type-select {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      font-size: 1rem;
      background: var(--background-color);
      color: var(--text-color);
    }
  }
}

.todo-input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  box-sizing: border-box;
  resize: none;
  .textarea {
    width: 100%;
    min-height: 10vh;
    border: none;
    outline: none;
    background: transparent;
  }
}

.todo-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
}

.add-button {
  padding: 0 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.2);
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: var(--hover-color);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button.active {
  background: var(--primary-color);
  color: white;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.todo-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-checkbox {
  margin-right: 1rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
}

.completed .todo-text {
  text-decoration: line-through;
  color: var(--text-color);
}

.delete-button {
  padding: 0.5rem 1rem;
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
}

.todo-item:hover .delete-button {
  opacity: 1;
}

@media (max-width: 768px) {
  .todo-container {
    padding: 0.8rem;
  }

  .user-info h2 {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
    color: var(--text-color);
  }

  .activity-name {
    font-size: 0.9rem;
  }

  .title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .input-container {
    flex-direction: column;
    gap: 0.8rem;
  }

  .todo-input {
    padding: 0.8rem;
    font-size: 0.9rem;
  }

  .add-button {
    width: 100%;
    padding: 0.8rem;
  }

  .filters {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-button {
    flex: 1;
    padding: 0.5rem;
    font-size: 0.9rem;
    min-width: 80px;
  }

  .todo-item {
    padding: 0.8rem;
    margin-bottom: 0.8rem;
  }

  .todo-text {
    font-size: 0.9rem;
    color: var(--text-color);
  }

  .delete-button {
    opacity: 1;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .todo-checkbox {
    width: 18px;
    height: 18px;
  }
}

/* 添加小屏幕样式 */
@media (max-width: 480px) {
  .todo-container {
    padding: 0.8rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .progress-text {
    font-size: 0.8rem;
  }

  .filters {
    margin-bottom: 1.5rem;
  }

  .filter-button {
    font-size: 0.8rem;
    padding: 0.4rem;
  }
}

.user-info {
  text-align: center;
  margin-bottom: 2rem;
}

.activity-name {
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}
</style>
