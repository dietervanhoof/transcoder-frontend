const prettyPrintTimeRemaining = (eta) => {
    if (eta === '') {
        return 'Unknown';
    } else {
        const hours = eta.substring(0, 2);
        const minutes = eta.substring(3, 5);
        const seconds = eta.substring(6, 8);
        let prettyString = '';
        if (hours !== '00') {
            prettyString += hours + ' h ';
        }
        if (minutes !== '00') {
            prettyString += minutes + ' m ';
        }
        if (seconds !== '00') {
            prettyString += seconds + ' s';
        }
        return prettyString;
    }
};

module.exports = {
    prettyPrintTimeRemaining: prettyPrintTimeRemaining
};