import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteMovie(movie) {
      movie.destroyRecord().then(() => {
        this.transitionToRoute('movies.index');
      });
    }
  }
});
