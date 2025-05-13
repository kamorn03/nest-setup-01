import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  MODE: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().required().default(8000),
  DATABASE_TYPE: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(54321).required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNC: Joi.boolean().default(false),
  HEADER_API_KEY: Joi.string().required(),
});
