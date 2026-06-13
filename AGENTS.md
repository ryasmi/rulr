## Setup

Keep the project setup similar to [ryasmi/baseroo](https://github.com/ryasmi/baseroo).

## Project Overview

Rulr is a TypeScript library for compile-time and runtime validation with a focus on type safety and unit conversion error protection. The library uses symbols to create branded types (nominal typing) that prevent unit conversion errors and ensure type safety beyond TypeScript's structural typing.

## Core Concepts

### Rules and Guards

- **Rules**: Functions that take unknown input and return validated, typed output or throw errors
- **Guards**: Type predicates that return true if input is valid (pattern: `is[Type]`)
- Convert rules to guards using `rulr.guard(rule)`

### Branded Types with Symbols

- Each constrained type uses a unique symbol for nominal typing
- Prevents accidental type mixing (e.g., mixing PositiveNumber with regular number)
- Pattern: `type TypeName = rulr.Constrained<typeof symbolName, BaseType>`

### Error Handling

- All custom errors extend `BaseError` from `make-error` package
- Validation errors should be descriptive: `Invalid[Type]Error`
- Use `ValidationErrors` for multiple errors from higher-order rules
- Use `KeyedValidationError` for object/array validation with path info

## File Organisation

```
src/
├── valueRules/          # Basic type validators (string, number, etc)
├── constrainedValues/   # Numeric constraints (positiveNumber, etc)
├── constrainedStrings/  # String format validators (email, url, etc)
├── higherOrderRules/    # Composite validators (object, array, union)
├── sanitizationRules/   # Input sanitizers (from strings to types)
├── ruleConstructors/    # Factory functions for creating rules
├── errors/              # Error classes
├── core.ts             # Core types and utilities
└── rulr.ts             # Main export file
```

## Creating New Rules

- Always export: symbol (if used), type, guard, rule, and error
- Place in the appropriate directory based on rule type
- Add tests covering valid and invalid cases (100% coverage required)
- Update the main export file (`rulr.ts`)

## Testing

- 100% line coverage required
- Use Jest with TypeScript (ts-jest)
- Tests use the `assert` module (not Jest matchers)
- Test both positive and negative cases including error types

## Git Workflow

- Follow conventional commits
- Semantic release for versioning
- All changes must pass linting, tests, and build
