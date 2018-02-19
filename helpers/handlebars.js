const moment = require('moment');

module.exports = {
  stripTags: function(input){
     return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  formatDate: function(date, format){
    moment.locale('pl');
    var momentDate = moment(date).format(format);

    return momentDate;
  }
}
