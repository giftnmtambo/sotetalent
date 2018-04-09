/* eslint-disable global-require */
/* eslint-disable no-script-url */
// Load the babel-register plugin for the graphql directory
// Note this checks the regex against an absoloute path
require('babel-register')({ only: /\/graphql\/.*/ });

// Load .env config for development environments
require('dotenv').config({ silent: true });

// Initialise New Relic if an app name and license key exists
if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

/**
 * Application Initialisation
 */

const keystone = require('keystone');
const pkg = require('./package.json');

keystone.init({
  name: 'SoteTalent',
  brand: 'SoteTalent',
  back: '/me',

  favicon: 'public/favicon.ico',
  less: 'public',
  static: 'public',

  views: 'templates/views',
  'view engine': 'jade',
  'view cache': false,

  emails: 'templates/emails',

  'auto update': true,
  mongo: process.env.MONGODB_URI || `mongodb://localhost/${pkg.name}`,

  session: true,
  'session store': 'mongo',
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET || 'sotetalent',

  'mandrill api key': process.env.MANDRILL_KEY,

  'google api key': process.env.GOOGLE_BROWSER_KEY,
  'google server api key': process.env.GOOGLE_SERVER_KEY,

  'ga property': process.env.GA_PROPERTY,
  'ga domain': process.env.GA_DOMAIN,

  'cloudinary secure': true,

  basedir: __dirname,
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.set('locals', {
  _: require('lodash'),
  moment: require('moment'),
  js: 'javascript:;',
  env: keystone.get('env'),
  utils: keystone.utils,
  plural: keystone.utils.plural,
  editable: keystone.content.editable,
  google_api_key: keystone.get('google api key'),
  ga_property: keystone.get('ga property'),
  ga_domain: keystone.get('ga domain'),
});

// Staging env, production links. Change as neccessary
keystone.set('email locals', {
  utils: keystone.utils,
  host: (function() {
    if (keystone.get('env') === 'staging') return 'http://sotetalent-beta.herokuapp.com';
    if (keystone.get('env') === 'production') return 'http://www.sotetalent.com';
    return (keystone.get('host') || 'http://localhost:') + (keystone.get('port') || '3000');
  })(),
});

keystone.set('nav', {
  competitions: ['competitions', 'rsvps'],
  meetups: ['meetups', 'talks', 'rsvps'],
  members: ['users', 'startups', 'organisations'],
  posts: ['posts', 'post-categories', 'post-comments'],
  links: ['links', 'link-tags', 'link-comments'],
});

keystone.start();
