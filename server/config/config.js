import _ from 'lodash';

// deafult config object for our api
const config = {
  /* just placing the name of our possible NODE_ENV values for later*/
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 4000,
  // 10 days in minutes
  expireTime: '10 days',
  secrets: {
    jwt: process.env.JWT || 'gumball' // don't do this in production
  }
};

// check to see if the NODE_ENV was set, if not, the set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
// set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV;
// TODO
// envConfig is nothing right now, but it should be an object.
// depending on what ever config.env is, load up the appropriate file
// add assign the value to envConfig so the merge at the bottom actually works.
// What's happening here is that we have a base config in this file then we
// conditionally load in another config file depending on what
// env we are in. We then merge those objects with the env config overwriting
// the default config if here. We then export that new object for our app to use

let envConfig = {};

try {
  envConfig = require('./' + config.env).default;

  // just making sure the require actually
  // got something back
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

export default _.merge(config, envConfig);
