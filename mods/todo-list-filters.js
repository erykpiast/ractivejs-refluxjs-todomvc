module.exports = (function() {
    'use strict';
    
    return {
        ALL: function allFilter(item) {
            return true;
        },
        DONE: function doneFilter(item) {
            return !!item.done;
        },
        IN_PROGRESS: function inPorgressFilter(item) {
            return !item.done;
        }
    };
    
})();