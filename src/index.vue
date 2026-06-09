<template>
  <div>
    <!-- Dialog 模式 -->
    <el-dialog
      v-if="mode === 'dialog'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="true"
      width="380px"
      title="请完成安全验证"
      @closed="onDialogClosed"
    >
      <captcha-body-view />
    </el-dialog>

    <!-- Inline 模式 -->
    <div v-else class="captcha-container">
      <captcha-body-view />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CashDragCaptcha',

  props: {
    url: { type: String, required: true },
    visible: { type: Boolean, default: false },
    mode: { type: String, default: 'dialog' },
    captchaOnly: { type: Boolean, default: false },
  },

  data() {
    return {
      dialogVisible: false,
      token: '',
      bgImage: '',
      pieceImage: '',
      _bgBlobUrl: null,
      _pieceBlobUrl: null,
      captchaWidth: 320,
      captchaHeight: 160,
      pieceSizeInner: 45,
      targetY: 0,
      targetX: 0,
      sliderLeft: 0,
      sliderPercent: 0,
      isDragging: false,
      status: 'idle',
      trajectory: [],
      finalX: 0,
      startX: 0,
      blockWidth: 40,
      trackWidth: 320,
      _resolveCaptcha: null,
      _rejectCaptcha: null,
    }
  },

  computed: {
    pieceLeftOffset() {
      return (this.blockWidth - this.pieceSizeInner) / 2
    },
    pieceLeft() {
      return this.sliderLeft + this.blockWidth / 2 - this.pieceSizeInner / 2
    },
    minSliderLeft() {
      return Math.max(
        Math.ceil(this.piecePadding + this.pieceSizeInner / 2 - this.blockWidth / 2),
        Math.floor(this.captchaWidth * 0.05)
      )
    },
    piecePadding() {
      return 12
    },
    pieceDisplayWidth() {
      return this.pieceSizeInner + this.piecePadding * 2
    },
    pieceDisplayHeight() {
      return this.pieceSizeInner + this.piecePadding * 2
    },
    pieceAdjustedLeft() {
      const baseLeft = this.isDragging || this.status !== 'idle'
        ? this.sliderLeft
        : this.minSliderLeft
      return baseLeft + this.blockWidth / 2 - this.pieceSizeInner / 2 - this.piecePadding
    },
    pieceAdjustedTop() {
      return this.targetY - this.piecePadding
    },
    pieceBackgroundSize() {
      return this.captchaWidth + 'px ' + this.captchaHeight + 'px'
    },
    pieceBackgroundPosition() {
      return (-this.targetX + this.piecePadding) + 'px ' + (-this.targetY + this.piecePadding) + 'px'
    },
    apiInitUrl() {
      return `${this.url.replace(/\/+$/, '')}/global/dragCaptcha/init`
    },
    apiVerifyUrl() {
      return `${this.url.replace(/\/+$/, '')}/global/dragCaptcha/verify`
    },
  },

  watch: {
    visible(newVal) {
      if (newVal && this.mode === 'dialog') {
        this.dialogVisible = true
        this.fetchCaptcha()
      } else if (!newVal) {
        this.dialogVisible = false
      }
    },
  },

  methods: {
    dataUrlToBlobUrl(dataUri) {
      if (!dataUri) return ''
      if (!dataUri.startsWith('data:')) return dataUri
      try {
        const [meta, base64] = dataUri.split(',')
        const mime = meta.match(/:(.*?);/)[1]
        const bytes = atob(base64.replace(/\s/g, ''))
        const len = bytes.length
        const buf = new Uint8Array(len)
        for (let i = 0; i < len; i++) buf[i] = bytes.charCodeAt(i)
        return URL.createObjectURL(new Blob([buf], { type: mime }))
      } catch (e) {
        console.warn('Blob 转换失败，降级为 data URI', e)
        return dataUri
      }
    },
    revokeImageBlobs() {
      if (this._bgBlobUrl) { URL.revokeObjectURL(this._bgBlobUrl); this._bgBlobUrl = null }
      if (this._pieceBlobUrl) { URL.revokeObjectURL(this._pieceBlobUrl); this._pieceBlobUrl = null }
    },
    async fetchCaptcha() {
      this.status = 'loading'
      try {
        const resp = await axios.get(this.apiInitUrl, { withCredentials: true })
        const c = resp.data && resp.data.returnData ? resp.data.returnData : resp.data
        this.token = c.token
        this.revokeImageBlobs()
        const bgSrc = c.bgImage.startsWith('data:') ? c.bgImage : 'data:' + c.bgImage
        const pieceSrc = c.pieceImage.startsWith('data:') ? c.pieceImage : 'data:' + c.pieceImage
        this._bgBlobUrl = this.dataUrlToBlobUrl(bgSrc)
        this.bgImage = this._bgBlobUrl
        this._pieceBlobUrl = this.dataUrlToBlobUrl(pieceSrc)
        this.pieceImage = this._pieceBlobUrl
        this.captchaWidth = c.width
        this.captchaHeight = c.height
        this.pieceSizeInner = c.pieceSize
        const tokenData = this.decodeToken(c.token)
        if (tokenData) {
          this.targetX = tokenData.x
          this.targetY = tokenData.y
        } else {
          this.targetY = (c.height - c.pieceSize) / 2
        }
        this.resetSlider()
        this.status = 'idle'
        this.$nextTick(() => {
          this.trackWidth = this.captchaWidth
          this.blockWidth = 40
        })
      } catch (e) {
        console.error('[fetchCaptcha] 获取验证码失败', e)
        this.status = 'fail'
        throw e
      }
    },
    onDragStart(e) {
      if (this.status !== 'idle') return
      this.isDragging = true
      this.trajectory = []
      const touch = e.touches ? e.touches[0] : e
      this.startX = touch.clientX
      this._onDragMove = (ev) => this.onDragMove(ev)
      this._onDragEnd = () => this.onDragEnd()
      document.addEventListener('mousemove', this._onDragMove)
      document.addEventListener('mouseup', this._onDragEnd)
      document.addEventListener('touchmove', this._onDragMove, { passive: false })
      document.addEventListener('touchend', this._onDragEnd)
    },
    onDragMove(e) {
      if (!this.isDragging) return
      e.preventDefault()
      const touch = e.touches ? e.touches[0] : e
      const deltaX = touch.clientX - this.startX
      const maxLeft = this.trackWidth - this.blockWidth
      const newLeft = Math.max(0, Math.min(maxLeft, deltaX))
      this.sliderLeft = newLeft
      this.sliderPercent = maxLeft > 0 ? (newLeft / maxLeft) * 100 : 0
      this.trajectory.push([Math.round(this.pieceLeft), Math.round(this.targetY), Date.now()])
    },
    onDragEnd() {
      if (!this.isDragging) return
      this.isDragging = false
      document.removeEventListener('mousemove', this._onDragMove)
      document.removeEventListener('mouseup', this._onDragEnd)
      document.removeEventListener('touchmove', this._onDragMove)
      document.removeEventListener('touchend', this._onDragEnd)
      this.finalX = Math.round(this.pieceLeft)
      this.submitCaptcha()
    },
    async submitCaptcha() {
      if (!this.token || this.trajectory.length < 5) {
        this.status = 'fail'
        return
      }
      this.status = 'loading'

      if (this.captchaOnly) {
        this.status = 'success'
        const result = {
          token: this.token,
          trajectory: JSON.stringify(this.trajectory),
          finalX: this.finalX,
        }
        this.$emit('success', result)
        if (this._resolveCaptcha) {
          this._resolveCaptcha(result)
          this._resolveCaptcha = null
        }
        if (this.mode === 'dialog') {
          setTimeout(() => { this.dialogVisible = false }, 800)
        }
        return
      }

      try {
        const resp = await axios.post(this.apiVerifyUrl, {
          token: this.token,
          trajectory: JSON.stringify(this.trajectory),
          finalX: this.finalX,
        }, { withCredentials: true })
        this.status = 'success'
        this.$emit('success', { token: this.token })
        if (this._resolveCaptcha) {
          this._resolveCaptcha(this.token)
          this._resolveCaptcha = null
        }
        if (this.mode === 'dialog') {
          setTimeout(() => { this.dialogVisible = false }, 800)
        }
      } catch (e) {
        console.error('[submitCaptcha] 验证失败', e)
        this.status = 'fail'
        this.$emit('fail')
        setTimeout(() => this.fetchCaptcha(), 1500)
      }
    },
    decodeToken(token) {
      try {
        const payload = token.split('.')[0]
        try {
          return JSON.parse(payload)
        } catch (e) {
          return JSON.parse(atob(payload))
        }
      } catch (e) {
        console.warn('Token decode failed', e)
        return null
      }
    },
    open() {
      this.dialogVisible = true
      this.fetchCaptcha()
      return new Promise((resolve, reject) => {
        this._resolveCaptcha = resolve
        this._rejectCaptcha = reject
      })
    },
    close() { this.dialogVisible = false },
    refresh() { this.fetchCaptcha() },
    resetSlider() {
      this.sliderLeft = 0
      this.sliderPercent = 0
      this.trajectory = []
      this.finalX = 0
      this.isDragging = false
    },
    onDialogClosed() {
      this.resetSlider()
      this.status = 'idle'
      this.revokeImageBlobs()
      this.bgImage = ''
      this.pieceImage = ''
      this.$emit('close')
      if (this._rejectCaptcha) {
        this._rejectCaptcha('closed')
        this._rejectCaptcha = null
      }
      this._resolveCaptcha = null
    },
  },

  mounted() {
    if (this.mode === 'inline') this.fetchCaptcha()
    if (this.mode === 'dialog' && this.visible) {
      this.dialogVisible = true
      this.fetchCaptcha()
    }
  },
}
</script>

<style scoped>
.captcha-container {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}
.el-dialog {
  -webkit-user-select: none;
  user-select: none;
}
</style>

<style>
.captcha-box {
  position: relative;
  width: 320px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  overflow: visible;
  box-shadow: 0 2px 16px rgba(0,0,0,0.1);
}

.captcha-bg {
  position: relative;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
}

.captcha-icon-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  cursor: pointer;
  z-index: 30;
  color: #666;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.captcha-icon-btn:hover {
  background: #fff;
  color: #333;
  transform: scale(1.1);
}
.refresh-svg-icon {
  animation: none;
}
.captcha-icon-btn:hover .refresh-svg-icon {
  animation: spin 0.6s ease-in-out;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.slider-piece {
  pointer-events: none;
  transition: left 0.05s linear;
}

.slider-track {
  position: relative;
  height: 40px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-top: 8px;
  overflow: hidden;
}

.slider-progress {
  position: absolute;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #7ac70c, #8cd93e);
  transition: width 0.05s linear;
}

.slider-block {
  position: absolute;
  top: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}
.slider-block:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.slider-block.is-dragging {
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  border-color: #409eff;
}
.slider-block.is-success {
  border-color: #67c23a;
  background: linear-gradient(135deg, #67c23a, #85ce61);
}
.slider-block.is-success .slider-btn-icon {
  color: #fff;
}
.slider-block.is-fail {
  border-color: #f56c6c;
  background: linear-gradient(135deg, #f56c6c, #f78989);
}
.slider-block.is-fail .slider-btn-icon {
  color: #fff;
}

.slider-arrow {
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #999;
  font-size: 13px;
  z-index: 1;
  pointer-events: none;
}

.slider-btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner-icon {
  animation: loading-rotate 1s linear infinite;
}
@keyframes loading-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.captcha-result {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.captcha-success {
  background: #f0f9eb;
  color: #67c23a;
}
.captcha-fail {
  background: #fef0f0;
  color: #f56c6c;
}
</style>
