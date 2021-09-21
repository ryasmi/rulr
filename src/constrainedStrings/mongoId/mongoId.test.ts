import * as assert from 'assert'
import { mongoId, MongoId, InvalidMongoIdError } from '../../rulr'

test('mongoId should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => mongoId(input), InvalidMongoIdError)
})

test('mongoId should allow valid mongoId input', () => {
	const input = '507f1f77bcf86cd799439011'
	const output: MongoId = mongoId(input)
	assert.strictEqual(output, input)
})

test('mongoId should not allow invalid mongoId input', () => {
	const input = '507f1f77bcf86cd7994390'
	assert.throws(() => mongoId(input), InvalidMongoIdError)
})
