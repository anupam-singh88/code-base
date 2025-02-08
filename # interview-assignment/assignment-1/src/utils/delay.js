const fetchDataWithDelay = (data, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};

module.exports = fetchDataWithDelay;
