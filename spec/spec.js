describe("ChatParser", function() {
    const chatParser = require('../index.js');
    
    it('should parse a general one line string', function () {
        const inputString = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
        const expectedOutput = [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }];
        expect(chatParser(inputString)).toEqual(expectedOutput);
    });

    it('should parse a one line string with lower case customer', function () {
        const inputString = `14:24:32 customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
        const expectedOutput = [{
            date: '14:24:32',
            mention: '14:24:32 customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }];
        expect(chatParser(inputString)).toEqual(expectedOutput);
    });

    it('should parse a one line string with no spaces in the mention', function () {
        const inputString = `14:24:32Customer:Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
        const expectedOutput = [{
            date: '14:24:32',
            mention: '14:24:32Customer:',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'customer'
        }];
        expect(chatParser(inputString)).toEqual(expectedOutput);
    });

    it('should parse a two lines string with /\n as newline', function () {
        const inputString = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`;
        const expectedOutput = [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
            type: 'customer'
          }, {
            date: '14:26:15',
            mention: '14:26:15 Agent : ',
            sentence: 'Aliquam non cursus erat, ut blandit lectus.',
            type: 'agent'
          }];
        const result = chatParser(inputString);
        console.log(result);
        expect(result).toEqual(expectedOutput);
    });
});
