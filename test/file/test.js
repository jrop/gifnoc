const expect = require('chai').expect
const path = require('path')

const gifnoc = require('../../')

const oldENV = process.env.NODE_ENV

const config = {
	message: 'Just another config file',
	return: 0,
}

describe('config.js', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'development'
	})
	afterEach(() => {
		process.env.NODE_ENV = oldENV
		gifnoc.cache = { }
	})

	it('should find config and not env', () => {
		expect(gifnoc(__dirname)).to.deep.equal(config)
	})

	it('should cache the config', () => {
		gifnoc(__dirname) // add to cache
		expect(gifnoc.cache).to.deep.equal({
			[__dirname]: config,
		})
	})

	it('should cache the config twice', () => {
		gifnoc(__dirname) // add to cache
		gifnoc(path.join(__dirname, 'nested')) // add to cache again
		expect(gifnoc.cache).to.deep.equal({
			[__dirname]: config,
			[path.join(__dirname, 'nested')]: config,
		})
	})
})
