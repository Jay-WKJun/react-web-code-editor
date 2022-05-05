import babel from '@rollup/plugin-babel';
// external /node_modules/ 를 대신 해주는 것
import { nodeResolve } from '@rollup/plugin-node-resolve';
// commonjs로 되어있는 파일들을 esm으로 변환시켜주는 plugin
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const inputSrc = [
  ['./index.ts', 'es'],
  ['./index.ts', 'cjs'],
];

export default inputSrc
  .map(([input, format]) => ({
    input,
    output: {
      dir: `dist/${format}`,
      format,
      globals: {
        CodeEditor: 'CodeEditor',
      },
      name: 'CodeEditor',
      preserveModules: true,
    },
    external: [/@babel\/runtime/],
    plugins: [
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
        extensions,
      }),
      nodeResolve({
        extensions,
      }),
      commonjs({
        extensions,
      }),
      peerDepsExternal(),
      postcss(),
    ],
  }));
