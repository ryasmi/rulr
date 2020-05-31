import * as rulr from './lib'
import { uuidv4String } from './constrainedStrings/uuidv4'

const constrainToName = rulr.string<'Name'>({
	constraintId: 'Name',
	minLength: 1,
	maxLength: 25,
})
const constrainToPrice = rulr.number<'Price'>({ min: 0, decimalPlaces: 2 })

const constrainToProduct = rulr.object({
	required: {
		id: uuidv4String,
		name: constrainToName,
		price: constrainToPrice,
	},
	optional: {
		inStock: rulr.boolean,
	},
})
type Product = rulr.Static<typeof constrainToProduct>

function demoValidation<T>(title: string, fn: () => T[]) {
	const trace = new Error().stack?.split('\n')[2].trim().replace('at Object.<anonymous> ', '')
	console.info(title.toUpperCase(), trace)
	try {
		const output = fn()
		console.info(...output)
	} catch (err) {
		if (err instanceof Error) {
			console.error(err.message)
		} else {
			console.error(err)
		}
	}
	console.info('\n')
}

demoValidation('Constrained Values Demo', () => {
	const id = uuidv4String('')
	const name = constrainToName('Product 1')
	const price = constrainToPrice(1.33)
	const product: Product = { id, name, price }
	return [product.name, product.price]
})

demoValidation('Constrained Object Demo', () => {
	const product: Product = constrainToProduct({ name: 'Product 1', price: 1.33 })
	return [product.name, product.price]
})

demoValidation('Constrained Array Demo', () => {
	const constrainToProducts = rulr.array(constrainToProduct)
	type Products = rulr.Static<typeof constrainToProducts>
	const products: Products = constrainToProducts([
		{ name: 'Product 1', price: 1.33 },
		{ name: 'Product 2', price: 1.33 },
		{ name: 'Product 3', price: 1.334 },
	])
	return [products]
})

demoValidation('Constrained Dictionary Demo', () => {
	function dictionaryKey(input: unknown) {
		const stringInput = rulr.unconstrainedString(input)
		if (stringInput.length < 1 || stringInput.length > 2) {
			throw new Error('expected string between 1 and 2 characters')
		}
		return rulr.constrain<'DictionaryKey', string>(stringInput)
	}
	const constrainToProductDictionary = rulr.dictionary(dictionaryKey, constrainToProduct)
	type ProductDictionary = rulr.Static<typeof constrainToProductDictionary>
	const productDictionary: ProductDictionary = constrainToProductDictionary({
		'1': { name: 'Product 1', price: 1.33 },
		'2': { name: 'Product 2', price: 1.33 },
		'234': { name: '', price: 1.333 },
	})
	return [productDictionary]
})

demoValidation('Union Demo', () => {
	const constrainToStringOrBoolean = rulr.union(rulr.unconstrainedString, rulr.boolean)
	type StringOrBoolean = rulr.Static<typeof constrainToStringOrBoolean>
	const stringOrBoolean: StringOrBoolean = constrainToStringOrBoolean(1)
	return [stringOrBoolean]
})

demoValidation('Tuple Demo', () => {
	const stringBooleanTuple = rulr.tuple(rulr.unconstrainedString, rulr.boolean)
	type StringBooleanTuple = rulr.Static<typeof stringBooleanTuple>
	const myStringBooleanTuple: StringBooleanTuple = stringBooleanTuple(1)
	return [myStringBooleanTuple]
})

demoValidation('Constrained Enum Demo', () => {
	enum TrafficLight {
		Red,
		Orange,
		Green,
	}
	const constrainToTrafficLight = rulr.enumerated(TrafficLight)
	const trafficLight = constrainToTrafficLight(TrafficLight.Green)
	return [trafficLight]
})

demoValidation('Constrained Constant Demo', () => {
	const constrainToTen = rulr.constant(10)
	type Ten = rulr.Static<typeof constrainToTen>
	const ten: Ten = constrainToTen(10)
	return [ten]
})

demoValidation('Compose Rules Demo', () => {
	function constrainToSquareNumber(input: unknown) {
		try {
			const numberInput = rulr.unconstrainedNumber(input)
			const isSquareNumber = numberInput > 0 && Math.sqrt(numberInput) % 1 === 0
			if (isSquareNumber) {
				return numberInput
			}
		} finally {
			// eslint-disable-next-line no-unsafe-finally
			throw new Error('expected square number')
		}
	}
	type SquareNumber = rulr.Static<typeof constrainToSquareNumber>
	const squareNumber: SquareNumber = constrainToSquareNumber(4)
	return [squareNumber]
})

demoValidation('RunTypes Example', () => {
	const vector = rulr.tuple(
		rulr.unconstrainedNumber,
		rulr.unconstrainedNumber,
		rulr.unconstrainedNumber
	)

	const asteroid = rulr.object({
		required: {
			type: rulr.constant('asteroid'),
			location: vector,
			mass: rulr.unconstrainedNumber,
		},
	})

	const planet = rulr.object({
		required: {
			type: rulr.constant('planet'),
			location: vector,
			mass: rulr.unconstrainedNumber,
			population: rulr.unconstrainedNumber,
			habitable: rulr.boolean,
		},
	})

	enum Rank {
		Captain = 'captain',
		FirstMate = 'firstmate',
		Officer = 'officer',
		Ensign = 'ensign',
	}

	const rank = rulr.enumerated(Rank)

	const crewMember = rulr.object({
		required: {
			name: rulr.unconstrainedString,
			age: rulr.unconstrainedNumber,
			rank: rank,
			home: planet,
		},
	})

	const ship = rulr.object({
		required: {
			type: rulr.constant<'ship', string>('ship'),
			location: vector,
			mass: rulr.unconstrainedNumber,
			name: rulr.unconstrainedString,
			crew: rulr.array(crewMember),
		},
	})

	const spaceObject = rulr.union(asteroid, planet, ship)
	type SpaceObject = rulr.Static<typeof spaceObject>

	const mySpaceObject: SpaceObject = spaceObject({
		type: 'asteroi',
		location: [0, 1, 2],
		mass: 0,
	})

	return [mySpaceObject]
})

demoValidation('Old Example', () => {
	const constrainToExample = rulr.object({
		required: {
			x: rulr.number<'x'>({ min: 0, max: 1 }),
			y: rulr.object({
				required: {
					z: rulr.union(
						rulr.string<'z string'>({ constraintId: 'z string', maxLength: 1 }),
						rulr.constant<'z constant', boolean>(true),
						rulr.number<'z number'>({ decimalPlaces: 0 })
					),
				},
				optional: {},
			}),
		},
		optional: {
			a: rulr.boolean,
			b: rulr.array(rulr.allowNull(rulr.boolean)),
		},
	})
	type ExampleRecord = rulr.Static<typeof constrainToExample>
	const myData = { y: { z: '' }, x: 1 }
	const myRecord: ExampleRecord = constrainToExample(myData)
	return [myRecord]
})
