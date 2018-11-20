require('mocha-sinon')
const jsdom = require('mocha-jsdom')
const expect = require('chai').expect
var MockAdapter = require('axios-mock-adapter')

const axios = require('axios')
const Server = require('../src/js/common/Server').default
const Cookies = require('../src/js/common/Cookies').default
const queryParams = require('../src/js/common/QueryParams').default

const assertTokenIs = (token) => {
    expect(axios.defaults.headers.common['Authorization']).to.eq(token)
}

describe('Authorization', () => {

    jsdom({
        url: 'http://localhost'
    })

    beforeEach(() => {
        var mock = new MockAdapter(axios)
        mock.onGet('/authorization').reply(200)
    })

    afterEach(() => {
        // Reset the authorization token
        delete axios.defaults.headers.common['Authorization']
        Server.serverInstance = null
    })

    it('Receives auth token from query parameter', function() {

        const queryHas = this.sinon.stub(queryParams, 'has').returns(true)
        const queryGet = this.sinon.stub(queryParams, 'get').returns('TokenTestFromQuery')

        Server.newInstance().json('/authorization')

        this.sinon.assert.calledWith(queryHas, 'auth')
        this.sinon.assert.calledWith(queryGet, 'auth')
        assertTokenIs('Bearer TokenTestFromQuery')
    })

    it('Receives auth token from cookie', function() {

        const cookieSpy = this.sinon.stub(Cookies, 'get').returns('TokenTestFromCookie')

        Server.newInstance().json('/authorization')
        
        this.sinon.assert.calledWith(cookieSpy, 'enketo_token')
        assertTokenIs('Bearer TokenTestFromCookie')
    })
})
