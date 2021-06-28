const chatParser = require('./chatParser.js');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is the input string? ", function(inputString) {
    console.log(chatParser(inputString));
    rl.close();
});

rl.on("close", function() {
    process.exit(0);
});
