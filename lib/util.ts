/**
 * @description: 判断是否为移动端设备
 * @return {*}
 */
export const isMobileDevice = () => {
  return 'ontouchstart' in document.documentElement
}
