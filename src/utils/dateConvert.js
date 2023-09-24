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