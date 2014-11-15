module.exports = (function() {
    'use strict';
    
    var fs = require('fs');
    var Ractive = require('ractive');

    var todoItemComponent = require('./todo-item.component');
    var template = fs.readFileSync(__dirname + '/todo-list.component.tpl');


    function todoListComponent(actions) {
        var component = Ractive.extend({
          twoway: false,
          modifyArrays: false,
          isolate: true,
          template: template.toString(),
          data: {
              list: [ ],
              filter: function() { return true; }
          },
          components: {
              'todo-item': todoItemComponent(actions)
          }
        });

        return component;
    }


    return todoListComponent;

})();