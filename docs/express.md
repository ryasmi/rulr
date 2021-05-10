# Express

[Back to root readme.md](../readme.md)

The JavaScript code below demonstrates how you might use Rulr for validating requests.

```ts
import express from 'express'
import * as rulr from 'rulr'

const app = express()
const port = 3000

const example = rulr.object({
	required: {
		price: rulr.positiveNumber,
	},
})

app.post('/echo-valid-price', (req, res) => {
	try {
		const body = example(req.body)
		res.status(200).send(body.price)
	} catch (err) {
		res.status(400).send(err.message)
	}
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
```
