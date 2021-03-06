var _ = require('lodash');

// if exports is an array, it will be the same like loading multiple files...
//module.exports = require('cqrs-domain').defineCommand({
module.exports = require('../../../../../../../').defineCommand({
  name: 'unregisterAllContactInformation',  // optional, default is file name without extension
  version: 2, // optional, default 0
  payload: '' // if not defined it will use what is defined as default in aggregate or pass the whole command...
}, function (cmd, aggregate) {

  _.each(aggregate.get('phoneNumbers'), function(number) {
    aggregate.apply('unregisteredPhoneNumber', {
      number: number
    });
    // or
    // aggregate.apply({
    //   event: 'unregisteredPhoneNumber',
    //   payload: {
    //     number: number
    //   }
    // });
  });

  _.each(aggregate.get('emails'), function(mail) {
    aggregate.apply('unregisteredEMailAddress', {
      email: mail
    });
    // or
    // aggregate.apply(aggregate.toEvent({
    //   event: 'unregisteredEMailAddress',
    //   payload: {
    //     email: mail
    //   }
    // });
  });
});
