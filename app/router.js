import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('movies', { path: '/all-movies' }, function() {
    this.route('movie', { path: ':movie_id' });
  });
});

export default Router;
