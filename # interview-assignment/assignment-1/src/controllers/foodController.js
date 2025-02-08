const {
    getFoodList,
    getAvailableLocations,
    getNutritionalInformation,
    getStockOutFoods,
} = require('../services/dataFetchService');

const mergeData = async () => {
    try {
        const foodList = await getFoodList();
        const availableLocations = await getAvailableLocations();
        const nutritionalInfo = await getNutritionalInformation();
        const stockOutFoods = await getStockOutFoods();

        const mergedData = {
            foodItems: foodList.map(item => ({
                ...item,
                nutritionalInfo: nutritionalInfo.find(info => info.name === item.name) || {},
                isStockOut: stockOutFoods.includes(item.name),
            })),
            locations: availableLocations,
        };

        return mergedData;
    } catch (error) {
        console.error('Error merging data:', error);
        throw new Error('Failed to merge data');
    }
};

const getFoodData = async (req, res) => {
    try {
        const data = await mergeData();
        res.json(data);
    } catch (error) {
        console.error('Error fetching food data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

module.exports = {
    getFoodData,
};
