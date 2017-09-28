import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/vue-router-keep-component.common.js',
      format: 'cjs',
      name: 'RouterKeepComponent'
    },
    {
      file: 'dist/vue-router-keep-component.esm.js',
      format: 'es',
      name: 'RouterKeepComponent'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}