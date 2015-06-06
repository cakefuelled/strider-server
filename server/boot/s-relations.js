module.exports = function(app) {

  var Organisation = app.models.Organisation;

  Organisation.nestRemoting('Items');
  Organisation.nestRemoting('Locations');

  var Item = app.models.Item;
  Item.nestRemoting('Movements');

  var Movement = app.models.Movement;
  Movement.nestRemoting('Locations');
};