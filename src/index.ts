import either from './functions/either';
import firstly from './functions/firstly';
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

const myData = { a: true, b: [true], x: 10, y: { z: '' } };
const myRule = hasObjectWhere({
  a: either([hasBoolean, hasUndefined]),
  b: optionally(hasArrayWhere(() => either([hasBoolean, hasNull]))),
  x: firstly([hasNumber, hasValueBetween(0, 1)]),
  y: hasObjectWhere({
    z: either([
      firstly([hasString, hasLengthBetween(0, 1)]),
      hasValueMatching(true),
      hasInteger,
    ]),
  }),
});

// You can change `myData` to `myData as any`, but TS will not throw type errors for `myData`.
const myValidData = validateData(myRule)(myData);
const myValidA = myValidData.a; // Type is: boolean | undefined.
const myValidB = myValidData.b; // Type is: (boolean | null)[] | undefined.
const myValidX = myValidData.x; // Type is: number.
const myValidZ = myValidData.y.z; // Type is: string | number | boolean.
