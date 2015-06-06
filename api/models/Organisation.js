/**
* Organisation.js
*
* @description :: A collection to hold discrete organisations, separating their inventory items, users etc.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    path: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },
    name: {
      type: 'string',
      required: true
    },
    domain: {
      type: 'string',
      required: true
    },
    items: {
      collection: 'item',
      via: 'organisation'
    }
  }
};