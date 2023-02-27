<template>
  <div class="view">
    <div class="example-box" id="example-box"></div>
    <el-button type="primary" class="btn_clear" @click="toClear">清空</el-button>
    <el-button type="primary" class="btn_clear" @click="toDownloadImg">下载</el-button>
  </div>
</template>

<script setup lang="ts">
// import type SignBoard  from '../dist/type/core'
import SignBoard from '../lib/main'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
const signBoard: Ref<SignBoard | undefined> = ref()
onMounted(() => {
  signBoard.value = SignBoard.getInstance({
    selectorID: 'example-box'
  })
})

const toClear = () => {
  signBoard.value?.clearBoard()
}
const toDownloadImg = async () => {
  if (signBoard.value?.getIsExistContent()) {
    // const url = signBoard.value?.getBoardDataURL()
    // console.log(url)
    const blob = await signBoard.value.getBoardBlob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${new Date().getTime()}.png`
    a.click()
  } else {
    console.log('未获取到board内容!')
  }
}
</script>
<style scoped lang="scss">
.view {
  .btn_clear {
    margin-top: 10px;
  }
}
.example-box {
  width: 600px;
  height: 300px;
  background-color: skyblue;
}
</style>
