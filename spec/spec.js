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

    it('should parse a two lines string with \\n as newline', function () {
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
        const output = chatParser(inputString);
        expect(output).toEqual(expectedOutput);
    });

    it('should parse a two lines string with \\r as newline', function () {
        const inputString = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`;
        const expectedOutput = [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r',
            type: 'customer'
          }, {
            date: '14:26:15',
            mention: '14:26:15 Agent : ',
            sentence: 'Aliquam non cursus erat, ut blandit lectus.',
            type: 'agent'
          }];
        const output = chatParser(inputString);
        expect(output).toEqual(expectedOutput);
    });

    it('should parse a two lines string with \\r\\n as newline', function () {
        const inputString = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`;
        const expectedOutput = [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r\n',
            type: 'customer'
          }, {
            date: '14:26:15',
            mention: '14:26:15 Agent : ',
            sentence: 'Aliquam non cursus erat, ut blandit lectus.',
            type: 'agent'
          }];
        const output = chatParser(inputString);
        expect(output).toEqual(expectedOutput);
    });

    it('should parse a n lines string with 2 customer mentions at the start', function () {
        const inputString = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.\n14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.`;
        const expectedOutput = [{
            date: '14:24:32',
            mention: '14:24:32 Customer : ',
            sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
            type: 'customer'
          }, {
            date: '14:27:00',
            mention: '14:27:00 Customer : ',
            sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n',
            type: 'customer'
          }, {
            date: '14:27:47',
            mention: '14:27:47 Agent : ',
            sentence: 'Vestibulum tempor diam eu leo molestie eleifend.\n',
            type: 'agent'
          }, {
            date: '14:28:28',
            mention: '14:28:28 Customer : ',
            sentence: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
            type: 'customer'
          }];
        const output = chatParser(inputString);
        expect(output).toEqual(expectedOutput);
    });
});
