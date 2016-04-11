const expect = require('chai').expect
const path = require('path')

const gifnoc = require('../../../')

const oldENV = process.env.NODE_ENV

const config = {
	message: 'Just another config file',
	return: 0,
}

function expectCache() {
	gifnoc(__dirname)
	expect(gifnoc.cache).to.deep.equal({
		[__dirname]: config,
	})
}

describe('../config.js', () => {
	beforeEach(() => {
		gifnoc.cache = { }
	})
	afterEach(() => {
		process.env.NODE_ENV = oldENV
	})

	it('should look up to find config', () => {
		process.env.NODE_ENV = 'development'
		expect(gifnoc(__dirname)).to.deep.equal(config)
	})

	it('should cache the config once', () => {
		expectCache()
		expectCache()
	})

	it('should not require a cached config', () => {
		expectCache()

		const configPath = path.resolve(__dirname, '../config.json')
		const cachedRequire = require.cache[configPath]

		cachedRequire.exports.return = 42

		expectCache()

		cachedRequire.exports.return = 0
	})

	it('should contain a modified cache', () => {
		expectCache()

		gifnoc.cache[__dirname].return = 9000

		expect(gifnoc(__dirname)).to.deep.equal({
			message: config.message,
			return: 9000,
		})
	})
})
