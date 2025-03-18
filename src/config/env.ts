import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.USER_ADDRESS) {
    throw new Error('USER_ADDRESS is not defined');
}
if (!process.env.PROXY_WALLET) {
    throw new Error('PROXY_WALLET is not defined');
}
if (!process.env.PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY is not defined');
}
if (!process.env.CLOB_HTTP_URL) {
    throw new Error('CLOB_HTTP_URL is not defined');
}
if (!process.env.CLOB_WS_URL) {
    throw new Error('CLOB_WS_URL is not defined');
}
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}
if (!process.env.RPC_URL) {
    throw new Error('RPC_URL is not defined');
}

export const ENV = {
    USER_ADDRESS: process.env.USER_ADDRESS as string,
    PROXY_WALLET: process.env.PROXY_WALLET as string,
    PRIVATE_KEY: process.env.PRIVATE_KEY as string,
    CLOB_HTTP_URL: process.env.CLOB_HTTP_URL as string,
    CLOB_WS_URL: process.env.CLOB_WS_URL as string,
    MONGO_URI: process.env.MONGO_URI as string,
    RPC_URL: process.env.RPC_URL as string,
};
