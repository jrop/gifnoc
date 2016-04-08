const expect = require('chai').expect

const gifnoc = require('../../')

const oldENV = process.env.NODE_ENV

describe('config/index.js', () => {
	afterEach(() => {
		process.env.NODE_ENV = oldENV
	})

	it('should find index and dev config', () => {
		process.env.NODE_ENV = 'development'
		expect(gifnoc(__dirname)).to.deep.equal({
			test: 'Hello World',
			env: 'development!',
			other: 'goodbye world',
		})
	})
	it('should find index and prod config', () => {
		process.env.NODE_ENV = 'production'
		expect(gifnoc(__dirname)).to.deep.equal({
			test: 'Hello World',
			env: 'prod',
			another: 'testing in prod!',
		})
	})
	it('should not find bad env config', () => {
		process.env.NODE_ENV = 'no_file'
		expect(gifnoc(__dirname)).to.deep.equal({
			test: 'Hello World',
			env: 'default',
		})
	})
})
