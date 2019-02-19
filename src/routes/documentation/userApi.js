exports.getUsersSchema = {
  description: 'Get users',
  tags: ['users'],
  summary: 'Get all users ',
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id:          { type: 'string' },
          firstname:    { type: 'string' },
          lastname:     { type: 'string' },
          email:        { type: 'string' },
          role:         { type: 'number' },
          active:       { type: 'boolean' },
          created_date: { type: 'string' },
          __v:          { type: 'number' }
        }
      }
    }
  }
}

exports.getUserSchema = {
  description: 'Get user',
  tags: ['users'],
  summary: 'Get user by id',
  body: {
    type: 'string',
    properties: {
      _id:    { type: 'string' }
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id:          { type: 'string' },
        firstname:    { type: 'string' },
        lastname:     { type: 'string' },
        email:        { type: 'string' },
        role:         { type: 'number' },
        active:       { type: 'boolean' },
        created_date: { type: 'string' },
        __v:          { type: 'number' }
      }
    }
  }
}

exports.createUserSchema = {
  description: 'Create a new user',
  tags: ['users'],
  summary: 'Creates new user with given values',
  body: {
    type: 'object',
    properties: {
      firstname:    { type: 'string' },
      lastname:     { type: 'string' },
      email:        { type: 'string' },
      password:     { type: 'string' },
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        firstname:    { type: 'string' },
        lastname:     { type: 'string' },
        email:        { type: 'string' },
        role:         { type: 'number' },
        created_date: { type: 'string' },
        __v:          { type: 'number' }
      }
    }
  }
}

exports.updateUserSchema = {
  description: 'Update user',
  tags: ['users'],
  summary: 'Updates user with given values',
  params: {
     type: 'object',
     properties: {
       id: {
         type: 'string',
         description: 'user id'
       }
     }
   },
  body: {
    type: 'object',
    properties: {
      firstname:    { type: 'string' },
      lastname:     { type: 'string' },
      email:        { type: 'string' },
      password:     { type: 'string' },
      role:         { type: 'number' },
      active:       { type: 'boolean'}
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id:          { type: 'string' },
        firstname:    { type: 'string' },
        lastname:     { type: 'string' },
        email:        { type: 'string' },
        role:         { type: 'number' },
        active:       { type: 'boolean'},
        created_date: { type: 'string' },
        __v:          { type: 'number' }
      }
    }
  }
}

exports.deleteUserSchema = {
  description: 'Delete user',
  tags: ['users'],
  summary: 'Deletes user by ID',
  params: {
     type: 'object',
     properties: {
       id: {
         type: 'string',
         description: 'user id'
       }
     }
   },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id:          { type: 'string' },
        firstname:    { type: 'string' },
        lastname:     { type: 'string' },
        email:        { type: 'string' },
        role:         { type: 'number' },
        active:       { type: 'boolean'},
        created_date: { type: 'string' },
        __v:          { type: 'number' }
      }
    }
  }
}
