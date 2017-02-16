const assert = require('assert')
const gifnoc = require('../index')
const path = require('path')

describe('config', function () {
	it('should load the development config', function () {
		assert.deepEqual(gifnoc(__dirname), {env: 'development'})
	})
	it('should load the production config', function () {
		const conf = gifnoc(__dirname, {env: 'production'})
		assert.deepEqual(conf, {env: 'production'})
	})
	it('should load the host config', function () {
		const conf = gifnoc(__dirname, {
			env: 'development',
			hostname: 'host',
		})
		assert.deepEqual(conf, {
			env: 'development',
			host: 'host',
		})
	})
	it('should load the user config', function () {
		const conf = gifnoc(__dirname, {
			env: 'development',
			username: 'user',
		})
		assert.deepEqual(conf, {
			env: 'development',
			user: 'user',
		})
	})
	it('should walk up', function () {
		const conf = gifnoc(__dirname + '/sub/dir/subsub', {env: 'development'})
		assert.deepEqual(conf, {env: 'development'})
	})
	it('should return undefined', function () {
		assert.deepEqual(gifnoc('/'), undefined)
	})
})
