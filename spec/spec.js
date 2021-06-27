describe("ChatParser", function() {
    const chatParser = require('../index.js');
    
    it('should parse a one line string', function () {
        const inputString = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
        const expectedOutput = [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }];
        expect(chatParser(inputString)).toEqual(expectedOutput);
    });
})
