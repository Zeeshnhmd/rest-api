import Joi from "joi";
import bcrypt from "bcrypt";

import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { JwtService } from "../../services";

const loginController = {
	async login(req, res, next) {
		//* Validation

		const loginShema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string()
				.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
				.required(),
		});

		const { error } = loginShema.validate(req.body);

		if (error) {
			return next(error);
		}

		//* check if user is in the database
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return next(CustomErrorHandler.wrongCredentials());
			}

			//* Compare password
			const matchPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);

			if (!matchPassword) {
				return next(CustomErrorHandler.wrongCredentials());
			}

			//* If password matched generate the token
			const access_token = JwtService.sign({
				_id: user._id,
				role: user.role,
			});
			res.json({ access_token });
		} catch (err) {
			return next(err);
		}
	},
};

export default loginController;
