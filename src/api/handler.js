'use strict'

const {initTracer} = require('./tracing')
let tracer

const updateDetails = (req, h) => {
  tracer = initTracer('tracing-tests')
  const span = tracer.startSpan('trace-payload')
  const ctx = {span}
  span.setTag('begin', req.payload.identityNumber)
  setTimeout(() => {
    updateMobile(ctx, req.payload)
  }, 1000)
  setTimeout(() => {
    updateEmail(ctx, req.payload)
  }, 2000)
  setTimeout(() => {
    span.finish()
    tracer.close()
  }, 3000)
  return h.response(req.payload)
}

const updateMobile = (ctx, payload) => {
  ctx = {
    span: tracer.startSpan('first-edit', {childOf: ctx.span}),
  }
  payload.mobile = '1238456889'
  ctx.span.log({
    event: 'mobile-update',
    value: payload,
  })
  ctx.span.finish()
}

const updateEmail = (ctx, payload) => {
  ctx = {
    span: tracer.startSpan('second-edit', {childOf: ctx.span}),
  }
  payload.email = 'test@test.com'
  ctx.span.log({
    event: 'email-update',
    value: payload
  })
  ctx.span.finish()
}

module.exports = {
  updateDetails
}