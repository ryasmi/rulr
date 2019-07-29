import Integer from 'rulr/constraints/Integer';
import NumberRange from 'rulr/constraints/NumberRange';
import Collection from 'rulr/generics/Collection';
import Constant from 'rulr/generics/Constant';
import Intersection from 'rulr/generics/Intersection';
import Optional from 'rulr/generics/Optional';
import Record, { Static } from 'rulr/generics/Record';
import Union from 'rulr/generics/Union';
import Boolean from 'rulr/primitives/Boolean';
import Null from 'rulr/primitives/Null';
import Number from 'rulr/primitives/Number';
import String from 'rulr/primitives/String';
import Undefined from 'rulr/primitives/Undefined';
import validateData from 'rulr/validateData';
import ValidationErrors from 'rulr/ValidationErrors';

const validateMyRecord = Record({
  a: Union([Boolean, Undefined]),
  b: Optional(Collection(Union([Boolean, Null, Undefined]))),
  // c: Integer,
  x: Number,
  y: Record({
    z: Union([String, Constant(true), Intersection([Integer, NumberRange(0, 1)])]),
  }),
});
type MyRecord = Static<typeof validateMyRecord>;

try {
  const myData = { a: false, y: { z: '' }, x: 1 };
  const myValidatedRecord: MyRecord = validateData(validateMyRecord)(myData);
  const myUnvalidatedRecord: MyRecord = myData;
  // tslint:disable-next-line:no-console
  console.log(myValidatedRecord, myUnvalidatedRecord);
} catch (err) {
  if (err instanceof ValidationErrors) {
    // tslint:disable-next-line:no-console
    console.error(err.getMessage());
  }
}
