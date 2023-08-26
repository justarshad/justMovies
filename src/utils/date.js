const dateBeutifire = (date) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dateArray = date.split('-');

    return `${months[Number(dateArray[1] - 1)]} ${dateArray[0]}, ${dateArray[1]}`;
}

export default dateBeutifire;