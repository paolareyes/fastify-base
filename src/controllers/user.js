// External Dependancies
const boom    = require('boom')
    , User    = require('../models/user')
    , fastify = require('fastify')({ logger: true })

// Get all users
exports.get = async (req, reply) => {
  try {
    const users = await User.find()
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single user by ID
exports.getById = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new user
exports.create = async (req, reply) => {
  try {
    const user = new User(req.body)
    user.generateHash((err,result) => {
    if (err) {
      fastify.log.error('not able to hash password', err);
      throw boom.boomify(err)
      }
    })
    return user.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add default admin
exports.default = async (req, reply) => {
  var adminUser = new User({
    firstname   : 'Administrador',
    lastname    : 'A',
    email       : 'admin@admin.com',
    password    : 'Test.1234',
    role        : 0
  })

  try {
    adminUser.generateHash((err,result) => {
    if (err) {
      fastify.log.error('not able to hash password', err);
      throw boom.boomify(err)
      }
    })
    return adminUser.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing user
exports.update = async (req, reply) => {
  try {
    const id = req.params.id
    const user = req.body
    const { ...updateData } = user
    const update = await User.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a user
exports.delete = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndRemove(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}
