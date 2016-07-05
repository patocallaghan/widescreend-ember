import Ember from 'ember';

export default Ember.Component.extend({
  editing: false,
  actions: {
    toggleEdit() {
      this.toggleProperty('editing');
    }
  }
});
