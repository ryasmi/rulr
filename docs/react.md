# React

[Back to root readme.md](../readme.md)

You can use parts of the JavaScript code below to create a `useRulr` hook in React which may be useful for validating form inputs. In future it's hoped to create a `react-rulr` package written in TypeScript that comes with this hook or something similar.

```jsx
import React from 'react'
import * as rulr from 'rulr'

function getRulrState(rule, input) {
	try {
		const output = rule(input)
		const error = undefined
		return { input, output, error }
	} catch (error) {
		const output = undefined
		return { input, output, error }
	}
}

function useRulr(rule, initialInput = undefined) {
	const initialState = getRulrState(rule, initialInput)
	const [input, setInput] = React.useState(initialState.input)
	const [error, setError] = React.useState(initialState.error)
	const [output, setOutput] = React.useState(initialState.output)
	const setState = (input) => {
		const nextState = getRulrState(rule, input)
		setInput(nextState.input)
		setError(nextState.error)
		setOutput(nextState.output)
	}
	if (error === undefined) {
		return [output, setState, error]
	} else {
		return [input, setState, error]
	}
}

function App() {
	const [email, setEmail, emailError] = useRulr(rulr.email)
	return (
		<div>
			<h1>Hello {email}</h1>
			<input
				value={email}
				onChange={(e) => {
					setEmail(e.target.value)
				}}
			/>
			{emailError !== undefined && <p style={{ color: 'red' }}>{emailError.message}</p>}
		</div>
	)
}
```

Note that it's also possible to use rules in place of PropTypes where appropriate as shown by the JavaScript code below.

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import * as rulr from 'rulr'

export function EmailInput(props) {
	return (
		<input
			value={props.email}
			onChange={(e) => {
				props.setEmail(e.target.value)
			}}
		/>
	)
}

EmailInput.propTypes = {
	email: rulr.email,
	setEmail: PropTypes.func,
}
```
