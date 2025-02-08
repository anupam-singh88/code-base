const { client, isRedisAvailable } = require('../config/redisClient');

const cacheDuration = 3600;

const cacheKey = (key) => `food:${key}`;

const getFallbackData = async (dataType) => {
    switch (dataType) {
        case 'foodList':
            return [
                { name: 'Prawn Curry', description: 'A spicy and tangy curry made with fresh prawns.', price: 12 },
                { name: 'Fish Thali', description: 'A traditional Goan meal served with fish curry, rice, and accompaniments.', price: 15 },
            ];
        case 'availableLocations':
            return ['Calangute', 'Panaji', 'Vasco da Gama', 'Margao'];
        case 'nutritionalInfo':
            return [
                { name: 'Prawn Curry', calories: 200, protein: 15, fat: 10, carbs: 5 },
                { name: 'Fish Thali', calories: 300, protein: 25, fat: 15, carbs: 20 },
            ];
        case 'stockOutFoods':
            return ['Prawn Curry'];
        default:
            return [];
    }
};

const getDataWithCache = async (dataType, fetchDataFunction) => {
    try {
        if (isRedisAvailable) {
            const key = cacheKey(dataType);
            const cachedData = await client.get(key);

            if (cachedData) {
                return JSON.parse(cachedData);
            }

            const data = await fetchDataFunction();

            await client.setEx(key, cacheDuration, JSON.stringify(data));

            return data;
        } else {
            return await getFallbackData(dataType);
        }
    } catch (error) {
        console.error(`Error fetching ${dataType}:`, error);
        return await getFallbackData(dataType);
    }
};

const getFoodList = () => getDataWithCache('foodList', async () => {
    return [
        { name: 'Prawn Curry', description: 'A spicy and tangy curry made with fresh prawns.', price: 12 },
        { name: 'Fish Thali', description: 'A traditional Goan meal served with fish curry, rice, and accompaniments.', price: 15 },
    ];
});

const getAvailableLocations = () => getDataWithCache('availableLocations', async () => {
    return ['Calangute', 'Panaji', 'Vasco da Gama', 'Margao'];
});

const getNutritionalInformation = () => getDataWithCache('nutritionalInfo', async () => {
    return [
        { name: 'Prawn Curry', calories: 200, protein: 15, fat: 10, carbs: 5 },
        { name: 'Fish Thali', calories: 300, protein: 25, fat: 15, carbs: 20 },
    ];
});

const getStockOutFoods = () => getDataWithCache('stockOutFoods', async () => {
    return ['Prawn Curry'];
});

module.exports = {
    getFoodList,
    getAvailableLocations,
    getNutritionalInformation,
    getStockOutFoods,
};
