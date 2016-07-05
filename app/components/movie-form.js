import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    if(this.get('movie')) {
      this.setProperties({
        title: this.get('movie.title'),
        rating: this.get('ratingOptions').findBy('id', this.get('movie.rating')),
        review: this.get('movie.review'),
        dateWatched: this.get('movie.dateWatched')
      });
    }
  },
  title: '',
  review: '',
  rating: null,
  dateWatched: null,
  showSuccessScreen: false,
  ratingOptions: [
    {
      id: 1,
      title: '1 star'
    },
    {
      id: 2,
      title: '2 star'
    },
    {
      id: 3,
      title: '3 star'
    },
    {
      id: 4,
      title: '4 star'
    },
    {
      id: 5,
      title: '5 star'
    },
  ],
  cannotSaveMovie: Ember.computed('title', 'review', 'rating', 'dateWatched', function() {
    return !(this.get('title') && this.get('review') && this.get('dateWatched') && this.get('rating'));
  }),
  resetMovieForm() {
    this.setProperties({
      title: '',
      review: '',
      rating: null,
      dateWatched: null
    });
  },
  movieDetails: Ember.computed('title', 'rating', 'dateWatched', 'review', function() {
    return {
      title: this.get('title'),
      review: this.get('review'),
      rating: this.get('rating'),
      dateWatched: this.get('dateWatched')
    }
  }),
  actions: {
    save() {
      this.attrs.saveMovie(this.get('movieDetails')).then(() => {
        this.set('showSuccessScreen', true);
      })
    },
    updateRating(selectedOption) {
      this.set('rating', selectedOption.id);
    },
    addAnotherMovie() {
      this.set('showSuccessScreen', false);
      this.resetMovieForm();
    }
  }
});
