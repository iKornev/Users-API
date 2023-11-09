import * as Joi from 'joi';

const userAuthSchema = Joi.object({
  login: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

export { userAuthSchema };
