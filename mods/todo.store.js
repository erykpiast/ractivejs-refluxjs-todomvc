module.exports = (function TodoStoreModule() {
    'use strict';
    
    var Reflux = require('reflux');
    var extend = require('extend');


    function todoStore(actions) {
        var _loadList = function _loadList() {
            return [{
                id: 1,
                label: 'The first item on the list',
                done: true
            }, {
                id: 2,
                label: 'The second item on the list',
                done: false
            }];
        };

        return Reflux.createStore({
            init: function() {
                this.list = _loadList();

                this.listenTo(actions.remove, this.removeItem);
                this.listenTo(actions.add, this.addItem);
                this.listenTo(actions.toggle, this.toggleItem);
                this.listenTo(actions.edit, this.editItem);
                this.listenTo(actions.toggleAll, this.toggleAll);
                this.listenTo(actions.clearDone, this.clearDone);
            },
            getDefaultData: function() {
                return this.list;
            },
            addItem: function(label) {
                if(label) {
                    this.list = this.list.concat([{
                        id: Date.now().toString(36),
                        label: label
                    }]);

                    this.trigger(this.list);
                }
            },
            removeItem: function(itemId) {
                var itemIndex = this._getItemIndex(itemId);

                if(itemIndex !== -1) {
                    this.list = this.list.filter(function(item, index) {
                        return (index !== itemIndex);
                    });

                    this.trigger(this.list);
                }
            },
            toggleItem: function(itemId) {
                var itemIndex = this._getItemIndex(itemId);

                if(itemIndex !== -1) {
                    this.list[itemIndex] = extend({ }, this.list[itemIndex], {
                        done: !this.list[itemIndex].done
                    });

                    this.trigger(this.list);
                }
            },
            editItem: function(itemId, newLabel) {
                var itemIndex = this._getItemIndex(itemId);

                if(itemIndex !== -1) {
                    this.list[itemIndex] = extend({ }, this.list[itemIndex], {
                        label: newLabel
                    });

                    this.trigger(this.list);
                }
            },
            toggleAll: function(done) {
                this.list = this.list.map(function(item) {
                    return extend({ }, item, {
                        done: done
                    });
                });
                
                this.trigger(this.list);
            },
            clearDone: function() {
                this.list = this.list.filter(function(item) {
                    return !item.done;
                });
                
                this.trigger(this.list);
            },
            _getItem: function(itemId) {
                return this.list.filter(function(item) {
                    return (item.id === itemId);
                })[0];
            },
            _getItemIndex: function(itemId) {
                return this.list.indexOf(this._getItem(itemId));
            }
        });
    }


    return todoStore;

})();