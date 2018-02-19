const moment = require('moment');

module.exports = {
  stripTags: function(input){
     return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  formatDate: function(date, format){
    moment.locale('pl');
    var momentDate = moment(date).format(format);

    return momentDate;
  },
  select: function(selected, options){
    return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'),
    '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'),
    'selected="selected"*$&');
  }


}
