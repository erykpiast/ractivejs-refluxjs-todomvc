module.exports = (function() {
    'use strict';

    var fs = require('fs');
    var Ractive = require('ractive');

    var template = fs.readFileSync(__dirname + '/todo-toggle-all.component.tpl');


    function todoToggleAllComponent(actions) {
        var component = Ractive.extend({
          template: template.toString(),
          twoway: false,
          modifyArrays: false,
          isolate: true,
          toggleAll: function() {
              this.event.original.preventDefault();
              
              actions.toggleAll(this.event.node.checked);
          }
        });

        return component;
    }


    return todoToggleAllComponent;

})();