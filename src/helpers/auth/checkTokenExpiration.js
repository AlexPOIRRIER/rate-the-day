import dayjs from "dayjs";

import extractTokenPayload from "./extractTokenPayload";

/**
 * @param {String} token
 *
 * @returns {Promise<Boolean>} isExpired
 */
const checkTokenExpiration = async token => {
	const { exp } = await extractTokenPayload(token);
	const expirationDate = new Date(exp * 1000);

	const isExpired = dayjs().isAfter(dayjs(expirationDate));

	return isExpired;
};

export default checkTokenExpiration;
