const expect = require('chai').expect

const gifnoc = require('../../')

describe('invalid config', () => {
	it('should throw error', () => {
		const fn = () => gifnoc(__dirname)
		expect(fn).to.throw(SyntaxError)
	})
})
