module.exports = (function() {
    'use strict';
    
    var fs = require('fs');
    var Ractive = require('ractive');

    var template = fs.readFileSync(__dirname + '/todo-item-edit.component.tpl');


    function todoItemEditComponent() {
        var component = Ractive.extend({
          template: template.toString(),
          data: {
              label: ''
          },
          isolate: true,
          save: function() {
              this.event.original.preventDefault();
              
              this.fire('save', this.get('label'));
          },
          cancel: function() {
              this.event.original.preventDefault();
              
              this.fire('cancel');
          }
        });

        return component;
    }


    return todoItemEditComponent;

})();