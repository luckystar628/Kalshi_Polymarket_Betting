import connectDB from './config/db';
import createClobClient from './utils/createClobClient';
import test from './test/test';

export const main = async () => {
    await connectDB();
    const clobClient = await createClobClient();
    await test(clobClient);
};

main();
