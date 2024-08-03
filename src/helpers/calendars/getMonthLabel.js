import dayjs from "dayjs";

/**
 *
 * @param {Number} index
 * @returns {String}
 */

const getMonthLabel = index => dayjs().month(index).format("MMM");

export default getMonthLabel;
