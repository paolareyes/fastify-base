// Require the framework and instantiate it
const fastify   = require('fastify')({ logger: true })
    , config    = require('config')
    , appconfig = config.get('app')
    , dbconfig  = config.get('db')
    , mongoose  = require('mongoose')
    , swagger   = require('../config/swagger')
    , customJwtAuth = require('./plugin/auth')

fastify.register(require('fastify-jwt'), {
        secret: 'ts.2019'
      })
// Register Swagger
      .register(require('fastify-swagger'), swagger.options)
      .register(require('fastify-auth'))
      .register(customJwtAuth)

// Connect to DB
mongoose.connect('mongodb://localhost/' + dbconfig.name)
 .then(() => console.log('MongoDB connected to ' + dbconfig.name))
 .catch(err => console.log(err))


 //Register routes
 fastify.register(
  require('./routes/user.js'),
  { prefix: '/api' }
)
/*
fastify.get('/signup', (req, reply) => {
  // authenticate the user.. are valid the credentials?
  const token = fastify.jwt.sign({ hello: 'world' })
  reply.send({ token })
})
fastify.get('/', (req, reply) => {
  reply.send("Holi")
})*/

// Run the server!
const start = async () => {
  try {
    await fastify.listen(appconfig.port)
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
