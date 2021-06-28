const chatParser = (inputString) => {
    /**
     * ^((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) - date in formato HH:MM:SS 24h ad inizio stringa
     * \s* - spazio facoltativo, non è specificato se lo spazio è sempre presente o meno 
     * ([Cc]ustomer|[Aa]gent) - type, customer o agent (iniziale case insensitive - si suppone il resto del nome minuscolo)
     * (((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([Cc]ustomer|[Aa]gent)\s*:\s*) - mention
     * (.*(?:\n|$) - sentence, resto del messaggio fino a newline o fine riga
     * 
     * i capturing groups sono data, mention, sentence e type
     */
    const regexpTokens = /^(((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([Cc]ustomer|[Aa]gent)\s*:\s*)(.*(?:\n|$))/mg;
    const matches = inputString.matchAll(regexpTokens);
    const resultArray = Array.from(matches, (match) => ({
        date: match[2],
        mention: match[1],
        sentence: match[4],
        type: match[3].toLowerCase()
    }));

    return resultArray;
};

module.exports = chatParser;
