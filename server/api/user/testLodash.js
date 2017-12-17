const _ = require('lodash');

var object = {
  'a': [{}, { 'c': 4 }]
};

var other = {
  'a': [{ 'b': 3 }, { 'c': 5 }]
};

_.merge(object, other);

console.log('merge object ' + JSON.stringify(object));
