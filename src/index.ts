import Boolean from './Boolean';
import Collection from './Collection';
import Constant from './Constant';
import Integer from './Integer';
import Null from './Null';
import Number from './Number';
import Optional from './Optional';
import Record from './Record';
import String from './String';
import Undefined from './Undefined';
import Union from './Union';
import validateData from './validateData';
import ValidationErrors from './ValidationErrors';

// tslint:disable-next-line:variable-name
const MyRecord = Record({
  a: Union([Boolean, Undefined]),
  b: Optional(Collection(Union([Boolean, Null]))),
  x: Number(0, 1),
  y: Record({
    z: Union([String(0, 1), Constant(true), Integer()]),
  }),
});

try {
  const myData = { y: { z: '' }, x: 1 };
  const myRecord = validateData(MyRecord)(myData);
  // tslint:disable-next-line:no-console
  console.log(myRecord);
} catch (err) {
  if (err instanceof ValidationErrors) {
    // tslint:disable-next-line:no-console
    console.error(err.getMessage());
  }
}
