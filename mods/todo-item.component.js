module.exports = (function() {
    'use strict';
    
    var fs = require('fs');
    var Ractive = require('ractive');

    var todoItemEditComponent = require('./todo-item-edit.component');
    
    var template = fs.readFileSync(__dirname + '/todo-item.component.tpl');


    function todoItemComponent(actions) {
        var component = Ractive.extend({
          template: template.toString(),
          data: {
              id: 0,
              label: '',
              done: false
          },
          twoway: false,
          modifyArrays: false,
          isolate: true,
          init: function() {
              
            var finishEditingListener = this.on('finishEditing', function finishEditingHandler(newValue) {
                if('undefined' !== typeof newValue) {
                    actions.edit(this.get('id'), newValue);
                }
                  
                this.set('editing', false);
            });
            
            this.on('teardown', function(e, newValue) {
                finishEditingListener.cancel();
            });
          },
          toggle: function() {
              actions.toggle(this.get('id'));
          },
          remove: function() {
              actions.remove(this.get('id'));
          },
          startEditing: function() {
              this.set('editing', true);
          },
          components: {
              'todo-item-edit': todoItemEditComponent()
          }
        });

        return component;
    }


    return todoItemComponent;

})();