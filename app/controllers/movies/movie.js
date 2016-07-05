import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['editing'],
  editing: false,
  actions: {
    updateMovie(details) {
      this.get('model').setProperties(details);
      return this.get('model').save().then(() => {
        this.set('editing', false);
      });
    },
    deleteMovie() {
      this.get('model').destroyRecord().then(() => {
        this.transitionToRoute('movies.index');
      });
    }
  }
});
