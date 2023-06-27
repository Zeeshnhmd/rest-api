import Joi from 'joi';

import CustomErrorHandler from '../../services/CustomErrorHandler';

const registerController = {
	//* Always remember to use this format (req, res, next)
	async register(req, res, next) {
		/**
		 * * Checklist
		 * validate the request
		 * authorise the request
		 * check if user is in the database already
		 * prepare model
		 * store in datebase
		 * generate jwt token
		 * send response
		 */

		//* Validate the request
		const registerSchema = Joi.object({
			name: Joi.string().min(3).max(30).required(),
			email: Joi.string().email().required(),
			password: Joi.string()
				.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
				.required(),
			repeat_password: Joi.ref('password'),
		});

		const { error } = registerSchema.validate(req.body);

		if (error) {
			return next(error);
		}

		//* check if user is in the database already
		try {
			const exist = await User.exists({ email: req.body.email });
			if (exist) {
				return next(
					CustomErrorHandler.alreadyExist('This email is already taken')
				);
			}
		} catch (err) {
			return next(err);
		}

		res.json({ msg: 'Hello from express' });
	},
};

export default registerController;
