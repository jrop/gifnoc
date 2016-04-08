const expect = require('chai').expect

const gifnoc = require('../../../')

const oldENV = process.env.NODE_ENV

describe('../config.js', () => {
	afterEach(() => {
		process.env.NODE_ENV = oldENV
	})

	it('should look up to find config', () => {
		process.env.NODE_ENV = 'development'
		expect(gifnoc(__dirname)).to.deep.equal({
			message: 'Just another config file',
			return: 0,
		})
	})
})
