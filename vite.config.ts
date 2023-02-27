/*
 * @Author: 王云飞
 * @Date: 2023-02-23 16:26:05
 * @LastEditTime: 2023-02-27 15:18:10
 * @LastEditors: 王云飞
 * @Description:
 *
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'SBoard', // 暴露的全局变量
      fileName: 'signature-board-js', // 输出的包文件名
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    }
  }
})
