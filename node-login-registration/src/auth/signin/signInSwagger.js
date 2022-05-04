/**
  * Created by Shivram on 01/03/2020
  * @name Sign In Swagger
  */

 module.exports = (swaggerJson) => {
    swaggerJson.paths['/user/signin'] = {
        'post': {
            'tags': [
                '01. Authentication'
            ],
            'description': 'Log in via email or username',
            'summary': 'Log in via email or username',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'authentication parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/usersignIn'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'You have successfully logged in.',
                    'schema': {
                        '$ref': '#/definitions/successRegister'
                    }
                },
                '400': {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorRegister'
                    }
                },
                '500': {
                    'description': 'Internal Server Error',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };


    swaggerJson.definitions.usersignIn = {
        'type': 'object',
        'properties': {
            'email': {
                'type': 'string',
                'example': 'test321@mailinator.com'
            },
            'password': {
                'type': 'string',
                'example': '3c7959e8355f19cb6c7a023e46099e5ea9ef23cc4c75675d153b366289fa1d1df18134229825b75064c6a4e86d97e3fa6ebaaed2c1da8c93500024c3c3f4ffd4'
            }
        }
    };

    swaggerJson.definitions.errorRegister = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': 'Sorry, you entered an incorrect email or password'
            }
        }
    };

    swaggerJson.definitions.unexpextedError = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': 'Something went wrong. Please try again'
            }
        }
    };
    swaggerJson.definitions.successRegister = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': 'You have successfully logged in.'
            }
        }
    };


    return swaggerJson;
};
