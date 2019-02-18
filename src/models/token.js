const fastify = require('fastify')
    , fastify.register(require('fastify-jwt'), {
        secret: 'ts.2019'
      })

exports.sign = function(user) {
  return fastify.jwt.sign({
    email: user.email
  , _id  : user._id
  , role : user.role
  })
}
