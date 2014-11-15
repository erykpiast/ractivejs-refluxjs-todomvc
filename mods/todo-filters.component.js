module.exports = (function() {
    'use strict';
    
    var fs = require('fs');
    var Ractive = require('ractive');

    var template = fs.readFileSync(__dirname + '/todo-filters.component.tpl');


    function todoFiltersComponent(actions) {
        var component = Ractive.extend({
          template: template.toString(),
          data: {
              filters: [ ],
              labels: {
                  ALL: 'All',
                  DONE: 'Done',
                  IN_PROGRESS: 'Active'
              }
          },
          twoway: false,
          modifyArrays: false,
          isolate: true,
          choose: function(filter) {
              actions.filter(filter);
          }
        });

        return component;
    }


    return todoFiltersComponent;

})();