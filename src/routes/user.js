const userController = require('../controllers/user')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/users',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.get
  })

  fastify.route({
    method: 'GET',
    url: '/users/:id',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.getById
  })

  fastify.route({
    method: 'POST',
    url: '/users',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.create
  })

  fastify.route({
    method: 'PUT',
    url: '/users/:id',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.update
  })

  fastify.route({
    method: 'DELETE',
    url: '/users/:id',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.delete
  })

  fastify.route({
    method: 'GET',
    url: '/users/default',
    handler: userController.default
  })


  next()
}
