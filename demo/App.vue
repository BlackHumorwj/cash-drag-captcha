<template>
  <div class="demo-container">
    <!-- 标题 -->
    <div class="demo-header">
      <h1>🧩 CashDragCaptcha 演示</h1>
      <p>滑动拼图验证码 Vue 2 组件 · dialog / inline 双模式</p>
    </div>

    <!-- 配置区 -->
    <div class="demo-section">
      <h2>配置</h2>

      <div class="tip-box">
        ⚠️ 需要后端 API 服务支持。请将下方 URL 替换为您的验证码服务地址。
        <br>接口路径：<code>{{ apiBase }}/global/dragCaptcha/init</code>（GET）和
        <code>{{ apiBase }}/global/dragCaptcha/verify</code>（POST）
      </div>

      <div class="form-row">
        <label>API 地址</label>
        <el-input
          v-model="apiBase"
          placeholder="例如: https://api.example.com"
          size="small"
          clearable
        />
        <el-button type="primary" size="small" @click="applyUrl">应用</el-button>
      </div>

      <div class="form-row">
        <label>captchaOnly</label>
        <el-switch v-model="captchaOnly" />
        <span style="font-size:12px;color:#999;">仅前端验证（不走服务端校验）</span>
      </div>
    </div>

    <!-- 模式切换 + 组件展示 -->
    <div class="demo-section">
      <h2>
        模式切换
        <small>当前：{{ currentMode === 'dialog' ? '弹窗模式 (dialog)' : '内联模式 (inline)' }}</small>
      </h2>

      <div class="mode-switch">
        <div
          class="mode-btn"
          :class="{ active: currentMode === 'dialog' }"
          @click="switchMode('dialog')"
        >
          📋 Dialog 模式
        </div>
        <div
          class="mode-btn"
          :class="{ active: currentMode === 'inline' }"
          @click="switchMode('inline')"
        >
          📄 Inline 模式
        </div>
      </div>

      <!-- Dialog 模式操作按钮 -->
      <template v-if="currentMode === 'dialog'">
        <div class="method-buttons">
          <el-button type="primary" @click="openDialog">打开验证码弹窗</el-button>
          <el-button @click="closeDialog">关闭弹窗</el-button>
          <el-button @click="refreshCaptcha">刷新验证码</el-button>
        </div>
        <p style="margin-top:8px;font-size:12px;color:#999;">
          点击「打开验证码弹窗」会触发 open() 方法，验证通过后返回 Promise
        </p>
      </template>

      <!-- Inline 模式内联展示 -->
      <div v-if="currentMode === 'inline'" class="demo-inline-area">
        <cash-drag-captcha
          ref="captcha"
          :url="apiBase"
          mode="inline"
          :captcha-only="captchaOnly"
          @success="onSuccess"
          @fail="onFail"
          @close="onClose"
        />
      </div>

      <!-- Dialog 模式组件（隐藏渲染，通过 ref.open() 调用） -->
      <cash-drag-captcha
        v-if="currentMode === 'dialog'"
        ref="captcha"
        :url="apiBase"
        mode="dialog"
        :captcha-only="captchaOnly"
        @success="onSuccess"
        @fail="onFail"
        @close="onClose"
      />

      <!-- 状态栏 -->
      <div class="status-bar" v-if="componentStatus">
        <span class="label">组件状态：</span>
        <span class="value" :class="componentStatus">{{ statusText }}</span>
      </div>

      <!-- 事件日志 -->
      <div class="event-log" v-if="logs.length">
        <div class="log-entry" v-for="(log, i) in logs" :key="i">
          <span class="tag" :class="'tag-' + log.type">{{ log.type }}</span>
          <span>{{ log.msg }}</span>
          <span style="float:right;color:#ccc;font-size:11px;">{{ log.time }}</span>
        </div>
      </div>
    </div>

    <!-- 参数文档 -->
    <div class="demo-section">
      <h2>Props 说明</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#f8f9fa;">
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #eee;">Prop</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #eee;">类型</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #eee;">默认值</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #eee;">说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in propDocs" :key="row.name">
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-weight:600;color:#409eff;">
              {{ row.name }}
            </td>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#888;">{{ row.type }}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">{{ row.default }}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">{{ row.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CashDragCaptcha from '@blackhumorwj/cash-drag-captcha'

export default {
  name: 'App',

  components: { CashDragCaptcha },

  data() {
    return {
      apiBase: 'https://api.example.com',
      captchaOnly: false,
      currentMode: 'dialog',
      logs: [],
      componentStatus: '',
    }
  },

  computed: {
    statusText() {
      const map = { idle: '🟢 空闲', loading: '🔄 验证中...', success: '✅ 验证通过', fail: '❌ 验证失败' }
      return map[this.componentStatus] || this.componentStatus
    },
    propDocs() {
      return [
        { name: 'url', type: 'String', default: '— (必填)', desc: 'API 基础地址，内部拼接 /global/dragCaptcha/init 和 /global/dragCaptcha/verify' },
        { name: 'mode', type: 'String', default: 'dialog', desc: '显示模式: dialog (弹窗) / inline (内联)' },
        { name: 'captchaOnly', type: 'Boolean', default: 'false', desc: '仅获取验证码数据，不走服务端校验' },
        { name: 'visible', type: 'Boolean', default: 'false', desc: '对话框可见性（dialog 模式）' },
      ]
    },
  },

  methods: {
    applyUrl() {
      this.$message({ message: 'URL 已应用', type: 'success', duration: 1500 })
    },

    switchMode(mode) {
      this.currentMode = mode
      this.logs = []
      this.componentStatus = ''
    },

    openDialog() {
      this.$nextTick(() => {
        const captcha = this.$refs.captcha
        if (captcha && captcha.open) {
          this.addLog('info', '调用 open() 打开弹窗...')
          captcha.open()
            .then(token => {
              this.addLog('success', 'open() Promise resolved, token: ' + (typeof token === 'object' ? JSON.stringify(token) : token))
            })
            .catch(err => {
              this.addLog('close', 'open() Promise rejected: ' + (err || 'closed'))
            })
        }
      })
    },

    closeDialog() {
      const captcha = this.$refs.captcha
      if (captcha && captcha.close) {
        captcha.close()
        this.addLog('close', '调用 close() 关闭弹窗')
      }
    },

    refreshCaptcha() {
      const captcha = this.$refs.captcha
      if (captcha && captcha.refresh) {
        captcha.refresh()
        this.addLog('info', '调用 refresh() 刷新验证码')
      }
    },

    onSuccess(data) {
      this.componentStatus = 'success'
      this.addLog('success', '验证成功 → ' + JSON.stringify(data))
    },

    onFail() {
      this.componentStatus = 'fail'
      this.addLog('fail', '验证失败')
    },

    onClose() {
      this.componentStatus = ''
      this.addLog('close', '对话框已关闭')
    },

    addLog(type, msg) {
      const now = new Date()
      const time = now.toLocaleTimeString() + '.' + String(now.getMilliseconds()).padStart(3, '0')
      this.logs.unshift({ type, msg, time })
      if (this.logs.length > 50) this.logs.pop()
    },
  },
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #f5f7fa;
  color: #333;
  padding: 40px 20px;
}
.demo-container { max-width: 700px; margin: 0 auto; }
.demo-header { text-align: center; margin-bottom: 32px; }
.demo-header h1 { font-size: 24px; font-weight: 600; color: #1a1a2e; }
.demo-header p { margin-top: 8px; color: #888; font-size: 14px; }
.demo-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.demo-section h2 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
  color: #1a1a2e;
}
.demo-section h2 small { font-weight: 400; font-size: 12px; color: #999; margin-left: 8px; }
.form-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.form-row label { font-size: 13px; color: #666; white-space: nowrap; min-width: 80px; }
.form-row .el-input { flex: 1; }
.form-row .el-button { flex-shrink: 0; }
.mode-switch { display: flex; gap: 12px; margin-bottom: 16px; }
.mode-btn {
  flex: 1; padding: 10px; text-align: center;
  border: 1px solid #dcdfe6; border-radius: 8px; cursor: pointer;
  font-size: 13px; background: #fff; transition: all 0.2s;
}
.mode-btn:hover { border-color: #409eff; color: #409eff; }
.mode-btn.active { border-color: #409eff; background: #ecf5ff; color: #409eff; font-weight: 600; }
.demo-inline-area { display: flex; justify-content: center; padding: 12px 0; min-height: 260px; }
.event-log {
  background: #fafafa; border-radius: 8px; padding: 12px 16px;
  margin-top: 12px; font-size: 12px; max-height: 160px; overflow-y: auto;
}
.event-log .log-entry { padding: 4px 0; border-bottom: 1px solid #f0f0f0; color: #666; }
.event-log .log-entry:last-child { border-bottom: none; }
.event-log .log-entry .tag {
  display: inline-block; padding: 1px 6px; border-radius: 3px;
  font-size: 11px; margin-right: 6px; font-weight: 600;
}
.tag-success { background: #f0f9eb; color: #67c23a; }
.tag-fail { background: #fef0f0; color: #f56c6c; }
.tag-info { background: #ecf5ff; color: #409eff; }
.tag-close { background: #f4f4f5; color: #909399; }
.method-buttons { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.status-bar {
  display: flex; align-items: center; gap: 16px; margin-top: 12px;
  padding: 10px 14px; background: #f8f9fa; border-radius: 6px; font-size: 13px;
}
.status-bar .label { color: #999; }
.status-bar .value { color: #333; font-weight: 600; }
.status-bar .value.idle { color: #909399; }
.status-bar .value.loading { color: #409eff; }
.status-bar .value.success { color: #67c23a; }
.status-bar .value.fail { color: #f56c6c; }
.tip-box {
  background: #fff7e6; border: 1px solid #ffe58f; border-radius: 6px;
  padding: 10px 14px; font-size: 12px; color: #ad8b3a; margin-bottom: 12px;
}
</style>
