const boom    = require('boom')
    , User    = require('../models/user')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/auth',
    beforeHandler: fastify.auth([
      fastify.authenticate
    ]),
    handler: async (req, reply) => {
        reply.send(req.user)
    }
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

    }
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
            user.password = null;
            const token = fastify.jwt.sign({
                email: user.email
                , _id: user._id
                , role: user.role
              })
            return {token, user: user }
          } else {
            return {error:"Usuario o contraseña incorrecta"}
          }

        } else{
          return {error:"Usuario no existe"}
        }

      } catch (err) {
        throw boom.boomify(err)
      }
  }
  })

  next()
}
