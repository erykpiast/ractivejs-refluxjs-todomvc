module.exports = (function() {
    'use strict';

    var fs = require('fs');
    var Ractive = require('ractive');

    var template = fs.readFileSync(__dirname + '/todo-in-progress-counter.component.tpl');


    function todoInProgressCounterComponent() {
        var component = Ractive.extend({
          template: template.toString(),
          data: {
              inProgressNumber: 0
          },
          twoway: false,
          modifyArrays: false,
          isolate: true
        });

        return component;
    }


    return todoInProgressCounterComponent;

})();