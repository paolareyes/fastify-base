const fastify = require('fastify')({ logger: true })
    , boom    = require('boom')
    , fp = require('fastify-plugin')

async function customJwtAuth(fastify, opts) {
  fastify
  .decorate("authenticate", async function(req, reply, done) {
    try {
      console.log('try');
      req.user = await fastify.jwt.verify(req.headers.authorization)
      done()
    } catch (err) {
      console.log('catch');
      reply.send('Usuario sin autorización')
      done()
    }
  })
}

module.exports = fp(customJwtAuth)
