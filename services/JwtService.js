import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

class JwtService {
	static sign(payload, expiry = '60s', secret = JWT_SECRET) {
		return jwt.sign(payload, secret, { expiresIn: expiry });
	}

	static verify(payload, secret = JWT_SECRET) {
		return jwt.verify(payload, secret);
	}
}

export default JwtService;
