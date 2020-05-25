import { any } from './any'

test('any should allow numbers', () => {
	any(10)
})

test('any should allow strings', () => {
	any('')
})

test('any should allow booleans', () => {
	any(true)
})

test('any should allow objects', () => {
	any({})
})

test('any should allow symbols', () => {
	any(Symbol())
})

test('any should allow null', () => {
	any(null)
})

test('any should allow undefined', () => {
	any(undefined)
})

test('any should allow functions', () => {
	any(() => {
		return
	})
})
