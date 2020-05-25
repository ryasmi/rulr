import { unknown } from './unknown'

test('unknown should allow numbers', () => {
	unknown(10)
})

test('unknown should allow strings', () => {
	unknown('')
})

test('unknown should allow booleans', () => {
	unknown(true)
})

test('unknown should allow objects', () => {
	unknown({})
})

test('unknown should allow symbols', () => {
	unknown(Symbol())
})

test('unknown should allow null', () => {
	unknown(null)
})

test('unknown should allow undefined', () => {
	unknown(undefined)
})

test('unknown should allow functions', () => {
	unknown(() => {
		return
	})
})
