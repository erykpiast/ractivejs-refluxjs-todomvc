module.exports = (function() {
    
	
	function _makeKeyboardEvent(keyCode) {
		return function (node, fire) {
			var keydownHandler = function (e) {
				if (e.which === keyCode) {
					fire({
						node: node,
						original: event
					});
				}
			};

			node.addEventListener('keydown', keydownHandler, false);

			return {
				teardown: function () {
					node.removeEventListener('keydown', keydownHandler, false);
				}
			};
		};
	}
	
	
	return {
		enter: _makeKeyboardEvent(13),
		escape: _makeKeyboardEvent(27)
	};
	
})();