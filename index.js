/**
 * Ci sono varie strategie per ottimizzare questa funzione, non ha senso spenderci particolarmente tempo al momento perchè i dati sono pochi e senza sapere come sono fatti nei grandi numeri ogni ottimizzazione è "casuale".
 * Per il momento evito almeno di creare nuovi oggetti se i type sono già corretti.
 * Non testo la funzione perché deve essere trasparente rispetto a chatParser (quindi lo scope dei test è a un livello superiore rispetto a questa funzione), motivo per cui non viene nemmeno esportata all'esterno.
 */
const normalizeType = (inputArray) => {
    const customerName = inputArray[0].type;
    const agentName = inputArray.find((item) => item.type !== customerName);
    let resultArray = [];
    if(customerName !== 'customer' || (agentName !== undefined && agentName !== 'agent')) {
        resultArray = inputArray.map((item) => ({...item, type: item.type === customerName ? 'customer' : 'agent'}));
    } else {
        resultArray = [...inputArray];
    }
    return resultArray;
};

const chatParser = (inputString) => {
    /**
     * ((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) - date in formato HH:MM:SS 24h
     * \s* - spazio facoltativo, non è specificato se lo spazio è sempre presente o meno 
     * ([a-zA-Z ,.'-]+\b) - type, stringa di una o più parole con inclusi simboli tipici dei nomi
     * (((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([a-zA-Z ,.'-]+\b)\s*:\s*) - mention
     * ((?:(?!((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([a-zA-Z ,.'-]+\b)\s*:\s*).)*(?:\r\n|\r|\n|$)?) - sentence, resto del messaggio fino a newline o fine riga o a mention (non contenuta nel gruppo)
     * 
     * i capturing groups sono data, mention, sentence e type
     */
    const regexpTokens = /(((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([a-zA-Z ,.'-]+\b)\s*:\s*)((?:(?!((?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d))\s*([a-zA-Z ,.'-]+\b)\s*:\s*).)*(?:\r\n|\r|\n|$)?)/mg;
    const matches = inputString.matchAll(regexpTokens);
    const resultArray = Array.from(matches, (match) => ({
        date: match[2],
        mention: match[1],
        sentence: match[4],
        type: match[3].toLowerCase()
    }));

    return normalizeType(resultArray);
};

module.exports = chatParser;
