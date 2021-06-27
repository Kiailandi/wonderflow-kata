const chatParser = (inputString) => {
    /**
     * ^((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) - date in formato HH:MM:SS 24h ad inizio stringa
     * \s* - spazio facoltativo, non è specificato se lo spazio è sempre presente o meno 
     * ([Cc]ustomer) - type, customer (solo customer essendo mono riga al momento) (iniziale case insensitive - si suppone il resto del nome minuscolo)
     * (((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([Cc]ustomer)\s*:\s*) - mention
     * .* - sentence, resto del messaggio fino alla fine
     * 
     * i capturing groups sono data, mention, sentence e type
     */
    const regexpTokens = /^(((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([Cc]ustomer)\s*:\s*)(.*)$/;
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
