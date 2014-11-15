module.exports = (function() {
    'use strict';

    var fs = require('fs');
    var Ractive = require('ractive');

    var template = fs.readFileSync(__dirname + '/todo-add-item.component.tpl');


    function todoAddItemComponent(actions) {
        var component = Ractive.extend({
          template: template.toString(),
          data: {
              label: ''
          },
          twoway: true,
          modifyArrays: false,
          isolate: true,
          add: function() {
              this.event.original.preventDefault();

              actions.add(this.data.label);

              this.set('label', '');
          }
        });

        return component;
    }


    return todoAddItemComponent;

})();