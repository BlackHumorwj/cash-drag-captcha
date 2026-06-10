'use strict';

var axios = require('axios');

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: 'CaptchaBodyView',
  inject: ['$dragCaptcha']
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (style) {
        hook = function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "captcha-box", staticStyle: { position: "relative" } },
    [
      _c(
        "div",
        {
          staticClass: "captcha-bg",
          style: {
            width: _vm.$dragCaptcha.captchaWidth + "px",
            height: _vm.$dragCaptcha.captchaHeight + "px",
          },
        },
        [
          _c("img", {
            staticStyle: { width: "100%", height: "100%", display: "block" },
            attrs: { src: _vm.$dragCaptcha.bgImage, alt: "验证码背景" },
          }),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "captcha-icon-btn captcha-refresh-btn",
              attrs: { title: "刷新" },
              on: { click: _vm.$dragCaptcha.refresh },
            },
            [
              _c(
                "svg",
                {
                  staticClass: "refresh-svg-icon",
                  attrs: {
                    viewBox: "0 0 24 24",
                    width: "18",
                    height: "18",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                },
                [
                  _c("polyline", { attrs: { points: "23 4 23 10 17 10" } }),
                  _vm._v(" "),
                  _c("polyline", { attrs: { points: "1 20 1 14 7 14" } }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
                    },
                  }),
                ]
              ),
            ]
          ),
        ]
      ),
      _vm._v(" "),
      _vm.$dragCaptcha.pieceImage
        ? _c(
            "div",
            {
              staticClass: "slider-piece",
              class: { "piece-dragging": _vm.$dragCaptcha.isDragging },
              style: {
                position: "absolute",
                width: _vm.$dragCaptcha.pieceDisplayWidth + "px",
                height: _vm.$dragCaptcha.pieceDisplayHeight + "px",
                left: _vm.$dragCaptcha.pieceAdjustedLeft + "px",
                top: _vm.$dragCaptcha.pieceAdjustedTop + "px",
                zIndex: 20,
                pointerEvents: "none",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                transition: "left 0.05s linear",
                overflow: "hidden",
              },
            },
            [
              _c("img", {
                style: {
                  position: "absolute",
                  width: _vm.$dragCaptcha.captchaWidth + "px",
                  height: _vm.$dragCaptcha.captchaHeight + "px",
                  left:
                    _vm.$dragCaptcha.piecePadding -
                    _vm.$dragCaptcha.targetX +
                    "px",
                  top:
                    _vm.$dragCaptcha.piecePadding -
                    _vm.$dragCaptcha.targetY +
                    "px",
                  pointerEvents: "none",
                },
                attrs: { src: _vm.$dragCaptcha.pieceImage, alt: "拼图块" },
              }),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "slider-track",
          style: { width: _vm.$dragCaptcha.captchaWidth + "px" },
        },
        [
          _c("div", {
            staticClass: "slider-progress",
            style: { left: "0px", width: _vm.$dragCaptcha.sliderPercent + "%" },
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "slider-block puzzle-shape",
              class: {
                "is-dragging": _vm.$dragCaptcha.isDragging,
                "is-success": _vm.$dragCaptcha.status === "success",
                "is-fail": _vm.$dragCaptcha.status === "fail",
              },
              style: { left: _vm.$dragCaptcha.sliderLeft + "px" },
              on: {
                mousedown: function ($event) {
                  $event.preventDefault();
                  return _vm.$dragCaptcha.onDragStart($event)
                },
                touchstart: function ($event) {
                  $event.preventDefault();
                  return _vm.$dragCaptcha.onDragStart($event)
                },
              },
            },
            [
              _vm.$dragCaptcha.status === "idle" && !_vm.$dragCaptcha.isDragging
                ? _c("span", { staticClass: "slider-arrow" }, [
                    _c(
                      "svg",
                      {
                        attrs: {
                          viewBox: "0 0 24 24",
                          width: "14",
                          height: "14",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2.5",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                        },
                      },
                      [
                        _c("line", {
                          attrs: { x1: "5", y1: "12", x2: "19", y2: "12" },
                        }),
                        _vm._v(" "),
                        _c("polyline", {
                          attrs: { points: "12 5 19 12 12 19" },
                        }),
                      ]
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.$dragCaptcha.status === "loading"
                ? _c("span", { staticClass: "slider-btn-icon" }, [
                    _c(
                      "svg",
                      {
                        staticClass: "loading-spinner-icon",
                        attrs: {
                          viewBox: "0 0 24 24",
                          width: "18",
                          height: "18",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2.5",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                        },
                      },
                      [
                        _c("path", {
                          attrs: { d: "M21 12a9 9 0 1 1-6.219-8.56" },
                        }),
                      ]
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.$dragCaptcha.status === "success"
                ? _c("span", { staticClass: "slider-btn-icon success-check" }, [
                    _c(
                      "svg",
                      {
                        attrs: {
                          viewBox: "0 0 24 24",
                          width: "18",
                          height: "18",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "3",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                        },
                      },
                      [_c("polyline", { attrs: { points: "20 6 9 17 4 12" } })]
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.$dragCaptcha.status === "fail"
                ? _c("span", { staticClass: "slider-btn-icon fail-cross" }, [
                    _c(
                      "svg",
                      {
                        attrs: {
                          viewBox: "0 0 24 24",
                          width: "18",
                          height: "18",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "3",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                        },
                      },
                      [
                        _c("line", {
                          attrs: { x1: "18", y1: "6", x2: "6", y2: "18" },
                        }),
                        _vm._v(" "),
                        _c("line", {
                          attrs: { x1: "6", y1: "6", x2: "18", y2: "18" },
                        }),
                      ]
                    ),
                  ])
                : _vm._e(),
            ]
          ),
          _vm._v(" "),
          _vm.$dragCaptcha.status === "idle" && !_vm.$dragCaptcha.isDragging
            ? _c("span", { staticClass: "slider-text" }, [
                _vm._v("\n      向右拖动滑块填充拼图\n    "),
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.$dragCaptcha.status === "loading"
            ? _c("span", { staticClass: "slider-text" }, [_vm._v("验证中...")])
            : _vm._e(),
        ]
      ),
      _vm._v(" "),
      _vm.$dragCaptcha.status === "success"
        ? _c("div", { staticClass: "captcha-result captcha-success" }, [
            _c(
              "svg",
              {
                staticStyle: {
                  "vertical-align": "middle",
                  "margin-right": "4px",
                },
                attrs: {
                  viewBox: "0 0 24 24",
                  width: "14",
                  height: "14",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                },
              },
              [_c("polyline", { attrs: { points: "20 6 9 17 4 12" } })]
            ),
            _vm._v("\n    验证通过\n  "),
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.$dragCaptcha.status === "fail"
        ? _c(
            "div",
            {
              staticClass: "captcha-result captcha-fail",
              on: { click: _vm.$dragCaptcha.refresh },
            },
            [
              _c(
                "svg",
                {
                  staticStyle: {
                    "vertical-align": "middle",
                    "margin-right": "4px",
                  },
                  attrs: {
                    viewBox: "0 0 24 24",
                    width: "14",
                    height: "14",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                },
                [
                  _c("line", {
                    attrs: { x1: "18", y1: "6", x2: "6", y2: "18" },
                  }),
                  _vm._v(" "),
                  _c("line", {
                    attrs: { x1: "6", y1: "6", x2: "18", y2: "18" },
                  }),
                ]
              ),
              _vm._v("\n    验证失败，点击重试\n  "),
            ]
          )
        : _vm._e(),
    ]
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script = {
  name: 'CashDragCaptcha',

  components: { captchaBodyView: __vue_component__$1 },

  provide() {
    return { $dragCaptcha: this }
  },

  props: {
    url: { type: String, default: '' },
    visible: { type: Boolean, default: false },
    mode: { type: String, default: 'dialog' },
    captchaOnly: { type: Boolean, default: false },
    appType: { type: String, default: '' },
    channel: { type: String, default: '' },
    versionCode: { type: String, default: '' },
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
        : this.minSliderLeft;
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
      const base = `${this.url.replace(/\/+$/, '')}/global/dragCaptcha/init`;
      return this._appendUrlParams(base)
    },
    apiVerifyUrl() {
      const base = `${this.url.replace(/\/+$/, '')}/global/dragCaptcha/verify`;
      return this._appendUrlParams(base)
    },
  },

  watch: {
    visible(newVal) {
      if (newVal && this.mode === 'dialog') {
        this.dialogVisible = true;
        this.fetchCaptcha();
      } else if (!newVal) {
        this.dialogVisible = false;
      }
    },
  },

  methods: {
    _appendUrlParams(url) {
      const params = [];
      if (this.appType) params.push(`appType=${encodeURIComponent(this.appType)}`);
      if (this.channel) params.push(`channel=${encodeURIComponent(this.channel)}`);
      if (this.versionCode) params.push(`versionCode=${encodeURIComponent(this.versionCode)}`);
      return params.length ? `${url}?${params.join('&')}` : url
    },
    dataUrlToBlobUrl(dataUri) {
      if (!dataUri) return ''
      if (!dataUri.startsWith('data:')) return dataUri
      try {
        const commaIdx = dataUri.indexOf(',');
        if (commaIdx === -1) return dataUri
        const meta = dataUri.slice(0, commaIdx);
        const base64 = dataUri.slice(commaIdx + 1);
        const mimeMatch = meta.match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'image/png';
        const bytes = atob(base64.replace(/\s/g, ''));
        const len = bytes.length;
        const buf = new Uint8Array(len);
        for (let i = 0; i < len; i++) buf[i] = bytes.charCodeAt(i);
        return URL.createObjectURL(new Blob([buf], { type: mime }))
      } catch (e) {
        console.warn('Blob 转换失败，降级为 data URI', e);
        return dataUri
      }
    },
    // 规范化图片源：支持 data URI、http URL、裸 base64 三种格式
    normalizeImageSrc(src) {
      if (!src) return ''
      if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
        return src
      }
      // 裸 base64（如 image/png;base64,iVBOR...）
      return 'data:' + src
    },
    revokeImageBlobs() {
      if (this._bgBlobUrl) { URL.revokeObjectURL(this._bgBlobUrl); this._bgBlobUrl = null; }
      if (this._pieceBlobUrl) { URL.revokeObjectURL(this._pieceBlobUrl); this._pieceBlobUrl = null; }
    },
    async fetchCaptcha() {
      this.status = 'loading';
      try {
        const resp = await axios.get(this.apiInitUrl, { withCredentials: true });
        const c = resp.data && resp.data.returnData ? resp.data.returnData : resp.data;
        this.token = c.token;
        this.revokeImageBlobs();

        // 处理背景图：兼容 data URI、http URL、裸 base64 三种格式
        this.bgImage = this.normalizeImageSrc(c.bgImage);
        this.pieceImage = this.normalizeImageSrc(c.pieceImage);

        this.captchaWidth = c.width;
        this.captchaHeight = c.height;
        this.pieceSizeInner = c.pieceSize;
        const tokenData = this.decodeToken(c.token);
        if (tokenData) {
          this.targetX = tokenData.x;
          this.targetY = tokenData.y;
        } else {
          this.targetY = (c.height - c.pieceSize) / 2;
        }
        this.resetSlider();
        this.status = 'idle';
        this.$nextTick(() => {
          this.trackWidth = this.captchaWidth;
          this.blockWidth = 40;
        });
      } catch (e) {
        console.error('[fetchCaptcha] 获取验证码失败', e);
        this.status = 'fail';
        throw e
      }
    },
    onDragStart(e) {
      if (this.status !== 'idle') return
      this.isDragging = true;
      this.trajectory = [];
      const touch = e.touches ? e.touches[0] : e;
      this.startX = touch.clientX;
      this._onDragMove = (ev) => this.onDragMove(ev);
      this._onDragEnd = () => this.onDragEnd();
      document.addEventListener('mousemove', this._onDragMove);
      document.addEventListener('mouseup', this._onDragEnd);
      document.addEventListener('touchmove', this._onDragMove, { passive: false });
      document.addEventListener('touchend', this._onDragEnd);
    },
    onDragMove(e) {
      if (!this.isDragging) return
      e.preventDefault();
      const touch = e.touches ? e.touches[0] : e;
      const deltaX = touch.clientX - this.startX;
      const maxLeft = this.trackWidth - this.blockWidth;
      const newLeft = Math.max(0, Math.min(maxLeft, deltaX));
      this.sliderLeft = newLeft;
      this.sliderPercent = maxLeft > 0 ? (newLeft / maxLeft) * 100 : 0;
      this.trajectory.push([Math.round(this.pieceLeft), Math.round(this.targetY), Date.now()]);
    },
    onDragEnd() {
      if (!this.isDragging) return
      this.isDragging = false;
      document.removeEventListener('mousemove', this._onDragMove);
      document.removeEventListener('mouseup', this._onDragEnd);
      document.removeEventListener('touchmove', this._onDragMove);
      document.removeEventListener('touchend', this._onDragEnd);
      this.finalX = Math.round(this.pieceLeft);
      this.submitCaptcha();
    },
    async submitCaptcha() {
      if (!this.token || this.trajectory.length < 5) {
        this.status = 'fail';
        return
      }
      this.status = 'loading';

      if (this.captchaOnly) {
        this.status = 'success';
        const result = {
          token: this.token,
          trajectory: JSON.stringify(this.trajectory),
          finalX: this.finalX,
        };
        this.$emit('success', result);
        if (this._resolveCaptcha) {
          this._resolveCaptcha(result);
          this._resolveCaptcha = null;
        }
        if (this.mode === 'dialog') {
          setTimeout(() => { this.dialogVisible = false; }, 800);
        }
        return
      }

      try {
        const resp = await axios.post(this.apiVerifyUrl, {
          token: this.token,
          trajectory: JSON.stringify(this.trajectory),
          finalX: this.finalX,
        }, { withCredentials: true });
        this.status = 'success';
        this.$emit('success', { token: this.token });
        if (this._resolveCaptcha) {
          this._resolveCaptcha(this.token);
          this._resolveCaptcha = null;
        }
        if (this.mode === 'dialog') {
          setTimeout(() => { this.dialogVisible = false; }, 800);
        }
      } catch (e) {
        console.error('[submitCaptcha] 验证失败', e);
        this.status = 'fail';
        this.$emit('fail');
        setTimeout(() => this.fetchCaptcha(), 1500);
      }
    },
    decodeToken(token) {
      try {
        const payload = token.split('.')[0];
        try {
          return JSON.parse(payload)
        } catch (e) {
          return JSON.parse(atob(payload))
        }
      } catch (e) {
        console.warn('Token decode failed', e);
        return null
      }
    },
    open() {
      this.dialogVisible = true;
      this.fetchCaptcha();
      return new Promise((resolve, reject) => {
        this._resolveCaptcha = resolve;
        this._rejectCaptcha = reject;
      })
    },
    close() { this.dialogVisible = false; },
    refresh() { this.fetchCaptcha(); },
    resetSlider() {
      this.sliderLeft = 0;
      this.sliderPercent = 0;
      this.trajectory = [];
      this.finalX = 0;
      this.isDragging = false;
    },
    onDialogClosed() {
      this.resetSlider();
      this.status = 'idle';
      this.revokeImageBlobs();
      this.bgImage = '';
      this.pieceImage = '';
      this.$emit('close');
      if (this._rejectCaptcha) {
        this._rejectCaptcha('closed');
        this._rejectCaptcha = null;
      }
      this._resolveCaptcha = null;
    },
  },

  mounted() {
    if (this.mode === 'inline') this.fetchCaptcha();
    if (this.mode === 'dialog' && this.visible) {
      this.dialogVisible = true;
      this.fetchCaptcha();
    }
  },
};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _vm.mode === "dialog"
        ? _c(
            "el-dialog",
            {
              attrs: {
                visible: _vm.dialogVisible,
                "close-on-click-modal": false,
                "show-close": true,
                width: "380px",
                title: "请完成安全验证",
              },
              on: {
                "update:visible": function ($event) {
                  _vm.dialogVisible = $event;
                },
                closed: _vm.onDialogClosed,
              },
            },
            [_c("captcha-body-view")],
            1
          )
        : _c(
            "div",
            { staticClass: "captcha-container" },
            [_c("captcha-body-view")],
            1
          ),
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-39ed7e2c_0", { source: "\n.captcha-container[data-v-39ed7e2c] {\r\n  display: flex;\r\n  justify-content: center;\r\n  padding: 16px 0;\n}\n.el-dialog[data-v-39ed7e2c] {\r\n  -webkit-user-select: none;\r\n  user-select: none;\n}\r\n", map: {"version":3,"sources":["E:\\project\\web\\puma_portal\\cash-comp\\src\\index.vue"],"names":[],"mappings":";AAsVA;EACA,aAAA;EACA,uBAAA;EACA,eAAA;AACA;AACA;EACA,yBAAA;EACA,iBAAA;AACA","file":"index.vue","sourcesContent":["<template>\r\n  <div>\r\n    <!-- Dialog 模式 -->\r\n    <el-dialog\r\n      v-if=\"mode === 'dialog'\"\r\n      :visible.sync=\"dialogVisible\"\r\n      :close-on-click-modal=\"false\"\r\n      :show-close=\"true\"\r\n      width=\"380px\"\r\n      title=\"请完成安全验证\"\r\n      @closed=\"onDialogClosed\"\r\n    >\r\n      <captcha-body-view />\r\n    </el-dialog>\r\n\r\n    <!-- Inline 模式 -->\r\n    <div v-else class=\"captcha-container\">\r\n      <captcha-body-view />\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport axios from 'axios'\r\nimport captchaBodyView from './captcha-body-view.vue'\r\n\r\nexport default {\r\n  name: 'CashDragCaptcha',\r\n\r\n  components: { captchaBodyView },\r\n\r\n  provide() {\r\n    return { $dragCaptcha: this }\r\n  },\r\n\r\n  props: {\r\n    url: { type: String, default: '' },\r\n    visible: { type: Boolean, default: false },\r\n    mode: { type: String, default: 'dialog' },\r\n    captchaOnly: { type: Boolean, default: false },\r\n    appType: { type: String, default: '' },\r\n    channel: { type: String, default: '' },\r\n    versionCode: { type: String, default: '' },\r\n  },\r\n\r\n  data() {\r\n    return {\r\n      dialogVisible: false,\r\n      token: '',\r\n      bgImage: '',\r\n      pieceImage: '',\r\n      _bgBlobUrl: null,\r\n      _pieceBlobUrl: null,\r\n      captchaWidth: 320,\r\n      captchaHeight: 160,\r\n      pieceSizeInner: 45,\r\n      targetY: 0,\r\n      targetX: 0,\r\n      sliderLeft: 0,\r\n      sliderPercent: 0,\r\n      isDragging: false,\r\n      status: 'idle',\r\n      trajectory: [],\r\n      finalX: 0,\r\n      startX: 0,\r\n      blockWidth: 40,\r\n      trackWidth: 320,\r\n      _resolveCaptcha: null,\r\n      _rejectCaptcha: null,\r\n    }\r\n  },\r\n\r\n  computed: {\r\n    pieceLeftOffset() {\r\n      return (this.blockWidth - this.pieceSizeInner) / 2\r\n    },\r\n    pieceLeft() {\r\n      return this.sliderLeft + this.blockWidth / 2 - this.pieceSizeInner / 2\r\n    },\r\n    minSliderLeft() {\r\n      return Math.max(\r\n        Math.ceil(this.piecePadding + this.pieceSizeInner / 2 - this.blockWidth / 2),\r\n        Math.floor(this.captchaWidth * 0.05)\r\n      )\r\n    },\r\n    piecePadding() {\r\n      return 12\r\n    },\r\n    pieceDisplayWidth() {\r\n      return this.pieceSizeInner + this.piecePadding * 2\r\n    },\r\n    pieceDisplayHeight() {\r\n      return this.pieceSizeInner + this.piecePadding * 2\r\n    },\r\n    pieceAdjustedLeft() {\r\n      const baseLeft = this.isDragging || this.status !== 'idle'\r\n        ? this.sliderLeft\r\n        : this.minSliderLeft\r\n      return baseLeft + this.blockWidth / 2 - this.pieceSizeInner / 2 - this.piecePadding\r\n    },\r\n    pieceAdjustedTop() {\r\n      return this.targetY - this.piecePadding\r\n    },\r\n    pieceBackgroundSize() {\r\n      return this.captchaWidth + 'px ' + this.captchaHeight + 'px'\r\n    },\r\n    pieceBackgroundPosition() {\r\n      return (-this.targetX + this.piecePadding) + 'px ' + (-this.targetY + this.piecePadding) + 'px'\r\n    },\r\n    apiInitUrl() {\r\n      const base = `${this.url.replace(/\\/+$/, '')}/global/dragCaptcha/init`\r\n      return this._appendUrlParams(base)\r\n    },\r\n    apiVerifyUrl() {\r\n      const base = `${this.url.replace(/\\/+$/, '')}/global/dragCaptcha/verify`\r\n      return this._appendUrlParams(base)\r\n    },\r\n  },\r\n\r\n  watch: {\r\n    visible(newVal) {\r\n      if (newVal && this.mode === 'dialog') {\r\n        this.dialogVisible = true\r\n        this.fetchCaptcha()\r\n      } else if (!newVal) {\r\n        this.dialogVisible = false\r\n      }\r\n    },\r\n  },\r\n\r\n  methods: {\r\n    _appendUrlParams(url) {\r\n      const params = []\r\n      if (this.appType) params.push(`appType=${encodeURIComponent(this.appType)}`)\r\n      if (this.channel) params.push(`channel=${encodeURIComponent(this.channel)}`)\r\n      if (this.versionCode) params.push(`versionCode=${encodeURIComponent(this.versionCode)}`)\r\n      return params.length ? `${url}?${params.join('&')}` : url\r\n    },\r\n    dataUrlToBlobUrl(dataUri) {\r\n      if (!dataUri) return ''\r\n      if (!dataUri.startsWith('data:')) return dataUri\r\n      try {\r\n        const commaIdx = dataUri.indexOf(',')\r\n        if (commaIdx === -1) return dataUri\r\n        const meta = dataUri.slice(0, commaIdx)\r\n        const base64 = dataUri.slice(commaIdx + 1)\r\n        const mimeMatch = meta.match(/:(.*?);/)\r\n        const mime = mimeMatch ? mimeMatch[1] : 'image/png'\r\n        const bytes = atob(base64.replace(/\\s/g, ''))\r\n        const len = bytes.length\r\n        const buf = new Uint8Array(len)\r\n        for (let i = 0; i < len; i++) buf[i] = bytes.charCodeAt(i)\r\n        return URL.createObjectURL(new Blob([buf], { type: mime }))\r\n      } catch (e) {\r\n        console.warn('Blob 转换失败，降级为 data URI', e)\r\n        return dataUri\r\n      }\r\n    },\r\n    // 规范化图片源：支持 data URI、http URL、裸 base64 三种格式\r\n    normalizeImageSrc(src) {\r\n      if (!src) return ''\r\n      if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {\r\n        return src\r\n      }\r\n      // 裸 base64（如 image/png;base64,iVBOR...）\r\n      return 'data:' + src\r\n    },\r\n    revokeImageBlobs() {\r\n      if (this._bgBlobUrl) { URL.revokeObjectURL(this._bgBlobUrl); this._bgBlobUrl = null }\r\n      if (this._pieceBlobUrl) { URL.revokeObjectURL(this._pieceBlobUrl); this._pieceBlobUrl = null }\r\n    },\r\n    async fetchCaptcha() {\r\n      this.status = 'loading'\r\n      try {\r\n        const resp = await axios.get(this.apiInitUrl, { withCredentials: true })\r\n        const c = resp.data && resp.data.returnData ? resp.data.returnData : resp.data\r\n        this.token = c.token\r\n        this.revokeImageBlobs()\r\n\r\n        // 处理背景图：兼容 data URI、http URL、裸 base64 三种格式\r\n        this.bgImage = this.normalizeImageSrc(c.bgImage)\r\n        this.pieceImage = this.normalizeImageSrc(c.pieceImage)\r\n\r\n        this.captchaWidth = c.width\r\n        this.captchaHeight = c.height\r\n        this.pieceSizeInner = c.pieceSize\r\n        const tokenData = this.decodeToken(c.token)\r\n        if (tokenData) {\r\n          this.targetX = tokenData.x\r\n          this.targetY = tokenData.y\r\n        } else {\r\n          this.targetY = (c.height - c.pieceSize) / 2\r\n        }\r\n        this.resetSlider()\r\n        this.status = 'idle'\r\n        this.$nextTick(() => {\r\n          this.trackWidth = this.captchaWidth\r\n          this.blockWidth = 40\r\n        })\r\n      } catch (e) {\r\n        console.error('[fetchCaptcha] 获取验证码失败', e)\r\n        this.status = 'fail'\r\n        throw e\r\n      }\r\n    },\r\n    onDragStart(e) {\r\n      if (this.status !== 'idle') return\r\n      this.isDragging = true\r\n      this.trajectory = []\r\n      const touch = e.touches ? e.touches[0] : e\r\n      this.startX = touch.clientX\r\n      this._onDragMove = (ev) => this.onDragMove(ev)\r\n      this._onDragEnd = () => this.onDragEnd()\r\n      document.addEventListener('mousemove', this._onDragMove)\r\n      document.addEventListener('mouseup', this._onDragEnd)\r\n      document.addEventListener('touchmove', this._onDragMove, { passive: false })\r\n      document.addEventListener('touchend', this._onDragEnd)\r\n    },\r\n    onDragMove(e) {\r\n      if (!this.isDragging) return\r\n      e.preventDefault()\r\n      const touch = e.touches ? e.touches[0] : e\r\n      const deltaX = touch.clientX - this.startX\r\n      const maxLeft = this.trackWidth - this.blockWidth\r\n      const newLeft = Math.max(0, Math.min(maxLeft, deltaX))\r\n      this.sliderLeft = newLeft\r\n      this.sliderPercent = maxLeft > 0 ? (newLeft / maxLeft) * 100 : 0\r\n      this.trajectory.push([Math.round(this.pieceLeft), Math.round(this.targetY), Date.now()])\r\n    },\r\n    onDragEnd() {\r\n      if (!this.isDragging) return\r\n      this.isDragging = false\r\n      document.removeEventListener('mousemove', this._onDragMove)\r\n      document.removeEventListener('mouseup', this._onDragEnd)\r\n      document.removeEventListener('touchmove', this._onDragMove)\r\n      document.removeEventListener('touchend', this._onDragEnd)\r\n      this.finalX = Math.round(this.pieceLeft)\r\n      this.submitCaptcha()\r\n    },\r\n    async submitCaptcha() {\r\n      if (!this.token || this.trajectory.length < 5) {\r\n        this.status = 'fail'\r\n        return\r\n      }\r\n      this.status = 'loading'\r\n\r\n      if (this.captchaOnly) {\r\n        this.status = 'success'\r\n        const result = {\r\n          token: this.token,\r\n          trajectory: JSON.stringify(this.trajectory),\r\n          finalX: this.finalX,\r\n        }\r\n        this.$emit('success', result)\r\n        if (this._resolveCaptcha) {\r\n          this._resolveCaptcha(result)\r\n          this._resolveCaptcha = null\r\n        }\r\n        if (this.mode === 'dialog') {\r\n          setTimeout(() => { this.dialogVisible = false }, 800)\r\n        }\r\n        return\r\n      }\r\n\r\n      try {\r\n        const resp = await axios.post(this.apiVerifyUrl, {\r\n          token: this.token,\r\n          trajectory: JSON.stringify(this.trajectory),\r\n          finalX: this.finalX,\r\n        }, { withCredentials: true })\r\n        this.status = 'success'\r\n        this.$emit('success', { token: this.token })\r\n        if (this._resolveCaptcha) {\r\n          this._resolveCaptcha(this.token)\r\n          this._resolveCaptcha = null\r\n        }\r\n        if (this.mode === 'dialog') {\r\n          setTimeout(() => { this.dialogVisible = false }, 800)\r\n        }\r\n      } catch (e) {\r\n        console.error('[submitCaptcha] 验证失败', e)\r\n        this.status = 'fail'\r\n        this.$emit('fail')\r\n        setTimeout(() => this.fetchCaptcha(), 1500)\r\n      }\r\n    },\r\n    decodeToken(token) {\r\n      try {\r\n        const payload = token.split('.')[0]\r\n        try {\r\n          return JSON.parse(payload)\r\n        } catch (e) {\r\n          return JSON.parse(atob(payload))\r\n        }\r\n      } catch (e) {\r\n        console.warn('Token decode failed', e)\r\n        return null\r\n      }\r\n    },\r\n    open() {\r\n      this.dialogVisible = true\r\n      this.fetchCaptcha()\r\n      return new Promise((resolve, reject) => {\r\n        this._resolveCaptcha = resolve\r\n        this._rejectCaptcha = reject\r\n      })\r\n    },\r\n    close() { this.dialogVisible = false },\r\n    refresh() { this.fetchCaptcha() },\r\n    resetSlider() {\r\n      this.sliderLeft = 0\r\n      this.sliderPercent = 0\r\n      this.trajectory = []\r\n      this.finalX = 0\r\n      this.isDragging = false\r\n    },\r\n    onDialogClosed() {\r\n      this.resetSlider()\r\n      this.status = 'idle'\r\n      this.revokeImageBlobs()\r\n      this.bgImage = ''\r\n      this.pieceImage = ''\r\n      this.$emit('close')\r\n      if (this._rejectCaptcha) {\r\n        this._rejectCaptcha('closed')\r\n        this._rejectCaptcha = null\r\n      }\r\n      this._resolveCaptcha = null\r\n    },\r\n  },\r\n\r\n  mounted() {\r\n    if (this.mode === 'inline') this.fetchCaptcha()\r\n    if (this.mode === 'dialog' && this.visible) {\r\n      this.dialogVisible = true\r\n      this.fetchCaptcha()\r\n    }\r\n  },\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.captcha-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  padding: 16px 0;\r\n}\r\n.el-dialog {\r\n  -webkit-user-select: none;\r\n  user-select: none;\r\n}\r\n</style>\r\n\r\n<style>\r\n.captcha-box {\r\n  position: relative;\r\n  width: 320px;\r\n  margin: 0 auto;\r\n  background: #fff;\r\n  border-radius: 8px;\r\n  overflow: visible;\r\n  box-shadow: 0 2px 16px rgba(0,0,0,0.1);\r\n}\r\n\r\n.captcha-bg {\r\n  position: relative;\r\n  overflow: hidden;\r\n  border-radius: 4px 4px 0 0;\r\n}\r\n\r\n.captcha-icon-btn {\r\n  position: absolute;\r\n  top: 8px;\r\n  right: 8px;\r\n  width: 32px;\r\n  height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: rgba(255, 255, 255, 0.9);\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  z-index: 30;\r\n  color: #666;\r\n  transition: all 0.2s;\r\n  box-shadow: 0 2px 6px rgba(0,0,0,0.15);\r\n}\r\n.captcha-icon-btn:hover {\r\n  background: #fff;\r\n  color: #333;\r\n  transform: scale(1.1);\r\n}\r\n.refresh-svg-icon {\r\n  animation: none;\r\n}\r\n.captcha-icon-btn:hover .refresh-svg-icon {\r\n  animation: spin 0.6s ease-in-out;\r\n}\r\n@keyframes spin {\r\n  from { transform: rotate(0deg); }\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.slider-piece {\r\n  pointer-events: none;\r\n  transition: left 0.05s linear;\r\n}\r\n\r\n.slider-track {\r\n  position: relative;\r\n  height: 40px;\r\n  background: #f0f0f0;\r\n  border-radius: 4px;\r\n  margin-top: 8px;\r\n  overflow: hidden;\r\n}\r\n\r\n.slider-progress {\r\n  position: absolute;\r\n  top: 0;\r\n  height: 100%;\r\n  background: linear-gradient(90deg, #7ac70c, #8cd93e);\r\n  transition: width 0.05s linear;\r\n}\r\n\r\n.slider-block {\r\n  position: absolute;\r\n  top: 0;\r\n  width: 40px;\r\n  height: 40px;\r\n  background: #fff;\r\n  border: 1px solid #ddd;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 10;\r\n  transition: box-shadow 0.2s;\r\n  box-shadow: 0 2px 4px rgba(0,0,0,0.15);\r\n}\r\n.slider-block:hover {\r\n  box-shadow: 0 2px 8px rgba(0,0,0,0.2);\r\n}\r\n.slider-block.is-dragging {\r\n  box-shadow: 0 2px 12px rgba(0,0,0,0.25);\r\n  border-color: #409eff;\r\n}\r\n.slider-block.is-success {\r\n  border-color: #67c23a;\r\n  background: linear-gradient(135deg, #67c23a, #85ce61);\r\n}\r\n.slider-block.is-success .slider-btn-icon {\r\n  color: #fff;\r\n}\r\n.slider-block.is-fail {\r\n  border-color: #f56c6c;\r\n  background: linear-gradient(135deg, #f56c6c, #f78989);\r\n}\r\n.slider-block.is-fail .slider-btn-icon {\r\n  color: #fff;\r\n}\r\n\r\n.slider-arrow {\r\n  color: #666;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.slider-text {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  text-align: center;\r\n  color: #999;\r\n  font-size: 13px;\r\n  z-index: 1;\r\n  pointer-events: none;\r\n}\r\n\r\n.slider-btn-icon {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.loading-spinner-icon {\r\n  animation: loading-rotate 1s linear infinite;\r\n}\r\n@keyframes loading-rotate {\r\n  from { transform: rotate(0deg); }\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.captcha-result {\r\n  margin-top: 10px;\r\n  padding: 8px 12px;\r\n  border-radius: 4px;\r\n  font-size: 13px;\r\n  display: flex;\r\n  align-items: center;\r\n  cursor: pointer;\r\n}\r\n.captcha-success {\r\n  background: #f0f9eb;\r\n  color: #67c23a;\r\n}\r\n.captcha-fail {\r\n  background: #fef0f0;\r\n  color: #f56c6c;\r\n}\r\n</style>\r\n"]}, media: undefined })
,inject("data-v-39ed7e2c_1", { source: "\n.captcha-box {\r\n  position: relative;\r\n  width: 320px;\r\n  margin: 0 auto;\r\n  background: #fff;\r\n  border-radius: 8px;\r\n  overflow: visible;\r\n  box-shadow: 0 2px 16px rgba(0,0,0,0.1);\n}\n.captcha-bg {\r\n  position: relative;\r\n  overflow: hidden;\r\n  border-radius: 4px 4px 0 0;\n}\n.captcha-icon-btn {\r\n  position: absolute;\r\n  top: 8px;\r\n  right: 8px;\r\n  width: 32px;\r\n  height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: rgba(255, 255, 255, 0.9);\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  z-index: 30;\r\n  color: #666;\r\n  transition: all 0.2s;\r\n  box-shadow: 0 2px 6px rgba(0,0,0,0.15);\n}\n.captcha-icon-btn:hover {\r\n  background: #fff;\r\n  color: #333;\r\n  transform: scale(1.1);\n}\n.refresh-svg-icon {\r\n  animation: none;\n}\n.captcha-icon-btn:hover .refresh-svg-icon {\r\n  animation: spin 0.6s ease-in-out;\n}\n@keyframes spin {\nfrom { transform: rotate(0deg);\n}\nto { transform: rotate(360deg);\n}\n}\n.slider-piece {\r\n  pointer-events: none;\r\n  transition: left 0.05s linear;\n}\n.slider-track {\r\n  position: relative;\r\n  height: 40px;\r\n  background: #f0f0f0;\r\n  border-radius: 4px;\r\n  margin-top: 8px;\r\n  overflow: hidden;\n}\n.slider-progress {\r\n  position: absolute;\r\n  top: 0;\r\n  height: 100%;\r\n  background: linear-gradient(90deg, #7ac70c, #8cd93e);\r\n  transition: width 0.05s linear;\n}\n.slider-block {\r\n  position: absolute;\r\n  top: 0;\r\n  width: 40px;\r\n  height: 40px;\r\n  background: #fff;\r\n  border: 1px solid #ddd;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 10;\r\n  transition: box-shadow 0.2s;\r\n  box-shadow: 0 2px 4px rgba(0,0,0,0.15);\n}\n.slider-block:hover {\r\n  box-shadow: 0 2px 8px rgba(0,0,0,0.2);\n}\n.slider-block.is-dragging {\r\n  box-shadow: 0 2px 12px rgba(0,0,0,0.25);\r\n  border-color: #409eff;\n}\n.slider-block.is-success {\r\n  border-color: #67c23a;\r\n  background: linear-gradient(135deg, #67c23a, #85ce61);\n}\n.slider-block.is-success .slider-btn-icon {\r\n  color: #fff;\n}\n.slider-block.is-fail {\r\n  border-color: #f56c6c;\r\n  background: linear-gradient(135deg, #f56c6c, #f78989);\n}\n.slider-block.is-fail .slider-btn-icon {\r\n  color: #fff;\n}\n.slider-arrow {\r\n  color: #666;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\n}\n.slider-text {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  text-align: center;\r\n  color: #999;\r\n  font-size: 13px;\r\n  z-index: 1;\r\n  pointer-events: none;\n}\n.slider-btn-icon {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\n}\n.loading-spinner-icon {\r\n  animation: loading-rotate 1s linear infinite;\n}\n@keyframes loading-rotate {\nfrom { transform: rotate(0deg);\n}\nto { transform: rotate(360deg);\n}\n}\n.captcha-result {\r\n  margin-top: 10px;\r\n  padding: 8px 12px;\r\n  border-radius: 4px;\r\n  font-size: 13px;\r\n  display: flex;\r\n  align-items: center;\r\n  cursor: pointer;\n}\n.captcha-success {\r\n  background: #f0f9eb;\r\n  color: #67c23a;\n}\n.captcha-fail {\r\n  background: #fef0f0;\r\n  color: #f56c6c;\n}\r\n", map: {"version":3,"sources":["E:\\project\\web\\puma_portal\\cash-comp\\src\\index.vue"],"names":[],"mappings":";AAkWA;EACA,kBAAA;EACA,YAAA;EACA,cAAA;EACA,gBAAA;EACA,kBAAA;EACA,iBAAA;EACA,sCAAA;AACA;AAEA;EACA,kBAAA;EACA,gBAAA;EACA,0BAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,oCAAA;EACA,kBAAA;EACA,eAAA;EACA,WAAA;EACA,WAAA;EACA,oBAAA;EACA,sCAAA;AACA;AACA;EACA,gBAAA;EACA,WAAA;EACA,qBAAA;AACA;AACA;EACA,eAAA;AACA;AACA;EACA,gCAAA;AACA;AACA;AACA,OAAA,uBAAA;AAAA;AACA,KAAA,yBAAA;AAAA;AACA;AAEA;EACA,oBAAA;EACA,6BAAA;AACA;AAEA;EACA,kBAAA;EACA,YAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,YAAA;EACA,oDAAA;EACA,8BAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,2BAAA;EACA,sCAAA;AACA;AACA;EACA,qCAAA;AACA;AACA;EACA,uCAAA;EACA,qBAAA;AACA;AACA;EACA,qBAAA;EACA,qDAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,qBAAA;EACA,qDAAA;AACA;AACA;EACA,WAAA;AACA;AAEA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,WAAA;EACA,eAAA;EACA,UAAA;EACA,oBAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AACA;AAEA;EACA,4CAAA;AACA;AACA;AACA,OAAA,uBAAA;AAAA;AACA,KAAA,yBAAA;AAAA;AACA;AAEA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,eAAA;AACA;AACA;EACA,mBAAA;EACA,cAAA;AACA;AACA;EACA,mBAAA;EACA,cAAA;AACA","file":"index.vue","sourcesContent":["<template>\r\n  <div>\r\n    <!-- Dialog 模式 -->\r\n    <el-dialog\r\n      v-if=\"mode === 'dialog'\"\r\n      :visible.sync=\"dialogVisible\"\r\n      :close-on-click-modal=\"false\"\r\n      :show-close=\"true\"\r\n      width=\"380px\"\r\n      title=\"请完成安全验证\"\r\n      @closed=\"onDialogClosed\"\r\n    >\r\n      <captcha-body-view />\r\n    </el-dialog>\r\n\r\n    <!-- Inline 模式 -->\r\n    <div v-else class=\"captcha-container\">\r\n      <captcha-body-view />\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport axios from 'axios'\r\nimport captchaBodyView from './captcha-body-view.vue'\r\n\r\nexport default {\r\n  name: 'CashDragCaptcha',\r\n\r\n  components: { captchaBodyView },\r\n\r\n  provide() {\r\n    return { $dragCaptcha: this }\r\n  },\r\n\r\n  props: {\r\n    url: { type: String, default: '' },\r\n    visible: { type: Boolean, default: false },\r\n    mode: { type: String, default: 'dialog' },\r\n    captchaOnly: { type: Boolean, default: false },\r\n    appType: { type: String, default: '' },\r\n    channel: { type: String, default: '' },\r\n    versionCode: { type: String, default: '' },\r\n  },\r\n\r\n  data() {\r\n    return {\r\n      dialogVisible: false,\r\n      token: '',\r\n      bgImage: '',\r\n      pieceImage: '',\r\n      _bgBlobUrl: null,\r\n      _pieceBlobUrl: null,\r\n      captchaWidth: 320,\r\n      captchaHeight: 160,\r\n      pieceSizeInner: 45,\r\n      targetY: 0,\r\n      targetX: 0,\r\n      sliderLeft: 0,\r\n      sliderPercent: 0,\r\n      isDragging: false,\r\n      status: 'idle',\r\n      trajectory: [],\r\n      finalX: 0,\r\n      startX: 0,\r\n      blockWidth: 40,\r\n      trackWidth: 320,\r\n      _resolveCaptcha: null,\r\n      _rejectCaptcha: null,\r\n    }\r\n  },\r\n\r\n  computed: {\r\n    pieceLeftOffset() {\r\n      return (this.blockWidth - this.pieceSizeInner) / 2\r\n    },\r\n    pieceLeft() {\r\n      return this.sliderLeft + this.blockWidth / 2 - this.pieceSizeInner / 2\r\n    },\r\n    minSliderLeft() {\r\n      return Math.max(\r\n        Math.ceil(this.piecePadding + this.pieceSizeInner / 2 - this.blockWidth / 2),\r\n        Math.floor(this.captchaWidth * 0.05)\r\n      )\r\n    },\r\n    piecePadding() {\r\n      return 12\r\n    },\r\n    pieceDisplayWidth() {\r\n      return this.pieceSizeInner + this.piecePadding * 2\r\n    },\r\n    pieceDisplayHeight() {\r\n      return this.pieceSizeInner + this.piecePadding * 2\r\n    },\r\n    pieceAdjustedLeft() {\r\n      const baseLeft = this.isDragging || this.status !== 'idle'\r\n        ? this.sliderLeft\r\n        : this.minSliderLeft\r\n      return baseLeft + this.blockWidth / 2 - this.pieceSizeInner / 2 - this.piecePadding\r\n    },\r\n    pieceAdjustedTop() {\r\n      return this.targetY - this.piecePadding\r\n    },\r\n    pieceBackgroundSize() {\r\n      return this.captchaWidth + 'px ' + this.captchaHeight + 'px'\r\n    },\r\n    pieceBackgroundPosition() {\r\n      return (-this.targetX + this.piecePadding) + 'px ' + (-this.targetY + this.piecePadding) + 'px'\r\n    },\r\n    apiInitUrl() {\r\n      const base = `${this.url.replace(/\\/+$/, '')}/global/dragCaptcha/init`\r\n      return this._appendUrlParams(base)\r\n    },\r\n    apiVerifyUrl() {\r\n      const base = `${this.url.replace(/\\/+$/, '')}/global/dragCaptcha/verify`\r\n      return this._appendUrlParams(base)\r\n    },\r\n  },\r\n\r\n  watch: {\r\n    visible(newVal) {\r\n      if (newVal && this.mode === 'dialog') {\r\n        this.dialogVisible = true\r\n        this.fetchCaptcha()\r\n      } else if (!newVal) {\r\n        this.dialogVisible = false\r\n      }\r\n    },\r\n  },\r\n\r\n  methods: {\r\n    _appendUrlParams(url) {\r\n      const params = []\r\n      if (this.appType) params.push(`appType=${encodeURIComponent(this.appType)}`)\r\n      if (this.channel) params.push(`channel=${encodeURIComponent(this.channel)}`)\r\n      if (this.versionCode) params.push(`versionCode=${encodeURIComponent(this.versionCode)}`)\r\n      return params.length ? `${url}?${params.join('&')}` : url\r\n    },\r\n    dataUrlToBlobUrl(dataUri) {\r\n      if (!dataUri) return ''\r\n      if (!dataUri.startsWith('data:')) return dataUri\r\n      try {\r\n        const commaIdx = dataUri.indexOf(',')\r\n        if (commaIdx === -1) return dataUri\r\n        const meta = dataUri.slice(0, commaIdx)\r\n        const base64 = dataUri.slice(commaIdx + 1)\r\n        const mimeMatch = meta.match(/:(.*?);/)\r\n        const mime = mimeMatch ? mimeMatch[1] : 'image/png'\r\n        const bytes = atob(base64.replace(/\\s/g, ''))\r\n        const len = bytes.length\r\n        const buf = new Uint8Array(len)\r\n        for (let i = 0; i < len; i++) buf[i] = bytes.charCodeAt(i)\r\n        return URL.createObjectURL(new Blob([buf], { type: mime }))\r\n      } catch (e) {\r\n        console.warn('Blob 转换失败，降级为 data URI', e)\r\n        return dataUri\r\n      }\r\n    },\r\n    // 规范化图片源：支持 data URI、http URL、裸 base64 三种格式\r\n    normalizeImageSrc(src) {\r\n      if (!src) return ''\r\n      if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {\r\n        return src\r\n      }\r\n      // 裸 base64（如 image/png;base64,iVBOR...）\r\n      return 'data:' + src\r\n    },\r\n    revokeImageBlobs() {\r\n      if (this._bgBlobUrl) { URL.revokeObjectURL(this._bgBlobUrl); this._bgBlobUrl = null }\r\n      if (this._pieceBlobUrl) { URL.revokeObjectURL(this._pieceBlobUrl); this._pieceBlobUrl = null }\r\n    },\r\n    async fetchCaptcha() {\r\n      this.status = 'loading'\r\n      try {\r\n        const resp = await axios.get(this.apiInitUrl, { withCredentials: true })\r\n        const c = resp.data && resp.data.returnData ? resp.data.returnData : resp.data\r\n        this.token = c.token\r\n        this.revokeImageBlobs()\r\n\r\n        // 处理背景图：兼容 data URI、http URL、裸 base64 三种格式\r\n        this.bgImage = this.normalizeImageSrc(c.bgImage)\r\n        this.pieceImage = this.normalizeImageSrc(c.pieceImage)\r\n\r\n        this.captchaWidth = c.width\r\n        this.captchaHeight = c.height\r\n        this.pieceSizeInner = c.pieceSize\r\n        const tokenData = this.decodeToken(c.token)\r\n        if (tokenData) {\r\n          this.targetX = tokenData.x\r\n          this.targetY = tokenData.y\r\n        } else {\r\n          this.targetY = (c.height - c.pieceSize) / 2\r\n        }\r\n        this.resetSlider()\r\n        this.status = 'idle'\r\n        this.$nextTick(() => {\r\n          this.trackWidth = this.captchaWidth\r\n          this.blockWidth = 40\r\n        })\r\n      } catch (e) {\r\n        console.error('[fetchCaptcha] 获取验证码失败', e)\r\n        this.status = 'fail'\r\n        throw e\r\n      }\r\n    },\r\n    onDragStart(e) {\r\n      if (this.status !== 'idle') return\r\n      this.isDragging = true\r\n      this.trajectory = []\r\n      const touch = e.touches ? e.touches[0] : e\r\n      this.startX = touch.clientX\r\n      this._onDragMove = (ev) => this.onDragMove(ev)\r\n      this._onDragEnd = () => this.onDragEnd()\r\n      document.addEventListener('mousemove', this._onDragMove)\r\n      document.addEventListener('mouseup', this._onDragEnd)\r\n      document.addEventListener('touchmove', this._onDragMove, { passive: false })\r\n      document.addEventListener('touchend', this._onDragEnd)\r\n    },\r\n    onDragMove(e) {\r\n      if (!this.isDragging) return\r\n      e.preventDefault()\r\n      const touch = e.touches ? e.touches[0] : e\r\n      const deltaX = touch.clientX - this.startX\r\n      const maxLeft = this.trackWidth - this.blockWidth\r\n      const newLeft = Math.max(0, Math.min(maxLeft, deltaX))\r\n      this.sliderLeft = newLeft\r\n      this.sliderPercent = maxLeft > 0 ? (newLeft / maxLeft) * 100 : 0\r\n      this.trajectory.push([Math.round(this.pieceLeft), Math.round(this.targetY), Date.now()])\r\n    },\r\n    onDragEnd() {\r\n      if (!this.isDragging) return\r\n      this.isDragging = false\r\n      document.removeEventListener('mousemove', this._onDragMove)\r\n      document.removeEventListener('mouseup', this._onDragEnd)\r\n      document.removeEventListener('touchmove', this._onDragMove)\r\n      document.removeEventListener('touchend', this._onDragEnd)\r\n      this.finalX = Math.round(this.pieceLeft)\r\n      this.submitCaptcha()\r\n    },\r\n    async submitCaptcha() {\r\n      if (!this.token || this.trajectory.length < 5) {\r\n        this.status = 'fail'\r\n        return\r\n      }\r\n      this.status = 'loading'\r\n\r\n      if (this.captchaOnly) {\r\n        this.status = 'success'\r\n        const result = {\r\n          token: this.token,\r\n          trajectory: JSON.stringify(this.trajectory),\r\n          finalX: this.finalX,\r\n        }\r\n        this.$emit('success', result)\r\n        if (this._resolveCaptcha) {\r\n          this._resolveCaptcha(result)\r\n          this._resolveCaptcha = null\r\n        }\r\n        if (this.mode === 'dialog') {\r\n          setTimeout(() => { this.dialogVisible = false }, 800)\r\n        }\r\n        return\r\n      }\r\n\r\n      try {\r\n        const resp = await axios.post(this.apiVerifyUrl, {\r\n          token: this.token,\r\n          trajectory: JSON.stringify(this.trajectory),\r\n          finalX: this.finalX,\r\n        }, { withCredentials: true })\r\n        this.status = 'success'\r\n        this.$emit('success', { token: this.token })\r\n        if (this._resolveCaptcha) {\r\n          this._resolveCaptcha(this.token)\r\n          this._resolveCaptcha = null\r\n        }\r\n        if (this.mode === 'dialog') {\r\n          setTimeout(() => { this.dialogVisible = false }, 800)\r\n        }\r\n      } catch (e) {\r\n        console.error('[submitCaptcha] 验证失败', e)\r\n        this.status = 'fail'\r\n        this.$emit('fail')\r\n        setTimeout(() => this.fetchCaptcha(), 1500)\r\n      }\r\n    },\r\n    decodeToken(token) {\r\n      try {\r\n        const payload = token.split('.')[0]\r\n        try {\r\n          return JSON.parse(payload)\r\n        } catch (e) {\r\n          return JSON.parse(atob(payload))\r\n        }\r\n      } catch (e) {\r\n        console.warn('Token decode failed', e)\r\n        return null\r\n      }\r\n    },\r\n    open() {\r\n      this.dialogVisible = true\r\n      this.fetchCaptcha()\r\n      return new Promise((resolve, reject) => {\r\n        this._resolveCaptcha = resolve\r\n        this._rejectCaptcha = reject\r\n      })\r\n    },\r\n    close() { this.dialogVisible = false },\r\n    refresh() { this.fetchCaptcha() },\r\n    resetSlider() {\r\n      this.sliderLeft = 0\r\n      this.sliderPercent = 0\r\n      this.trajectory = []\r\n      this.finalX = 0\r\n      this.isDragging = false\r\n    },\r\n    onDialogClosed() {\r\n      this.resetSlider()\r\n      this.status = 'idle'\r\n      this.revokeImageBlobs()\r\n      this.bgImage = ''\r\n      this.pieceImage = ''\r\n      this.$emit('close')\r\n      if (this._rejectCaptcha) {\r\n        this._rejectCaptcha('closed')\r\n        this._rejectCaptcha = null\r\n      }\r\n      this._resolveCaptcha = null\r\n    },\r\n  },\r\n\r\n  mounted() {\r\n    if (this.mode === 'inline') this.fetchCaptcha()\r\n    if (this.mode === 'dialog' && this.visible) {\r\n      this.dialogVisible = true\r\n      this.fetchCaptcha()\r\n    }\r\n  },\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.captcha-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  padding: 16px 0;\r\n}\r\n.el-dialog {\r\n  -webkit-user-select: none;\r\n  user-select: none;\r\n}\r\n</style>\r\n\r\n<style>\r\n.captcha-box {\r\n  position: relative;\r\n  width: 320px;\r\n  margin: 0 auto;\r\n  background: #fff;\r\n  border-radius: 8px;\r\n  overflow: visible;\r\n  box-shadow: 0 2px 16px rgba(0,0,0,0.1);\r\n}\r\n\r\n.captcha-bg {\r\n  position: relative;\r\n  overflow: hidden;\r\n  border-radius: 4px 4px 0 0;\r\n}\r\n\r\n.captcha-icon-btn {\r\n  position: absolute;\r\n  top: 8px;\r\n  right: 8px;\r\n  width: 32px;\r\n  height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: rgba(255, 255, 255, 0.9);\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  z-index: 30;\r\n  color: #666;\r\n  transition: all 0.2s;\r\n  box-shadow: 0 2px 6px rgba(0,0,0,0.15);\r\n}\r\n.captcha-icon-btn:hover {\r\n  background: #fff;\r\n  color: #333;\r\n  transform: scale(1.1);\r\n}\r\n.refresh-svg-icon {\r\n  animation: none;\r\n}\r\n.captcha-icon-btn:hover .refresh-svg-icon {\r\n  animation: spin 0.6s ease-in-out;\r\n}\r\n@keyframes spin {\r\n  from { transform: rotate(0deg); }\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.slider-piece {\r\n  pointer-events: none;\r\n  transition: left 0.05s linear;\r\n}\r\n\r\n.slider-track {\r\n  position: relative;\r\n  height: 40px;\r\n  background: #f0f0f0;\r\n  border-radius: 4px;\r\n  margin-top: 8px;\r\n  overflow: hidden;\r\n}\r\n\r\n.slider-progress {\r\n  position: absolute;\r\n  top: 0;\r\n  height: 100%;\r\n  background: linear-gradient(90deg, #7ac70c, #8cd93e);\r\n  transition: width 0.05s linear;\r\n}\r\n\r\n.slider-block {\r\n  position: absolute;\r\n  top: 0;\r\n  width: 40px;\r\n  height: 40px;\r\n  background: #fff;\r\n  border: 1px solid #ddd;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 10;\r\n  transition: box-shadow 0.2s;\r\n  box-shadow: 0 2px 4px rgba(0,0,0,0.15);\r\n}\r\n.slider-block:hover {\r\n  box-shadow: 0 2px 8px rgba(0,0,0,0.2);\r\n}\r\n.slider-block.is-dragging {\r\n  box-shadow: 0 2px 12px rgba(0,0,0,0.25);\r\n  border-color: #409eff;\r\n}\r\n.slider-block.is-success {\r\n  border-color: #67c23a;\r\n  background: linear-gradient(135deg, #67c23a, #85ce61);\r\n}\r\n.slider-block.is-success .slider-btn-icon {\r\n  color: #fff;\r\n}\r\n.slider-block.is-fail {\r\n  border-color: #f56c6c;\r\n  background: linear-gradient(135deg, #f56c6c, #f78989);\r\n}\r\n.slider-block.is-fail .slider-btn-icon {\r\n  color: #fff;\r\n}\r\n\r\n.slider-arrow {\r\n  color: #666;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.slider-text {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  text-align: center;\r\n  color: #999;\r\n  font-size: 13px;\r\n  z-index: 1;\r\n  pointer-events: none;\r\n}\r\n\r\n.slider-btn-icon {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.loading-spinner-icon {\r\n  animation: loading-rotate 1s linear infinite;\r\n}\r\n@keyframes loading-rotate {\r\n  from { transform: rotate(0deg); }\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.captcha-result {\r\n  margin-top: 10px;\r\n  padding: 8px 12px;\r\n  border-radius: 4px;\r\n  font-size: 13px;\r\n  display: flex;\r\n  align-items: center;\r\n  cursor: pointer;\r\n}\r\n.captcha-success {\r\n  background: #f0f9eb;\r\n  color: #67c23a;\r\n}\r\n.captcha-fail {\r\n  background: #fef0f0;\r\n  color: #f56c6c;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-39ed7e2c";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector);

// 支持 Vue.use() 插件注册
__vue_component__.install = function (Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
};

module.exports = __vue_component__;
