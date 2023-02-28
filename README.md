## signature-board-js

### 使用说明

1. 安装
   `npm i signature-board-js`
2. 使用

```ts
<script setup lang="ts">
import SBoard from 'signature-board-js'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
const signBoard: Ref<SBoard | undefined> = ref()
onMounted(() => {
  signBoard.value = SBoard.getInstance({
    selectorID: 'example-box'
  })
})
</script>
```

> 具体可参考 `example/App.vue`

3. API
   `static getInstance`: 执行 new 方法, 创建 SignBoard 实例(须在 dom 加载完成之后使用)
   `public getIsExistContent`: 检测签字板上是否存在内容
   `public clearBoard`: 清空签字板
   `public getBoardDataURL`: 将签字板当前内容生成 base64
   `public getBoardBlob`: 将签字板当前内容生成 blob

### TODO

- [x] 适配移动端
- [ ] 签字板生成图片时可设置生成图片等比宽高
- [ ] 撤销功能
- [ ] 画笔颜色可选
- [ ] 画笔宽度可选
- [ ] 移动端添加全屏功能
- [ ] 移动端添加旋转功能
