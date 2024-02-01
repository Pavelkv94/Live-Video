export const buildMovementsWithAdresses = (array, action) => {
    const newArr = [...array];

    for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].start_datetime === action.start_date && newArr[i].type === "movement") {
            newArr[i][action.dateField] = action.address;
            if (newArr[i - 1].type !== "movement" && action.dateField === "start_address") {
                newArr[i - 1][action.dateField] = action.address;
            }
            if (newArr[i + 1].type !== "movement" && action.dateField === "end_address") {
                newArr[i + 1].start_address = action.address;
            }
        } else if (newArr[i].start_datetime === action.start_date && newArr[i].type !== "movement") {
            newArr[i].start_address = action.address;

            if (newArr[i - 1].type !== "movement") {
                newArr[i - 1].start_address = action.address;
            }
            if (newArr[i + 1].type !== "movement") {
                newArr[i + 1].start_address = action.address;
            }
        }
    }
    return newArr;
};
