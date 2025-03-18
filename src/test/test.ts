import { ClobClient } from '@polymarket/clob-client';
import { getPolyMarketModel } from '../models/PolyMarket';
// import { Mistral } from '@mistralai/mistralai';
// import { z } from 'zod';

// const API_KEY = '';

const test = async (clobClient: ClobClient) => {
    // const market = await clobClient.getMarket(
    //     '0x9deb0baac40648821f96f01339229a422e2f5c877de55dc4dbf981f95a1e709c'
    // );
    // console.log(market.question, market.description);

    // const client = new Mistral({ apiKey: API_KEY });

    // const Result = z.object({
    //     is_sports_related: z.boolean(),
    // });

    // const chatResponse = await client.chat.parse({
    //     model: 'ministral-8b-latest',
    //     messages: [
    //         {
    //             role: 'system',
    //             content: "Please check if user's message is related to sports or not.",
    //         },
    //         {
    //             role: 'user',
    //             content: `${market.question}`,
    //         },
    //     ],
    //     responseFormat: Result,
    //     maxTokens: 256,
    //     temperature: 0,
    // });

    // if (chatResponse.choices && chatResponse.choices.length > 0) {
    //     console.log('Chat response:', chatResponse);
    //     console.log(chatResponse.choices[0].message?.parsed);
    // } else {
    //     console.error('No choices found in chat response');
    // }

    let nextCursor = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let allMarkets: any[] = [];
    const PolyMarket = getPolyMarketModel();
    await PolyMarket.deleteMany({});

    do {
        const response = await clobClient.getMarkets(nextCursor);
        const markets = response.data.filter(
            (market) =>
                market.enable_order_book &&
                market.active &&
                !market.closed &&
                !market.archived &&
                market.accepting_orders &&
                market.tags.includes('Sports')
        );
        allMarkets = allMarkets.concat(markets);
        nextCursor = response.next_cursor;
    } while (nextCursor && nextCursor !== 'LTE=');

    try {
        await PolyMarket.insertMany(allMarkets);
        console.log('Data saved to MongoDB successfully');
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
    }
};

export default test;
