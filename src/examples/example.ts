import Boolean from 'rulr/Boolean';
import Collection from 'rulr/Collection';
import Constant from 'rulr/Constant';
import Integer from 'rulr/Integer';
import Null from 'rulr/Null';
import Number from 'rulr/Number';
import Optional from 'rulr/Optional';
import Record from 'rulr/Record';
import String from 'rulr/String';
import Undefined from 'rulr/Undefined';
import Union from 'rulr/Union';
import validateData from 'rulr/validateData';
import ValidationErrors from 'rulr/ValidationErrors';

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
