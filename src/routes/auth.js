const boom    = require('boom')
    , User    = require('../models/user')
    // Import Swagger documentation
    , documentation = require('./documentation/authApi')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/auth',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: async (req, reply) => {
        reply.send(req.user)
    },
    schema: documentation.getCurrentUser
  })

  fastify.route({
    method: 'PUT',
    url: '/auth',
    handler: async function (req, reply) {
      try{
        const newUser = new User( req.body )
        newUser.generateHash((err,result) => {
          if (err) {
            fastify.log.error('not able to hash password', err)
            throw boom.boomify(err)
          }
        })
        return newUser.save()
      } catch (err){
        throw boom.boomify(err)
      }

    },
    schema: documentation.signUpUser
  })

  fastify.route({
    method: 'POST',
    url: '/auth',
    handler: async function (req, reply) {
      const email = req.body.email
      try {
        const user = await User.findOne({email: email, active: true})
        if(user){
          if(user.validPassword(req.body.password, user.password)){
            const token = fastify.jwt.sign({
                email: user.email
                , _id: user._id
                , role: user.role
              })
              reply
                   .code(200)
                   .send({ token: token, user: user })
          } else {
            return {error:"Usuario o contraseña incorrecta"}
          }

        } else{
          return {error:"Usuario no existe"}
        }

      } catch (err) {
        throw boom.boomify(err)
      }
  },
  schema: documentation.signInUser
  })

  next()
}
