# Express

[Back to root readme.md](../readme.md)

The JavaScript code below demonstrates how you might use Rulr for validating requests.

```ts
import express from 'express'
import * as rulr from 'rulr'

const app = express()
const port = 3000

const addToPriceHeaders = rulr.object({
	required: {
		'content-type': rulr.constant(Symbol(), 'application/json'),
	},
})

const addToPriceQuery = rulr.object({
	required: {
		priceToAdd: rulr.sanitizeNumberAsString(rulr.positiveNumber),
	},
})

const addToPriceBody = rulr.object({
	required: {
		originalPrice: rulr.positiveNumber,
	},
})

app.post('/add-to-price', (req, res) => {
	try {
		const headers = echoValidPriceHeaders(req.headers)
		const query = addToPriceQuery(req.query)
		const body = addToPriceBody(req.body)
		res.status(200).send(body.originalPrice + query.priceToAdd)
	} catch (err) {
		res.status(400).send(err.message)
	}
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
```
