/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  getItemsByOrganisation: function(req, res) {

    console.log(req.orgId);

    Organisation
      .findOne({ organisation: req.orgId })
      .populate('items')
      .exec(function(err, org) {
        console.log("Yay1");
        console.log(org);
        console.log(org.items);
      });

    res.send(org.items);

    /*Item
      .findByOrganisation(req.orgId)
      .exec(function(err,org) {
        console.log("YAY");
        console.log(org);
      });*/
  }

};

