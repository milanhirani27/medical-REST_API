const Joi = require('@hapi/joi');
const { createErrorResponse } = require('../helper/errorhandler');

//login schema validation
var loginUserSchema = Joi.object().keys({
  email: Joi.string().label('email is required').required(),
  password: Joi.string().label('password is required').required(),
}).options({ abortEarly: false });

module.exports = {

  loginUser: async (req, res, next) => {
    const result = Joi.validate(req.body, loginUserSchema);
    if (result.error) {
      var error = {};
      var message = '';
      for (var i = 0; i < result.error.details.length; i++) {
        const key = result.error.details[i]['context'].key;
        error[`${key}`] = result.error.details[i]['context'].label;
        message = "please required below field"
      }
      return createErrorResponse(req, res, message, error, 422);
    } else {
      next()
    }
  }
}

