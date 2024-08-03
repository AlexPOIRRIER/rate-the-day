import clientPromise from "./mongodb";

const client = await clientPromise;

export default client.db(process.env.DB_NAME);
