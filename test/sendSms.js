require('dotenv').config();
const expect = require('chai').expect;
const assert = require('chai').assert;

const sendSms = require('../helpers/sendSms');
let config = {
    token: process.env.TWILIO_TEST_TOKEN,
    number: '+15005550006',
    id: process.env.TWILIO_TEST_ID,
}
describe('SMS sender', function() {
    it('sends to registered number', () => {
        return sendSms(process.env.RECEIVING_NUMBER, 'Successful message', config)
            .then(function(data) {
                let message = 'Successful message'
                assert(data.body === message, "should send message");
            });
     });
     it('does not send to unregistered number', () => {
        return sendSms('+15005550009', 'Should not send', config)
            .then(function(data) {
        }).catch(function(error){
            assert(error.status === 400, "should not send to non-mobile number");
        });
    });
});
