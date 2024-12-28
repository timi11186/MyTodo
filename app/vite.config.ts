import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

/**
 * @param {object} config
 * @param {string} config.command - 命令模式 (dev/serve 或 build)
 * @param {string} config.mode - 环境模式 (development/production)
 * @param {boolean} config.isSsrBuild - 是否是 SSR 构建
 */
export default defineConfig(({ command, mode, isSsrBuild }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    
    // 定义全局常量
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __API_URL__: JSON.stringify(env.API_URL),
      __DEBUG__: env.DEBUG,
      __VERSION__: JSON.stringify(env.APP_VERSION)
    },
    
    // 路径别名配置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    
    // 开发服务器配置
    server: {
      port: Number(env.APP_URL?.split(':')[2]) || 3456, // 从 API_URL 中获取端口号
      host: '0.0.0.0',
      open: true,
      https: false,
      cors: true, // 建议开发环境开启 CORS
      proxy: {
        // 代理配置
        '/api': {
          target: env.APP_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },

    // 构建选项
    build: {
      outDir: 'dist',
      sourcemap: env.DEBUG === 'true', // 是否生成 sourcemap
      // 生产环境优化配置
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['vue', 'vue-router', 'pinia']
          }
        }
      }
    },

    optimizeDeps: {
      include: ['sm-crypto']
    }
  }
}) 
