import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'esm',
      file: 'dist/cash-drag-captcha.esm.js',
    },
    {
      format: 'cjs',
      file: 'dist/cash-drag-captcha.common.js',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions: ['.js', '.vue'] }),
    vue(),
    commonjs({
      include: /node_modules/,
    }),
  ],
}
