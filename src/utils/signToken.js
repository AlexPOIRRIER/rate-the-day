import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

/**
 *
 * @param {Object} params
 * * @param {String} params._id
 * * @param {String} params.username
 * * @param {String} params.email
 * @returns
 */

const signToken = ({ _id, username, email }) =>
	jwt.sign({ user: { _id, username, email } }, JWT_SECRET, {
		expiresIn: 60 * 60 * 24 * 365, //	1 year
	});

export default signToken;
