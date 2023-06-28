import Joi from 'joi';
import bcrypt from 'bcrypt';

import { User } from '../../models';
import { CustomerErrorHandler, JwtService } from '../../services';

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
					CustomerErrorHandler.alreadyExist('This email is already taken')
				);
			}
		} catch (err) {
			return next(err);
		}

		const { name, email, password } = req.body;

		//* hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		//* prepare the model

		const user = new User({
			name,
			email,
			password: hashedPassword,
		});

		let access_token;
		try {
			const result = await user.save();
			console.log(result);
			//* Token
			access_token = JwtService.sign({
				_id: result._id,
				role: result.role,
			});
		} catch (err) {
			return next(err);
		}

		res.json({ access_token: access_token });
	},
};

export default registerController;
