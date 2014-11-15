module.exports = (function() {
    'use strict';

    var todoStore = require('./mods/todo.store');
    var todoFilterStore = require('./mods/todo-filter.store');
    var todoActions = require('./mods/todo.actions');
    var todoView = require('./mods/todo.view');


    function App(container) {
        var actions = todoActions();
        var dataStore = todoStore(actions);
        var filterStore = todoFilterStore(actions);
        var view = todoView(container, {
            data: dataStore,
            filter: filterStore
        }, actions);

        console.log('app created!');
    }


    return App;

})();