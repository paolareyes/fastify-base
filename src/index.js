// Require the framework and instantiate it
const fastify   = require('fastify')({ logger: true })
    , config    = require('config')
    , appconfig = config.get('app')
    , dbconfig  = config.get('db')
    , mongoose  = require('mongoose')
    , routes    = require('./routes')
    , swagger   = require('../config/swagger')


// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

// Connect to DB
mongoose.connect('mongodb://localhost/' + dbconfig.name)
 .then(() => console.log('MongoDB connected to ' + dbconfig.name))
 .catch(err => console.log(err))

 // Loop over each route
 routes.forEach((route, index) => {
   fastify.route(route)
 })

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
