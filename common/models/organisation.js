module.exports = function(Organisation) {
  


  Organisation.bulkCreateItems = function(data, cb) {
    var items = [];
    
    //The default template
    var template = {
      orgId: '558e9ee192f8676afa383848'
    }

    if(data.template) {
      template = data.template;
    }

    for(var i = 0; i < data.numberOfItems; i++) {
      items[i] = template;
    }

    var Item = Organisation.app.models.Item;
    
    Item.create(items, function(err, newItems) {
      console.log(newItems);
      cb(null, newItems);
    });
  };

  Organisation.remoteMethod(
    'bulkCreateItems',
    {
      accepts: [{
        arg: 'data', 
        type: 'Object',
        description: 'An object containing numberOfItems and template',
        required: true,
        http: { source: 'body' }
      }],
      returns: {
        arg: 'items',
        type: 'Object',
        description: 'A list of the created items'
      },
      description: 'Bulk creates a given number of items',
      notes: ['Inserts the given number of items into the database.',
        'This is particularly useful if you need to reserve a certain number of',
        'GUIDs for items. LIMIT = 1000']
    });  
};
