import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';
import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";

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
      name: 'CodeEditor',
      preserveModules: true,
      exports: 'named',
    },
    external: [/@babel\/runtime/],
    plugins: [
      peerDepsExternal(),
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
      terser(),
      visualizer({
        filename: 'stats.html',
      }),
    ],
  }));
