import either from './functions/either';
import firstly from './functions/firstly';
import hasBoolean from './functions/hasBoolean';
import hasInteger from './functions/hasInteger';
import hasLengthBetween from './functions/hasLengthBetween';
import hasNumber from './functions/hasNumber';
import hasObjectWhere from './functions/hasObjectWhere';
import hasString from './functions/hasString';
import hasValueBetween from './functions/hasValueBetween';
import hasValueMatching from './functions/hasValueMatching';
import optionally from './functions/optionally';
import validateData from './functions/validateData';

const myData = { x: 10, y: { z: '' } };
const myRule = hasObjectWhere({
  a: optionally(hasBoolean),
  x: firstly(hasNumber, hasValueBetween(0, 1)),
  y: hasObjectWhere({
    z: either<string | number | boolean>(
      firstly(hasString, hasLengthBetween(0, 1)),
      hasValueMatching(true),
      hasInteger,
    ),
  }),
});

// If the `as any` is removed, TS will actually throw type errors
const myValidData = validateData(myRule)(myData);
const myValidX = myValidData.x; // Type is: number
const myValidZ = myValidData.y.z; // Type is: string | number | boolean.
