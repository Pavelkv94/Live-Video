// export function dateConvert(dateString) {
//     // Parse the date string to extract its components
//     const dateObj = new Date(dateString);
//     const year = dateObj.getUTCFullYear();
//     const month = dateObj.getUTCMonth() + 1; // Months are 0-based
//     const day = dateObj.getUTCDate();
//     const hour = dateObj.getUTCHours();
//     const minute = dateObj.getUTCMinutes();

//     // Create a UTC date using Date.UTC
//     const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

//     // Format the date and time components
//     const dd = String(utcDate.getUTCDate()).padStart(2, "0");
//     const mm = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
//     const yyyy = utcDate.getUTCFullYear();
//     const hh = String(utcDate.getUTCHours()).padStart(2, "0");
//     const min = String(utcDate.getUTCMinutes()).padStart(2, "0");

//     return `${dd}-${mm}-${yyyy}, ${hh}:${min}`;
// }

export function dateConvert(date) {
    const dataObj = new Date(date);
    const dd = String(dataObj.getDate()).padStart(2, "0");
    const mm = String(dataObj.getMonth() + 1).padStart(2, "0");
    const yyyy = dataObj.getFullYear();
    const hour = String(dataObj.getHours()).padStart(2, "0");
    const min = String(dataObj.getMinutes()).padStart(2, "0");

    return `${dd}-${mm}-${yyyy}, ${hour}:${min}`;
}

export function dateDifference(from, to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const timeDiff = toDate - fromDate;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    const formattedDiff = `${days > 0 ? `${days} day` : ""} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return formattedDiff;
}

export function isDateExpired(date) {
    const today = new Date();
    const inputDate = new Date(date);

    return inputDate < today;
}

export const formatDateForQuery = (date) => {
    const isoDate = new Date(date);

    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };

    const formattedDate = isoDate.toLocaleDateString("en-GB", options).replace(/\//g, ".").replace(",", "");
    return formattedDate;
};

export const formatDateToUTC = (date) => {
    const defaultDate = new Date(date);
    return defaultDate.toISOString();
};