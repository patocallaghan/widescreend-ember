import Ember from 'ember';

export default Ember.Controller.extend({
  name: '',
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
  cannotSaveMovie: Ember.computed('name', 'review', 'rating', 'dateWatched', function() {
    return !(this.get('name') && this.get('review') && this.get('dateWatched') && this.get('rating'));
  }),
  resetMovieForm() {
    this.setProperties({
      name: '',
      review: '',
      rating: null,
      dateWatched: null
    });
  },
  actions: {
    saveMovie(){
      this.store.createRecord('movie', {
        name: this.get('name'),
        review: this.get('review'),
        rating: this.get('rating'),
        dateWatched: this.get('dateWatched')
      }).save().then(() => {
        this.set('showSuccessScreen', true);
      });
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
