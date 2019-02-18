const boom    = require('boom')
    , User    = require('../models/user')
    , Token   = require('../models/token')
    , fastify = require('fastify')({ logger: true })

// Get
