import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/with-modal-state.min.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
  external: ['@babel/core'],
};