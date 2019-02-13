// Import our Controllers
const userController = require('./controllers/User')

const routes = [
  {
    method: 'GET',
    url: '/api/users',
    handler: userController.get
  },
  {
    method: 'GET',
    url: '/api/users/:id',
    handler: userController.getById
  },
  {
    method: 'POST',
    url: '/api/users',
    handler: userController.create
  },
  {
    method: 'PUT',
    url: '/api/users/:id',
    handler: userController.update
  },
  {
    method: 'DELETE',
    url: '/api/users/:id',
    handler: userController.delete
  },
  {
    method: 'POST',
    url: '/api/users/default',
    handler: userController.default
  }
]

module.exports = routes
