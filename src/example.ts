import { number } from './constrainedPrimitives/number';
import { string } from './constrainedPrimitives/string';
import { Static } from './core';
import { object } from './constrainedPrimitives/object';
import { array } from './constrainedPrimitives/array';
import { unconstrainedString } from './unconstrainedPrimitives/string';
import { dictionary } from './constrainedPrimitives/dictionary';
import { allowEither } from './utilPrimitives/allowEither';
import { unconstrainedBoolean } from './unconstrainedPrimitives/boolean';
import { ValidationErrors } from "./errors/ValidationErrors";
import { enumerated } from './constrainedPrimitives/enum';
import { constant } from './constrainedPrimitives/constant';
import { composeRules } from './utilPrimitives/composeRules';
import { unconstrainedNumber } from './unconstrainedPrimitives/number';
import { ValidationError } from './errors/ValidationError';

const constrainToName = string({ minLength: 1, maxLength: 25 });
const constrainToPrice = number({ min: 0, max: Infinity, decimalPlaces: 2 });

const constrainToProduct = object({
  required: {
    name: constrainToName,
    price: constrainToPrice,
  },
  optional: {
    inStock: unconstrainedBoolean,
  }
});
type Product = Static<typeof constrainToProduct>;

function demoValidation<T>(title: string, fn: () => T[]) {
  console.info(title.toUpperCase());
  try {
    const output = fn();
    console.info(...output);
  } catch (err) {
    if (err instanceof ValidationErrors) {
      console.error(JSON.stringify(err, null, 2));
    } else if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
  console.info('\n');
}


demoValidation('Constrained Values Demo', () => {
  const name = constrainToName('Product 1');
  const price = constrainToPrice(1.33);
  const product: Product = { name, price };
  return [product.name, product.price];
});

demoValidation('Constrained Object Demo', () => {
  const product: Product = constrainToProduct({ name: 'Product 1', price: 1.33 });
  return [product.name, product.price];
});

demoValidation('Constrained Array Demo', () => {
  const constrainToProducts = array(constrainToProduct);
  type Products = Static<typeof constrainToProducts>;
  const products: Products = constrainToProducts([
    constrainToProduct({ name: 'Product 1', price: 1.33 }),
    { name: constrainToName('Product 2'), price: constrainToPrice(1.33) },
    { name: 'Product 3', price: 1.334 },
  ]);
  return [products];
});

demoValidation('Constrained Dictionary Demo', () => {
  const constrainToProductDictionary = dictionary(
    string({ minLength: 1, maxLength: 2 }),
    constrainToProduct,
  );
  type ProductDictionary = Static<typeof constrainToProductDictionary>
  const productDictionary: ProductDictionary = constrainToProductDictionary({
    '1': constrainToProduct({ name: 'Product 1', price: 1.33 }),
    '2': { name: constrainToName('Product 2'), price: constrainToPrice(1.33) },
    '234': { name: '', price: 1.333 },
  });
  return [productDictionary];
});

demoValidation('Allow One Demo', () => {
  const constrainToStringOrBoolean = allowEither(unconstrainedString, unconstrainedBoolean);
  type StringOrBoolean = Static<typeof constrainToStringOrBoolean>;
  const stringOrBoolean: StringOrBoolean = constrainToStringOrBoolean(1);
  return [stringOrBoolean];
});

demoValidation('Constrained Enum Demo', () => {
  enum TrafficLight {
    Red,
    Orange,
    Green,
  };
  const constrainToTrafficLight = enumerated(TrafficLight);
  const trafficLight = constrainToTrafficLight(TrafficLight.Green);
  return [trafficLight];
});

demoValidation('Constrained Constant Demo', () => {
  const constrainToTen = constant(10);
  type Ten = Static<typeof constrainToTen>;
  const ten: Ten = constrainToTen(10);
  return [ten];
});

demoValidation('Compose Rules Demo', () => {
  const squareNumber = composeRules(unconstrainedNumber, (input) => {
    const isSquareNumber = input > 0 && Math.sqrt(input) % 1 === 0;
    if (!isSquareNumber) {
      throw new ValidationError('expected square number', input);
    }
    return input;
  });
  type SquareNumber = Static<typeof squareNumber>;
  const mySquareNumber: SquareNumber = squareNumber(4);
  return [mySquareNumber];
});
