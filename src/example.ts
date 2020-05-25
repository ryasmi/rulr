import { object } from './higherOrderRules/object'
import { array } from './higherOrderRules/array'
import { dictionary } from './higherOrderRules/dictionary'
import { constrain, boolean, enumerated, constant, number, string, Static } from './lib'
import { uuidv4String } from './patternConstrainedStrings/uuidv4'
import { lengthConstrainedString } from './constrainedValues/lengthConstrainedString'
import { rangeConstrainedNumber } from './constrainedValues/rangeConstrainedNumber'
import { allowNull } from './higherOrderRules/allowNull'
import { union } from './higherOrderRules/union'
import { tuple } from './higherOrderRules/tuple'

const constrainToName = lengthConstrainedString<'Name'>({ minLength: 1, maxLength: 25 })
const constrainToPrice = rangeConstrainedNumber<'Price'>({ min: 0, decimalPlaces: 2 })

const constrainToProduct = object({
	required: {
		id: uuidv4String,
		name: constrainToName,
		price: constrainToPrice,
	},
	optional: {
		inStock: boolean,
	},
})
type Product = Static<typeof constrainToProduct>

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
	const constrainToProducts = array(constrainToProduct)
	type Products = Static<typeof constrainToProducts>
	const products: Products = constrainToProducts([
		{ name: 'Product 1', price: 1.33 },
		{ name: 'Product 2', price: 1.33 },
		{ name: 'Product 3', price: 1.334 },
	])
	return [products]
})

demoValidation('Constrained Dictionary Demo', () => {
	function dictionaryKey(input: unknown) {
		const stringInput = string(input)
		if (stringInput.length < 1 || stringInput.length > 2) {
			throw new Error('expected string between 1 and 2 characters')
		}
		return constrain<'DictionaryKey', string>(stringInput)
	}
	const constrainToProductDictionary = dictionary(dictionaryKey, constrainToProduct)
	type ProductDictionary = Static<typeof constrainToProductDictionary>
	const productDictionary: ProductDictionary = constrainToProductDictionary({
		'1': { name: 'Product 1', price: 1.33 },
		'2': { name: 'Product 2', price: 1.33 },
		'234': { name: '', price: 1.333 },
	})
	return [productDictionary]
})

demoValidation('Union Demo', () => {
	const constrainToStringOrBoolean = union(string, boolean)
	type StringOrBoolean = Static<typeof constrainToStringOrBoolean>
	const stringOrBoolean: StringOrBoolean = constrainToStringOrBoolean(1)
	return [stringOrBoolean]
})

demoValidation('Tuple Demo', () => {
	const stringBooleanTuple = tuple(string, boolean)
	type StringBooleanTuple = Static<typeof stringBooleanTuple>
	const myStringBooleanTuple: StringBooleanTuple = stringBooleanTuple(1)
	return [myStringBooleanTuple]
})

demoValidation('Constrained Enum Demo', () => {
	enum TrafficLight {
		Red,
		Orange,
		Green,
	}
	const constrainToTrafficLight = enumerated(TrafficLight)
	const trafficLight = constrainToTrafficLight(TrafficLight.Green)
	return [trafficLight]
})

demoValidation('Constrained Constant Demo', () => {
	const constrainToTen = constant(10)
	type Ten = Static<typeof constrainToTen>
	const ten: Ten = constrainToTen(10)
	return [ten]
})

demoValidation('Compose Rules Demo', () => {
	function constrainToSquareNumber(input: unknown) {
		try {
			const numberInput = number(input)
			const isSquareNumber = numberInput > 0 && Math.sqrt(numberInput) % 1 === 0
			if (isSquareNumber) {
				return numberInput
			}
		} finally {
			// eslint-disable-next-line no-unsafe-finally
			throw new Error('expected square number')
		}
	}
	type SquareNumber = Static<typeof constrainToSquareNumber>
	const squareNumber: SquareNumber = constrainToSquareNumber(4)
	return [squareNumber]
})

demoValidation('RunTypes Example', () => {
	const vector = tuple(number, number, number)

	const asteroid = object({
		required: {
			type: constant('asteroid'),
			location: vector,
			mass: number,
		},
	})

	const planet = object({
		required: {
			type: constant('planet'),
			location: vector,
			mass: number,
			population: number,
			habitable: boolean,
		},
	})

	enum Rank {
		Captain = 'captain',
		FirstMate = 'firstmate',
		Officer = 'officer',
		Ensign = 'ensign',
	}

	const rank = enumerated(Rank)

	const crewMember = object({
		required: {
			name: string,
			age: number,
			rank: rank,
			home: planet,
		},
	})

	const ship = object({
		required: {
			type: constant<'ship', string>('ship'),
			location: vector,
			mass: number,
			name: string,
			crew: array(crewMember),
		},
	})

	const spaceObject = union(asteroid, planet, ship)
	type SpaceObject = Static<typeof spaceObject>

	const mySpaceObject: SpaceObject = spaceObject({
		type: 'asteroi',
		location: [0, 1, 2],
		mass: 0,
	})

	return [mySpaceObject]
})

demoValidation('Old Example', () => {
	const constrainToExample = object({
		required: {
			x: rangeConstrainedNumber<'x'>({ min: 0, max: 1 }),
			y: object({
				required: {
					z: union(
						lengthConstrainedString<'z string'>({ maxLength: 1 }),
						constant<'z constant', boolean>(true),
						rangeConstrainedNumber<'z number'>({ decimalPlaces: 0 })
					),
				},
				optional: {},
			}),
		},
		optional: {
			a: boolean,
			b: array(allowNull(boolean)),
		},
	})
	type ExampleRecord = Static<typeof constrainToExample>
	const myData = { y: { z: '' }, x: 1 }
	const myRecord: ExampleRecord = constrainToExample(myData)
	return [myRecord]
})
