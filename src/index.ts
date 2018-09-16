import ValidationErrors from './errors/ValidationErrors';
import always from './functions/always';
import either from './functions/either';
import hasArrayWhere from './functions/hasArrayWhere';
import hasBoolean from './functions/hasBoolean';
import hasInteger from './functions/hasInteger';
import hasLengthBetween from './functions/hasLengthBetween';
import hasNull from './functions/hasNull';
import hasNumber from './functions/hasNumber';
import hasObjectWhere from './functions/hasObjectWhere';
import hasString from './functions/hasString';
import hasUndefined from './functions/hasUndefined';
import hasValueBetween from './functions/hasValueBetween';
import hasValueMatching from './functions/hasValueMatching';
import optionally from './functions/optionally';
import validateData from './functions/validateData';

const myData = { y: { z: '' } };
const hasMyRule = hasObjectWhere({
  a: either([hasBoolean, hasUndefined]),
  b: optionally(hasArrayWhere(() => either([hasBoolean, hasNull]))),
  x: always([hasNumber, hasValueBetween(0, 1)]),
  y: hasObjectWhere({
    z: either([
      always([hasString, hasLengthBetween(0, 1)]),
      hasValueMatching(true),
      hasInteger,
    ]),
  }),
});

try {
  // You can change `myData` to `myData as any`, but TS will not throw type errors for `myData`.
  validateData(hasMyRule)(myData as any);
  console.log('Valid');
} catch (err) {
  if (err instanceof ValidationErrors) {
    // tslint:disable-next-line:no-console
    console.error(err.getMessage());
  }
}
