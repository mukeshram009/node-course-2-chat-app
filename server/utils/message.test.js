var expect = require('expect');
var {generateMesssage} = require('./message.js');

describe('generateMessage',() => {
  it('should generate correct message object', () => {

    var from = 'mukesh';
    var text = 'some message';
    var message = generateMesssage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});
