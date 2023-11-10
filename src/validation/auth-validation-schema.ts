import * as Joi from 'joi';

const userAuthSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
}).required().unknown(false);

export { userAuthSchema };
