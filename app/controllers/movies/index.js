import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['sortBy'],
  sortBy: '',

  moviesTitleSorting: ['title'],
  sortedMoviesTitle: Ember.computed.sort('model', 'moviesTitleSorting'),

  moviesDateSorting: ['dateWatched:desc'],
  sortedMoviesDate: Ember.computed.sort('model', 'moviesDateSorting'),

  moviesRatingSorting: ['rating:desc'],
  sortedMoviesRating: Ember.computed.sort('model', 'moviesRatingSorting'),

  sortedMovies: Ember.computed('model.[]', 'sortedMoviesTitle.[]', 'sortedMoviesDate.[]', 'sortBy', function() {
    if (!this.get('sortBy')) {
      return this.get('model');
    }

    if(this.get('sortBy') === 'title') {
      return this.get('sortedMoviesTitle');
    }

    if(this.get('sortBy') === 'rating') {
      return this.get('sortedMoviesRating');
    }

    return this.get('sortedMoviesDate');
  })
});
