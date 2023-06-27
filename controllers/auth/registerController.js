const registerController = {
	//* Always remember to use this format (req, res, next)
	register(req, res, next) {
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

		res.json({ msg: 'Hello from express' });
	},
};

export default registerController;
