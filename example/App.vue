<!--
 * @Author: 王云飞
 * @Date: 2023-02-23 16:31:46
 * @LastEditTime: 2023-02-23 16:47:42
 * @LastEditors: 王云飞
 * @Description: 
 * 
-->
<template>
  <div class="view">
    <h2>view</h2>
    <h2>{{ a }}</h2>
  </div>
</template>

<script setup lang="ts">
import { a } from '../lib/main'
console.log(a)
</script>
