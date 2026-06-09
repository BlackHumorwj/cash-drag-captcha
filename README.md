# @blackhumorwj/cash-drag-captcha

滑动拼图验证码 Vue 组件。基于 Vue 2 + Element UI + Axios。

## 安装

```bash
npm install @blackhumorwj/cash-drag-captcha
```

需要同时安装 peer 依赖：

```bash
npm install vue element-ui axios
```

## 使用

```vue
<template>
  <cash-drag-captcha
    url="https://your-api-server.com"
    mode="dialog"
    @success="onSuccess"
    @fail="onFail"
  />
</template>

<script>
import CashDragCaptcha from '@blackhumorwj/cash-drag-captcha'

export default {
  components: { CashDragCaptcha },
  methods: {
    onSuccess({ token }) {
      console.log('验证通过', token)
    },
    onFail() {
      console.log('验证失败')
    },
  },
}
</script>
```

### 全局注册

```js
import Vue from 'vue'
import CashDragCaptcha from '@blackhumorwj/cash-drag-captcha'

Vue.use(CashDragCaptcha) // 全局注册为 cash-drag-captcha 组件
```

## Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| url | String | 是 | - | API 基础地址，内部拼接 `{url}/global/dragCaptcha/init` 和 `{url}/global/dragCaptcha/verify` |
| mode | String | 否 | dialog | 显示模式: `dialog` / `inline` |
| captchaOnly | Boolean | 否 | false | 仅获取验证码数据，不走服务端校验 |
| visible | Boolean | 否 | false | 对话框可见性（dialog 模式） |

## Events

| Event | 参数 | 说明 |
|---|---|---|
| success | { token } | 验证成功 |
| fail | - | 验证失败 |
| close | - | 对话框关闭 |

## 方法（通过 ref 调用）

| 方法 | 返回值 | 说明 |
|---|---|---|
| open() | Promise\<string\> | 打开对话框并返回 Promise，验证通过时 resolve token |
| close() | - | 关闭对话框 |
| refresh() | - | 刷新验证码 |

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 监听模式
npm run dev
```

## 发布

```bash
npm publish
```

确保已配置 GitHub Packages 认证。

## License

MIT
