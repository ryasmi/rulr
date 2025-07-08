# GitHub Copilot Instructions for Rulr

## Project Overview

Rulr is a TypeScript library for compile-time and runtime validation with a focus on type safety and unit conversion error protection. The library uses symbols to create branded types (nominal typing) that prevent unit conversion errors and ensure type safety beyond TypeScript's structural typing.

## Core Concepts

### 1. Rules and Guards
- **Rules**: Functions that take unknown input and return validated, typed output or throw errors
- **Guards**: Type predicates that return true if input is valid (pattern: `is[Type]`)
- Convert rules to guards using `rulr.guard(rule)`

### 2. Branded Types with Symbols
- Each constrained type uses a unique symbol for nominal typing
- Prevents accidental type mixing (e.g., mixing PositiveNumber with regular number)
- Pattern: `type TypeName = rulr.Constrained<typeof symbolName, BaseType>`

### 3. Error Handling
- All custom errors extend `BaseError` from `make-error` package
- Validation errors should be descriptive: `Invalid[Type]Error`
- Use `ValidationErrors` for multiple errors from higher-order rules
- Use `KeyedValidationError` for object/array validation with path info

## Code Style Guidelines

### TypeScript Patterns
```typescript
// 1. Import pattern - always from relative paths
import * as rulr from '../../rulr'  // Use centralized export
import { specificRule } from './specificRule'

// 2. Symbol and type definition pattern
const typeSymbol = Symbol()
export type TypeName = rulr.Constrained<typeof typeSymbol, BaseType>

// 3. Guard function pattern
export function isTypeName(input: unknown): input is TypeName {
    // Validation logic
    return typeof input === 'string' && someValidation(input)
}

// 4. Rule function pattern
export function typeName(input: unknown): TypeName {
    if (isTypeName(input)) {
        return input
    }
    throw new InvalidTypeNameError(input)
}

// 5. Error class pattern
export class InvalidTypeNameError extends BaseError {
    public constructor(public readonly input: unknown) {
        super('Expected TypeName')
    }
}
```

### Testing Patterns
```typescript
// Use Jest with assert module
import * as assert from 'assert'
import { ruleName, InvalidRuleNameError } from '../../rulr'

test('ruleName should allow valid input', () => {
    const input = 'valid'
    const output: TypeName = ruleName(input)
    assert.strictEqual(output, input)
})

test('ruleName should error for invalid input', () => {
    assert.throws(() => ruleName('invalid'), InvalidRuleNameError)
})
```

### File Organization
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

## Best Practices

### 1. Creating New Rules
- Always export: symbol (if used), type, guard, rule, and error
- Place in appropriate directory based on rule type
- Add comprehensive tests covering valid and invalid cases
- Update main export file (`rulr.ts`)
- Add documentation with examples

### 2. Higher-Order Rules
- Accept sub-rules as parameters
- Collect all validation errors, don't stop at first error
- Use `KeyedValidationError` for clear error paths
- Example: `object`, `array`, `union`

### 3. Documentation
- Each rule should have a readme.md with examples
- Show both compile-time and runtime usage
- Explain differences from similar rules
- Include edge cases and gotchas

### 4. Error Messages
- Be specific about what was expected
- Include the invalid input when helpful
- For constrained types, specify the constraint violated
- Keep messages concise but informative

### 5. Performance Considerations
- Guards should be efficient - they may be called multiple times
- Avoid expensive operations in type guards
- For regex-based rules, consider using `regexRuleConstructor`

## Common Patterns to Follow

### Object Validation
```typescript
const schema = rulr.object({
    required: {
        id: rulr.positiveInteger,
        email: rulr.email
    },
    optional: {
        name: rulr.string
    }
})
```

### Union Types
```typescript
const stringOrNumber = rulr.union(rulr.string, rulr.number)
```

### Array Validation
```typescript
const numbers = rulr.array(rulr.number)
```

### Custom Constraints
```typescript
const constraint = rulr.constant(Symbol(), 'CONSTANT_VALUE')
```

## Code Formatting
- Use tabs (not spaces) for indentation
- Tab width: 2
- Use single quotes for strings
- No semicolons at end of statements
- Arrow functions with parentheses: `(param) => result`
- Trailing commas in multi-line structures

## Dependencies
- `atob`: For base64 decoding
- `make-error`: For error class creation
- `validator`: For string validation (email, URL, etc.)

## Testing Requirements
- 100% code coverage required
- Use Jest with TypeScript
- Tests must use `assert` module
- Test both positive and negative cases
- Test error types, not just that errors are thrown

## Module System
- Use ES modules for source code
- Build outputs multiple formats (CJS, ESM, UMD)
- Main export through `rulr.ts` for tree-shaking

## Git Workflow
- Follow conventional commits
- Semantic release for versioning
- All changes must pass linting and tests
- Husky for pre-commit hooks

## When Using Copilot

1. **For new rules**: Follow existing patterns in similar rules
2. **For tests**: Cover edge cases and maintain 100% coverage
3. **For errors**: Extend BaseError and follow naming convention
4. **For documentation**: Include practical examples
5. **For imports**: Always use relative paths and import from rulr.ts when possible

Remember: The goal is type safety at compile-time AND runtime with clear, helpful error messages.
