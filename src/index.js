'use strict'

const Routes = require('./routes')
const Setup = require('./server')

module.exports = Setup.initialize({
  service: 'api',
  port: 3000,
  modules: [Routes]
})
