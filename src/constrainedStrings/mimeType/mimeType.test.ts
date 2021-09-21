import * as assert from 'assert'
import { mimeType, MimeType, InvalidMimeTypeError } from '../../rulr'

test('mimeType should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => mimeType(input), InvalidMimeTypeError)
})

test('mimeType should allow valid mimeType input', () => {
	const input = 'application/json'
	const output: MimeType = mimeType(input)
	assert.strictEqual(output, input)
})

test('mimeType should not allow invalid mimeType input', () => {
	const input = 'applications/json'
	assert.throws(() => mimeType(input), InvalidMimeTypeError)
})

// https://github.com/LearningLocker/learninglocker/issues/819
test('mimeType should allow valid MS Office document MIME type input', () => {
	const input = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	const output: MimeType = mimeType(input)
	assert.strictEqual(output, input)
})
