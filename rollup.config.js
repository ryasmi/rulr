import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const external = ['make-error', 'atob', 'validator']

export default {
	input: 'src/rulr.ts',
	external,
	plugins: [typescript({ declaration: true, declarationDir: './dist', outDir: './dist' })],
	output: [
		{ file: 'dist/rulr.cjs', format: 'cjs', sourcemap: true, plugins: [terser()] },
		{ file: 'dist/rulr.modern.js', format: 'es', sourcemap: true, plugins: [terser()] },
	],
}
