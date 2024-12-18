<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  show: boolean
  isDarkMode: boolean
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  'toggle-theme': []
  'logout': []
}>()

const closeModal = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.classList.contains('settings-modal')) {
    emit('update:show', false)
  }
}
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="settings-modal" @click="closeModal">
      <div class="settings-modal-content">
        <div class="settings-modal-header">
          <h3>设置</h3>
          <button class="close-button" @click="$emit('update:show', false)">×</button>
        </div>
        <div class="settings-modal-body">
          <!-- 主题设置 -->
          <div class="settings-item" @click="$emit('toggle-theme')">
            <div class="settings-item-left">
              <div class="settings-icon-wrapper">
                <span class="settings-icon">{{ isDarkMode ? '🌙' : '☀️' }}</span>
              </div>
              <div class="settings-item-content">
                <span class="settings-item-title">主题设置</span>
                <span class="settings-item-desc">切换深色/浅色模式</span>
              </div>
            </div>
            <div class="settings-item-right">
              <span class="theme-status">{{ isDarkMode ? '深色' : '浅色' }}</span>
              <span class="arrow-icon">›</span>
            </div>
          </div>
          
          <div class="settings-divider"></div>
          
          <!-- 退出登录 -->
          <div class="settings-item danger" @click="$emit('logout')">
            <div class="settings-item-left">
              <div class="settings-icon-wrapper danger">
                <span class="settings-icon">🚪</span>
              </div>
              <div class="settings-item-content">
                <span class="settings-item-title">退出登录</span>
                <span class="settings-item-desc">退出当前账号</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
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
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.3s ease;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.settings-modal-header {
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  background: rgba(var(--background-color-rgb), 0.8);
  backdrop-filter: blur(10px);
}

.settings-modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.8rem;
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
  opacity: 0.6;
}

.close-button:hover {
  opacity: 1;
  background: var(--hover-color);
  transform: rotate(90deg);
}

.settings-modal-body {
  padding: 0.5rem;
}

.settings-item {
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  color: var(--text-color);
  margin: 0.3rem 0;
}

.settings-item:hover {
  background: var(--hover-color);
}

.settings-item-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.settings-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--primary-color-rgb), 0.1);
  transition: all 0.3s ease;
}

.settings-icon-wrapper.danger {
  background: rgba(255, 59, 48, 0.1);
}

.settings-icon {
  font-size: 1.2rem;
}

.settings-item-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.settings-item-title {
  font-weight: 500;
}

.settings-item-desc {
  font-size: 0.85rem;
  opacity: 0.6;
}

.settings-item-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-status {
  font-size: 0.9rem;
  color: var(--primary-color);
}

.arrow-icon {
  font-size: 1.2rem;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.settings-item:hover .arrow-icon {
  opacity: 0.6;
  transform: translateX(2px);
}

.settings-item.danger {
  color: #ff3b30;
}

.settings-item.danger:hover {
  background: rgba(255, 59, 48, 0.1);
}

.settings-divider {
  height: 1px;
  background: var(--border-color);
  margin: 0.5rem;
  opacity: 0.5;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from .settings-modal-content {
  transform: scale(0.95) translateY(20px);
}

.fade-leave-to .settings-modal-content {
  transform: scale(0.95) translateY(20px);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (max-width: 768px) {
  .settings-modal-content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: none;
    margin: 0;
    border-radius: 20px 20px 0 0;
    animation: slideUp 0.3s ease;
  }

  .settings-modal-header {
    padding: 1rem;
  }

  .settings-item {
    padding: 1rem;
  }

  .close-button {
    width: 40px;
    height: 40px;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
}
</style> 