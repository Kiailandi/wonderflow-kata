const chatParser = (inputString) => {
    /**
     * ^((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) - date in formato HH:MM:SS 24h ad inizio stringa
     * (Customer) - type, customer (solo customer essendo mono riga al momento)
     * ^(((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) (Customer) : ) - mention
     * .* - sentence, resto del messaggio fino alla fine
     * 
     * i capturing groups sono data, mention, sentence e type
     */
    const regexpTokens = /^(((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) (Customer) : )(.*)$/;
    const match = inputString.match(regexpTokens);
    const resultArray = [{
        date: match[2],
        mention: match[1],
        sentence: match[4],
        type: match[3].toLowerCase()
    }];

    return resultArray;
};

module.exports = chatParser;
