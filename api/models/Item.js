/**
* Item.js
*
* @description :: The strider representation of a physical inventory item
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    altIds: {
      type: 'array'
    },
    organisation: {
      model: 'organisation'
    }
  }
};

