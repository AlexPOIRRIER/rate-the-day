import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";

dayjs.extend(dayOfYear);

/**
 *
 * @param {String} userId
 * @returns {Object}
 */

const generateNewCalendar = userId => {
	const monthsInYear = 12;
	const currentYear = dayjs().year();

	const newCalendar = {
		userId,
		creationDate: new Date(),
		year: currentYear,
		months: [],
	};

	for (let i = 0; i < monthsInYear; i += 1) {
		const daysInMonth = dayjs(
			`${currentYear}-${(i + 1).toString().padStart(2, "0")}-10`
		).daysInMonth();

		const monthData = {
			index: i,
			label: dayjs().month(i).format("MMMM").toLowerCase(),
			days: [],
		};

		for (let j = 1; j <= daysInMonth; j += 1) {
			monthData.days.push({
				index: j,
				notation: null,
				comment: null,
			});
		}
		newCalendar.months.push(monthData);
	}

	return newCalendar;
};

export default generateNewCalendar;
