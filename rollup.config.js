import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const inputSrc = [
  ['./index.ts', 'esm'],
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
      nodeResolve({
        extensions,
      }),
      typescript({
        compilerOptions: {
          outDir: `dist/${format}`,
          declarationDir: `dist/${format}`,
        },
        exclude: ['*.d.ts', '**/*.d.ts'],
      }),
      commonjs({
        extensions,
      }),
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
        extensions,
      }),
      peerDepsExternal(),
      postcss(),
      visualizer({
        filename: 'stats.html',
      }),
    ],
  }));
