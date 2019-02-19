//import controllers
const userController = require('../controllers/user')

// Import Swagger documentation
    , documentation = require('./documentation/userApi')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/users',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.get,
    schema: documentation.getUsersSchema
  })

  fastify.route({
    method: 'GET',
    url: '/users/:id',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.getById,
    schema: documentation.getUserSchema
  })

  fastify.route({
    method: 'POST',
    url: '/users',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.create,
    schema: documentation.createUserSchema
  })

  fastify.route({
    method: 'PUT',
    url: '/users/:id',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.update,
    schema: documentation.updateUserSchema
  })

  fastify.route({
    method: 'DELETE',
    url: '/users/:id',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: userController.delete,
    schema: documentation.deleteUserSchema
  })

  fastify.route({
    method: 'GET',
    url: '/users/default',
    handler: userController.default
  })


  next()
}
