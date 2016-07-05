import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveMovie(movieDetails){
      return this.store.createRecord('movie', movieDetails).save()
    }
  }
});
