const chatParser = (inputString) => {
    /**
     * ((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) - date in formato HH:MM:SS 24h
     * \s* - spazio facoltativo, non è specificato se lo spazio è sempre presente o meno 
     * ([Cc]ustomer|[Aa]gent) - type, customer o agent (iniziale case insensitive - si suppone il resto del nome minuscolo)
     * (((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([Cc]ustomer|[Aa]gent)\s*:\s*) - mention
     * ((?:(?!(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)).)*(?:\r\n|\r|\n|$)?) - sentence, resto del messaggio fino a newline o fine riga o data (non contenuta nel gruppo)
     * 
     * i capturing groups sono data, mention, sentence e type
     */
    const regexpTokens = /(((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([Cc]ustomer|[Aa]gent)\s*:\s*)((?:(?!(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)).)*(?:\r\n|\r|\n|$)?)/mg;
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
