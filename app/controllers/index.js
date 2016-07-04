import Ember from 'ember';

export default Ember.Controller.extend({
  name: '',
  review: '',
  rating: null,
  dateWatched: null,
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
  cannotSaveMovie: Em.computed('name', 'review', 'rating', 'dateWatched', function() {
    return !(this.get('name') && this.get('review') && this.get('dateWatched') && this.get('rating'));
  }),
  actions: {
    saveMovie(){
      console.log({
        name: this.get('name'),
        review: this.get('review'),
        rating: this.get('rating'),
        dateWatched: this.get('dateWatched')
      });
    },
    updateRating(selectedOption) {
      this.set('rating', selectedOption.id);
    }
  }
});
