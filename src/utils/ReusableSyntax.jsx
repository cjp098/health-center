//* getData slice with by 5 on each row
export const arraySlice = (filteredProduct, current, dataShowed) => {
    const indexLastData = current * dataShowed;
    const indexOfFirstData = indexLastData - dataShowed;
    const currentData = filteredProduct.slice(indexOfFirstData, indexLastData);

    return currentData;
};

//**Returning match search value from server */
export const onSearch = (value, items) => {
    return items.filter((data) => {
        return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().includes(value.toLowerCase());
        });
    });
};