const convertTime = (time_24hr) => {
    let time_12hr = time_24hr;
    let hours = time_24hr.substring(0, 2);
    let minutes = time_24hr.substring(3, 5);
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    time_12hr = hours + ':' + minutes + ' ' + ampm;
    return time_12hr;
}

export default convertTime;
