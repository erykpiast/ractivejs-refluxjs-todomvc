module.exports = (function() {
    'use strict';

    var fs = require('fs');
    var Ractive = require('ractive');

    var keyboardEvents = require('./keyboard-events');
    var todoListComponent = require('./todo-list.component');
    var todoFiltersComponent = require('./todo-filters.component');
    var todoClearDoneComponent = require('./todo-clear-done.component');
    var todoToggleAllComponent = require('./todo-toggle-all.component');
    var todoInProgressCounterComponent = require('./todo-in-progress-counter.component');
    var todoAddItemComponent = require('./todo-add-item.component');

    var template = fs.readFileSync(__dirname + '/todo.view.tpl');


    function todoView(container, stores, actions) {
        var view = new Ractive({
          el: container,
          template: template.toString(),
          data: {
              list: [ ],
              filters: {
                  names: [ ],
                  list: { },
                  current: function() { return true; }
              }
          },
          computed: {
              doneNumber: function() {
                  return this.get('list').filter(this.get('filters.list.DONE')).length;
              },
              inProgressNumber: function() {
                  return this.get('list').filter(this.get('filters.list.IN_PROGRESS')).length;
              }
          },
          twoway: false,
          modifyArrays: false,
          events: keyboardEvents,
          components: {
              'todo-list': todoListComponent({
                  edit: actions.edit,
                  toggle: actions.toggle,
                  remove: actions.remove
              }),
              'todo-clear-done': todoClearDoneComponent({
                  clearDone: actions.clearDone
              }),
              'todo-toggle-all': todoToggleAllComponent({
                  toggleAll: actions.toggleAll
              }),
              'todo-in-progress-counter': todoInProgressCounterComponent(),
              'todo-filters': todoFiltersComponent({
                  filter: actions.filter
              }),
              'todo-add-item': todoAddItemComponent({
                  add: actions.add
              })
          },
          oninit: function oninitHandler() {
            this.set('list', stores.data.getDefaultData());
            var removeListChangeHandler = stores.data.listen(function listChangeHandler(list) {
                this.set('list', list);
            }.bind(this));

            this.set('filters', stores.filter.getDefaultData());
            var removeFilterChangeHandler = stores.filter.listen(function filterChangeHandler(filters) {
                this.set('filters', filters);
            }.bind(this));

            this.on('teardown', function onteardownHandler() {
                removeListChangeHandler();
                removeFilterChangeHandler();
            });
          }
        });

        return view;
    }


    return todoView;

})();