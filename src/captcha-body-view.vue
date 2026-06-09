<template>
  <div class="captcha-box" style="position: relative;">
    <!-- 背景图区域 -->
    <div
      class="captcha-bg"
      :style="{ width: $dragCaptcha.captchaWidth + 'px', height: $dragCaptcha.captchaHeight + 'px' }"
    >
      <img :src="$dragCaptcha.bgImage" alt="验证码背景" style="width: 100%; height: 100%; display: block;">

      <!-- 刷新按钮 -->
      <span
        class="captcha-icon-btn captcha-refresh-btn"
        title="刷新"
        @click="$dragCaptcha.refresh"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="refresh-svg-icon"
        >
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      </span>
    </div>

    <!-- 拼图块 -->
    <div
      v-if="$dragCaptcha.pieceImage"
      class="slider-piece"
      :class="{ 'piece-dragging': $dragCaptcha.isDragging }"
      :style="{
        position: 'absolute',
        width: $dragCaptcha.pieceDisplayWidth + 'px',
        height: $dragCaptcha.pieceDisplayHeight + 'px',
        left: $dragCaptcha.pieceAdjustedLeft + 'px',
        top: $dragCaptcha.pieceAdjustedTop + 'px',
        backgroundImage: 'url(' + $dragCaptcha.pieceImage + ')',
        backgroundSize: $dragCaptcha.pieceBackgroundSize,
        backgroundPosition: $dragCaptcha.pieceBackgroundPosition,
        backgroundRepeat: 'no-repeat',
        zIndex: 20,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        transition: 'left 0.05s linear'
      }"
    ></div>

    <!-- 滑块轨道 -->
    <div class="slider-track" :style="{ width: $dragCaptcha.captchaWidth + 'px' }">
      <!-- 滑块进度条 -->
      <div
        class="slider-progress"
        :style="{ left: '0px', width: $dragCaptcha.sliderPercent + '%' }"
      ></div>

      <!-- 滑块按钮 -->
      <div
        class="slider-block puzzle-shape"
        :class="{
          'is-dragging': $dragCaptcha.isDragging,
          'is-success': $dragCaptcha.status === 'success',
          'is-fail': $dragCaptcha.status === 'fail'
        }"
        :style="{ left: $dragCaptcha.sliderLeft + 'px' }"
        @mousedown.prevent="$dragCaptcha.onDragStart($event)"
        @touchstart.prevent="$dragCaptcha.onDragStart($event)"
      >
        <!-- 空闲状态图标 -->
        <span v-if="$dragCaptcha.status === 'idle' && !$dragCaptcha.isDragging" class="slider-arrow">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>

        <!-- 加载状态图标 -->
        <span v-if="$dragCaptcha.status === 'loading'" class="slider-btn-icon">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="loading-spinner-icon"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </span>

        <!-- 成功状态图标 -->
        <span v-if="$dragCaptcha.status === 'success'" class="slider-btn-icon success-check">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>

        <!-- 失败状态图标 -->
        <span v-if="$dragCaptcha.status === 'fail'" class="slider-btn-icon fail-cross">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      </div>

      <!-- 提示文字 - 空闲状态 -->
      <span v-if="$dragCaptcha.status === 'idle' && !$dragCaptcha.isDragging" class="slider-text">
        向右拖动滑块填充拼图
      </span>

      <!-- 提示文字 - 加载状态 -->
      <span v-if="$dragCaptcha.status === 'loading'" class="slider-text">验证中...</span>
    </div>

    <!-- 验证结果 - 成功 -->
    <div
      v-if="$dragCaptcha.status === 'success'"
      class="captcha-result captcha-success"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="vertical-align: middle; margin-right: 4px;"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      验证通过
    </div>

    <!-- 验证结果 - 失败 -->
    <div
      v-if="$dragCaptcha.status === 'fail'"
      class="captcha-result captcha-fail"
      @click="$dragCaptcha.refresh"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="vertical-align: middle; margin-right: 4px;"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      验证失败，点击重试
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaptchaBodyView',
  inject: ['$dragCaptcha']
}
</script>
