export function dateConvert(date) {
    const dataObj = new Date(date);
    let dd = String(dataObj.getDate()).padStart(2, "0");
    let mm = String(dataObj.getMonth() + 1).padStart(2, "0");
    let yyyy = dataObj.getFullYear();
    let hour = String(dataObj.getHours()).padStart(2, "0");;
    let min = String(dataObj.getMinutes()).padStart(2, "0");;

    return (`${dd}-${mm}-${yyyy}, ${hour}:${min}`);
}
