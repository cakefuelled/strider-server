module.exports = function(app) {
  
  var User = app.models.user;
  var Organisation = app.models.Organisation;

  var testUser = {
    email: 'aimar@aimarfoundation.org',
    password: 'A!MARaimar'
  }

  var testOrg = {
      path: 'aimar',
      name: 'Aimar Foundation',
      domain: 'aimarfoundation.org'
  };

  User.upsert(testUser, function(err, user) {
    console.log(user);
    //Try and find the org
    user.organisations.findOne({
      path: 'aimar'
    }, function(err, userOrgRelation) {

      //If it doesn't exist, create it
      if(userOrgRelation === null) {
        user.organisations.create(testOrg, function(err, org) {
          console.log(org);
        });
      } else {
        //If it exists
        Organisation.findOne({
          id: userOrgRelation.organisationId
        }, function(err, aimarOrg) {
          console.log(aimarOrg);
        });
      }
    });
  });
};