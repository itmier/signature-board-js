import type { SignBoardType, PointParams } from './type/ComponentType'
import { isMobileDevice } from './util'
export default class SignBoard {
  private canvasInstance: HTMLCanvasElement | undefined
  private IsDrawing: boolean = false
  private IsExistContent: boolean = false
  private startX: number = 0
  private startY: number = 0
  private canvasContext: CanvasRenderingContext2D | null | undefined
  private lineWidth: number = 5
  private scaleRatio: number = 1
  private pointsMap: PointParams[] = []
  private lineColor: string = '#000000'
  constructor(options: SignBoardType) {
    this.canvasInstance = this.createCanvas(options.selectorID)
    this.handleEventListener()
  }
  private handleEventListener() {
    if (isMobileDevice()) {
      // 加载移动端事件
      this.addMobileEventListener()
    } else {
      // 加载pc端事件
      this.canvasInstance?.addEventListener('mouseenter', this.addEventListener)
      this.canvasInstance?.addEventListener('mouseleave', this.removeEventListener)
    }
  }
  drawEnd(pointParams: PointParams) {
    this.canvasContext?.beginPath()
    this.canvasContext?.moveTo(this.startX, this.startY)
    this.canvasContext?.lineTo(pointParams.x, pointParams.y)
    this.canvasContext!.lineCap = 'round'
    this.canvasContext!.lineJoin = 'round'
    this.canvasContext?.stroke()
    this.canvasContext?.closePath()
    this.pointsMap.push(pointParams)
    this.pointsMap.push({
      x: -1,
      y: -1
    })
  }
  drawMove(pointParams: PointParams) {
    this.canvasContext?.beginPath()
    this.canvasContext?.moveTo(this.startX, this.startY)
    this.canvasContext?.lineTo(pointParams.x, pointParams.y)
    this.canvasContext!.strokeStyle = this.lineColor
    this.canvasContext!.lineWidth = this.lineWidth * this.scaleRatio
    this.canvasContext!.lineCap = 'round'
    this.canvasContext!.lineJoin = 'round'
    this.canvasContext?.stroke()
    this.canvasContext?.closePath()
    this.startX = pointParams.x
    this.startY = pointParams.y
    this.pointsMap.push(pointParams)
  }
  drawStart(pointParams: PointParams) {
    this.startX = pointParams.x
    this.startY = pointParams.y
    this.canvasContext?.beginPath()
    this.canvasContext?.moveTo(this.startX, this.startY)
    this.canvasContext?.lineTo(pointParams.x, pointParams.y)
    this.canvasContext!.lineCap = 'round'
    this.canvasContext!.lineJoin = 'round'
    this.canvasContext!.lineWidth = this.lineWidth * this.scaleRatio
    this.canvasContext?.stroke()
    this.canvasContext?.closePath()
    this.pointsMap.push(pointParams)
  }
  private handleMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    this.IsDrawing = true
    this.IsExistContent = true
    const pointParams = {
      x: e.offsetX,
      y: e.offsetY
    }

    this.drawStart(pointParams)
  }
  private handleMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    if (this.IsDrawing) {
      const pointParams: PointParams = {
        x: e.offsetX,
        y: e.offsetY
      }
      this.drawMove(pointParams)
    }
  }
  private handleMouseUp = (e: MouseEvent) => {
    e.preventDefault()
    if (this.IsDrawing) {
      const pointParams: PointParams = {
        x: e.offsetX,
        y: e.offsetY
      }
      this.drawEnd(pointParams)
      this.IsDrawing = false
    }
  }
  private addEventListener = () => {
    this.IsDrawing = false
    this.canvasInstance?.addEventListener('mousedown', this.handleMouseDown)
    this.canvasInstance?.addEventListener('mousemove', this.handleMouseMove)
    this.canvasInstance?.addEventListener('mouseup', this.handleMouseUp)
  }
  private removeEventListener = () => {
    this.canvasInstance?.removeEventListener('mousedown', this.handleMouseDown)
    this.canvasInstance?.removeEventListener('mousemove', this.handleMouseMove)
    this.canvasInstance?.removeEventListener('mouseup', this.handleMouseUp)
    this.IsDrawing = false
  }
  private addMobileEventListener() {
    this.canvasInstance?.addEventListener('touchstart', this.handleTouchStart)
    this.canvasInstance?.addEventListener('touchmove', this.handleTouchMove)
    this.canvasInstance?.addEventListener('touchend', this.handleTouchEnd)
  }
  private handleTouchStart = (e: TouchEvent) => {
    if (!this.canvasInstance) return
    e.preventDefault()
    this.IsExistContent = true
    if (e.touches.length === 1) {
      const pointParams = {
        x: e.targetTouches[0].clientX - this.canvasInstance.getBoundingClientRect().left,
        y: e.targetTouches[0].clientY - this.canvasInstance.getBoundingClientRect().top
      }
      this.drawStart(pointParams)
    }
  }
  private handleTouchMove = (e: TouchEvent) => {
    if (!this.canvasInstance) return
    e.preventDefault()
    if (e.touches.length === 1) {
      const pointParams = {
        x: e.targetTouches[0].clientX - this.canvasInstance?.getBoundingClientRect().left,
        y: e.targetTouches[0].clientY - this.canvasInstance.getBoundingClientRect().top
      }
      this.drawMove(pointParams)
    }
  }
  private handleTouchEnd = (e: TouchEvent) => {
    if (!this.canvasInstance) return
    e.preventDefault()
    if (e.touches.length === 1) {
      const pointParams = {
        x: e.targetTouches[0].clientX - this.canvasInstance?.getBoundingClientRect().left,
        y: e.targetTouches[0].clientY - this.canvasInstance.getBoundingClientRect().top
      }
      this.drawEnd(pointParams)
    }
  }
  // 画布是否存在内容
  getIsExistContent() {
    return this.IsExistContent
  }
  // 清空签字板
  clearBoard() {
    this.canvasContext?.clearRect(0, 0, this.canvasInstance!.width, this.canvasInstance!.height)
    this.IsExistContent = false
  }
  // 获取签字板base64地址
  getBoardDataURL() {
    const url = this.canvasInstance?.toDataURL('image/png')
    return url
  }
  // 获取签字板的 blob
  getBoardBlob(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        this.canvasInstance?.toBlob((blob) => {
          resolve(blob!)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  private createCanvas(selectorID: string) {
    const parentNode = document.getElementById(selectorID)
    if (!parentNode) {
      throw new Error('未捕获到容器元素!')
      return
    }
    const { offsetHeight, offsetWidth } = parentNode
    const canvas = document.createElement('canvas')
    canvas.width = offsetWidth
    canvas.height = offsetHeight
    canvas.classList.add('canvas-board')
    this.canvasContext = canvas.getContext('2d')
    parentNode?.appendChild(canvas)
    return canvas
  }
  destroyInstance() {
    if (this.canvasInstance) {
      this.canvasInstance.parentNode?.removeChild(this.canvasInstance)
    }
  }
  static getInstance(options: SignBoardType) {
    return new SignBoard(options)
  }
}
