/***************************
	      SANDBOX
  Comunicate with the core
****************************/

var SANDBOX = {
	create: function(core, module_selector) {
		// Grab the current element for the module
		var CONTAINER = core.dom.query('#' + module_selector);
		// Object functionality
		return {
			settings: function(setting) {
				if ("string" == typeof(setting)) {
					return core.settings(setting);
				}
			},
			config: function(config) {
				if (config && "object" == typeof(config)) {
					for (var setting in config) {
						core.setup[setting](config[setting]);
					}
				}
			},
			container: function(key) {
				return (typeof(key) === "number") ? CONTAINER[key] : CONTAINER;
			},
			find: function(selector, context) {
				return CONTAINER.query(selector, context);
			},
			addEvent: function(element, type, func) {
				core.dom.bind(element, type, func);
			},
			removeEvent: function(element, type, func) {
				core.dom.unbind(element, type, func);
			},
			effect: function(element, type, conf) {
				core.dom.effect(element, type, conf);
			},
			removeEffect: function(element, type, func) {

			},
			order: function(elements, property, func) {
				core.dom.sort(elements, property, func);
			},
			replace: function(element, data) {
				core.dom.replace(element, data);
			},
			push: function(element, data, reverse) {
				if (reverse) {
					core.dom.append(element, data);
				} else {
					core.dom.prepend(element, data);
				}
			},
			pull: function(element) {
				core.dom.remove(element);
			},
			request: function(action, settings) {
				core.server.request(action, settings);
			},
			notify: function(evt, data) {
				if (evt) {
					core.trigger_event(evt, data);
				}
			},
			listen: function(evts) {
				if (core.is_object(evts)) {
					core.register_events(evts, module_selector);
				}
			},
			log: function(severity, message) {
				core.log(severity, message);
			}
		}
	}
}