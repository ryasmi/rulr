import ValidationErrors from './errors/ValidationErrors';
import Boolean from './functions/Boolean';
import Collection from './functions/Collection';
import Constant from './functions/Constant';
import Integer from './functions/Integer';
import Null from './functions/Null';
import Number from './functions/Number';
import Optional from './functions/Optional';
import Record from './functions/Record';
import String from './functions/String';
import Undefined from './functions/Undefined';
import Union from './functions/Union';
import validateData from './functions/validateData';

const myData = { y: { z: '' }, x: 1 };
const hasMyRule = Record({
  a: Union([Boolean, Undefined]),
  b: Optional(Collection(() => Union([Boolean, Null]))),
  x: Number(0, 1),
  y: Record({
    z: Union([String(0, 1), Constant(true), Integer()]),
  }),
});

try {
  validateData(hasMyRule)(myData);
} catch (err) {
  if (err instanceof ValidationErrors) {
    // tslint:disable-next-line:no-console
    console.error(err.getMessage());
  }
}
