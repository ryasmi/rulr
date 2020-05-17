# rulr

> Provides rules that take data and return an array of all the validation errors.

### Usage

Install with `npm i rulr` and start with an [example](./src/examples/example.ts).

### Todos

- [ ] Change constrainedObject to unconstrainedObject.
- [ ] Change constrainedArray to unconstrainedArray.
- [ ] Allow constraints in options object on primitives.
- [ ] Delete `composeRules` to be replaced by constraints option.

### Notes
Adding constraint option to string should allow pattern matching to be handled in there instead, that way we can define an error per pattern for better translations.
