module.exports = function(app) {

  var Organisation = app.models.Organisation;

  Organisation.nestRemoting('Items');
  Organisation.nestRemoting('Locations');

  var Item = app.models.Item;
  Item.nestRemoting('Movements');
  Item.nestRemoting('Categories');

  var Movement = app.models.Movement;
  Movement.nestRemoting('Locations');
};