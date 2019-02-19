exports.getCurrentUser = {
  description: 'Get current user by token',
  tags: ['auth'],
  summary: 'Get current user by token ',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id:   { type: 'string' },
        email: { type: 'string' },
        role:  { type: 'number' },
        iat:   { type: 'number' }
      }
    }
  }
}

exports.signUpUser = {
  description: 'Sign up user',
  tags: ['auth'],
  summary: 'Sign up user ',
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
      properties : {
        _id:          { type: 'string' },
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

exports.signInUser = {
  description: 'Sign In user and retrieve token',
  tags: ['auth'],
  summary: 'Sign In user and retrieve token ',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        token:        { type: 'string' },
        user: {
          type : 'object',
          properties : {
            _id:          { type: 'string' },
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
  }
}
