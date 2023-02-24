/*
 * @Author: 王云飞
 * @Date: 2023-02-23 16:33:06
 * @LastEditTime: 2023-02-23 16:38:21
 * @LastEditors: 王云飞
 * @Description: 
 * 
 */
/// <reference types="vite/client" />
declare module '*.vue' {
  import {DefineComponent} from 'vue'
  const component:DefineComponent
  export default component
}