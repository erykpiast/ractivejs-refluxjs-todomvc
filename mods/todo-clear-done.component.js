module.exports = (function() {
    'use strict';

    var fs = require('fs');
    var Ractive = require('ractive');

    var template = fs.readFileSync(__dirname + '/todo-clear-done.component.tpl');


    function todoClearDoneComponent(actions) {
        var component = Ractive.extend({
          template: template.toString(),
          data: {
              doneNumber: 0
          },
          twoway: false,
          modifyArrays: false,
          isolate: true,
          clearDone: function() {
              this.event.original.preventDefault();
              
              actions.clearDone();
          }
        });

        return component;
    }


    return todoClearDoneComponent;

})();