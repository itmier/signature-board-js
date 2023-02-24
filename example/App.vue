<!--
 * @Author: 王云飞
 * @Date: 2023-02-23 16:31:46
 * @LastEditTime: 2023-02-24 16:34:37
 * @LastEditors: 王云飞
 * @Description: 
 * 
-->
<template>
  <div class="view">
    <div class="example-box" id="example-box"></div>
  </div>
</template>

<script setup lang="ts">
import SignBoard from '../lib/main'
import { onMounted } from 'vue'
const a: number = 20
console.log(a)

onMounted(() => {
  SignBoard.getInstance({
    selectorID: 'example-box'
  })
})
</script>
<style scoped lang="scss">
.example-box {
  width: 600px;
  height: 300px;
  background-color: skyblue;
}
</style>
