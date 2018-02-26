const moment = require('moment');

module.exports = {
  stripTags: function(input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  formatDate: function(date, format) {
    moment.locale('pl');
    var momentDate = moment(date).format(format);

    return momentDate;
  },
  select: function(selected, options) {
    return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'),
      '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'),
      'selected="selected"*$&');
  },
  filesize: function(x){
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(x, 10) || 0;
  while(n >= 1024 && ++l)
      n = n/1024;

  return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
  }

}
