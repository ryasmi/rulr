import * as assert from 'assert'
import { iri, IRI, InvalidIRIError } from '../../rulr'

function testInputIsValid(input: unknown, description: string) {
	test(description, () => {
		const output: IRI = iri(input)
		assert.strictEqual(output, input)
	})
}

function testInputIsInvalid(input: unknown, description: string) {
	test(description, () => {
		assert.throws(() => iri(input), InvalidIRIError)
	})
}

testInputIsInvalid(0, 'iri should not allow invalid string input')

testInputIsInvalid('http', 'iri should not allow protocol only')
testInputIsValid('http://www.example.com', 'iri should allow valid IRI')

// https://mathiasbynens.be/demo/url-regex
testInputIsValid('http://fo-o.com/blah_blah_(wikipedia)#cite-1', 'iri should allow anchor')
testInputIsValid('https://www.example.com/foo/?bar=b%20az&inga=42&quux', 'iri should allow query')
testInputIsValid('http://userid:password@example.com:8080/', 'iri should allow port')
testInputIsValid('http://userid:password@example.com/', 'iri should allow missing port')
testInputIsValid('http://142.42.1.1:8080/', 'iri should allow IP')
testInputIsValid('http://foo.com/unicode_(✪)_in_parens', 'iri should allow unicode in parens')
testInputIsValid('http://foo.com/(something)?after=parens', 'iri should allow query after parens')
testInputIsValid('http://code.google.com/events/#&product=browser', 'iri should allow #&')
testInputIsValid('ftp://foo.bar/baz', 'iri should allow ftp')
testInputIsValid('http://⌘➡例子.测试✪उदाहरण.परीकإختبار/䨹', 'iri should allow special characters')
testInputIsValid("http://-.~_!$&'()*+,;=:%40:80%2f::@example.com", 'iri should allow non letters')
testInputIsValid('http://www.example.com/fgdfgd?a#a', 'iri should allow hash in query')

testInputIsValid(
	'http://some.large.test.string.for.regex/some-large-string/string.html?largeString=largeString&someStrangeText=%D0%9F%D1%81%D0%B5%D0%B2%D0%B4%D0%BE%D1%82%D1%83%D0%B1%D0%B5%D1%80%D0%BA%D1%83%D0%BB%D0%B5%D0%B7',
	'iri should allow large text'
)
testInputIsValid(
	'https://some.strange.test/tests/very-strange-test-that-hangs-regex/test#test/test"',
	'iri should not hang in regex test'
)

// Tests from the xAPI conformance suite.
testInputIsInvalid('ab=c://should.fail.com', 'iri should not allow invalid protocol')
testInputIsInvalid('not.a.valid.iri.com/verb', 'iri should not allow missing protocol')

// LL-472
testInputIsValid('urn:071b8229-c909-5d6f-b250-8cbb6f36fda7:Test:Test_0', 'iri should allow URN')
testInputIsValid('urn:uuid:a4942cbb-aabf-526f-8f69-379f265416b5', 'iri should allow UUID URN')
