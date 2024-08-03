import { ObjectId } from "mongodb";
import bcryptjs from "bcryptjs";

import db from "@/database";

import signToken from "@/utils/signToken";
import generateNewCalendar from "@/helpers/calendars/generateNewCalendar";

const login = async data => {
	if (!data) {
		throw new Error("[services/loginUser] - No data provided");
	}

	const user = await db
		.collection("users")
		.findOne({ username: data.username });

	if (!user) {
		throw new Error("[services/loginUser] - User not found");
	}

	const match = await bcryptjs.compare(data.password, user.password);

	if (!match) {
		throw new Error("[services/loginUser] - Invalid password");
	}

	const { _id, username, email } = user;

	const token = signToken({ _id, username, email });

	return { token };
};

const register = async data => {
	if (!data) {
		throw new Error("[services/registerUser] - No data provided");
	}

	const { email, username, password } = data;

	const hash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

	const userId = new ObjectId().toString();
	const calendarId = new ObjectId().toString();

	await db.collection("users").insertOne({
		_id: userId,
		email,
		username,
		password: hash,
		creationDate: new Date(),
	});

	const token = signToken({ _id: userId, username, email });

	const calendar = generateNewCalendar(userId);

	await db.collection("calendars").insertOne({ ...calendar, _id: calendarId });

	return { token };
};

export default { login, register };
