/*************************
	    jQuery Core
  Comunicate with jQuery
*************************/

//var socket = io.connect('http://localhost:3000');

var CORE = (function() {
	var moduleData = {},
		config = {
			debug: false,
			io: false
		};

	return {
		settings: function(item) {
			return (item in config) ? config[item] : null;
		},
		setup: function(settings) {
			for (var item in settings) {
				config[item] = settings[item];
			}
			/*
			debug: function(on) {
				debug = on ? true : false;
			},
			socket: function(on) {
				io = (on && typeof socket !== "undefined") ? true : false;
				console.info("Socket = " + io);
			}
			*/
		},
		create_sandbox: function(moduleID, creator) {
			var temp;
			// Check paramaters supplied are of correct data type
			if (typeof(moduleID) === 'string' && typeof(creator) === 'function') {
				// Create a SANDBOX instance and cache in temp
				temp = creator(SANDBOX.create(this, moduleID));
				// Check temp is the correct data type and has the required funtions
				if (temp && temp.init && typeof(temp.init) === 'function' && temp.destroy && typeof(temp.destroy) === 'function') {
					// Clear temp cache
					temp = null;
					// Store the module
					moduleData[moduleID] = {
						create: creator,
						instance: null
					}
				} else {
					// Log incorect data type for instance
					this.log(1, "Create Module '" + moduleID + "'' : FAILED : Instance has no init or destroy function.");
				}
			} else {
				// Log incorect data type for paramaters
				this.log(1, "Identify module '" + moduleID + "'' : FAILED : One or more supplied paramaters are of incorrect type.");
			}
		},
		start: function(moduleID) {
			var module = moduleData[moduleID];
			if (module) {
				module.instance = module.create(SANDBOX.create(this, moduleID));
				module.instance.init();
			};
		},
		start_all: function() {
			var moduleID;
			for (moduleID in moduleData) {
				if (moduleData.hasOwnProperty(moduleID)) {
					this.start(moduleID);
				}
			}
		},
		stop: function(moduleID) {
			var data;
			if (data = moduleData[moduleID] && data.instance) {
				data.instance.destroy();
				data.instance = null;
			} else {
				this.log(1, "Stop Module '" + moduleID + "' : FAILED : module does not exist or has not been started.");
			}
		},
		stop_all: function() {
			var moduleID;
			for (moduleID in moduleData) {
				if (moduleData.hasOwnProperty(moduleID)) {
					this.stop(moduleID);
				}
			}
		},
		register_events: function(events, module) {
			if (this.is_object(events) && module) {
				if (moduleData[module]) {
					moduleData[module].events = events;
				} else {
					this.log(1, "Registering Module '" + to_string(module) + "' : FAILED : data could not be found for this module.");
				}
			} else {
				this.log(1, "Module '" + to_string(module) + "' Registration : FAILED : events supplied where not of object format.");
			}
		},
		trigger_event: function(name, data) {
			var module;
			for (module in moduleData) {
				if (moduleData.hasOwnProperty(module)) {
					module = moduleData[module];
					if (module.events && module.events[name]) {
						module.events[name](data);
					}
				}
			}
		},
		remove_events: function(evts, module) {
			if (this.is_object(evts) && module && (module = moduleData[module]) && module.events) {
				delete module.events;
			}
		},
		server: {
			request: function(action, settings) {
				if (settings.protocol && settings.protocol === "socket" && io) {
					socket.emit(action + "-" + settings.url, settings.data);
				} else {
					if (this[action] && typeof action === "string") {
						this[action](settings.url, settings.data);
					} else {
						CORE.log(1, "Method '" + action + "' invalid : FAILED : requested method is not supported.");
					}
				}
			},
			respond: function(data, status) {
				CORE.trigger_event({
					type: "success",
					data: data
				});
			},
			transmit: function() {
				// Back and forth events
				if (io) {
					// Attempt a socket connection
				} else {
					// Send appropriate ajax call
				}
				// Take an emit event and store listen events?
			},
			didReceiveResponse: function(response) {
				// Deconstruct response
			},
			didReceiveData: function(chunk) {

			},
			read: function(url, data) {
				jQuery.ajax("/" + url, {
					type: "get",
					data: {
						content: data
					},
					dataType: "json",
					success: this.respond
				});
			},
			write: function(url, data) {
				jQuery.ajax("/" + url, {
					type: "post",
					data: data,
					dataType: "json",
					success: this.respond
				});
			},
			update: function() {

			},
			delete: function() {

			}
		},
		dom: {
			query: function(selector, context) {
				var element = {},
					self = this,
					jQueryelement;
				// Determine context or global search
				if (context && context.find) {
					// Search within element for selector
					jQueryelement = context.find(selector);
				} else {
					// Global search
					jQueryelement = jQuery(selector);
				}

				element = jQueryelement.get();
				element.length = jQueryelement.length;
				element.query = function(selector) {
					return self.query(selector, jQueryelement);
				}
				return element;
			},
			bind: function(element, evt, func) {
				if (element && evt) {
					if (typeof(evt) === 'function') {
						func = evt;
						evt = 'click';
					}
					jQuery(element).bind(evt, func);
				} else {
					CORE.log(1, "Bind Event '" + evt + "' to element '" + element + "' : FAILED : One or more required paramaters are missing.");
				}
			},
			unbind: function(element, evt, func) {
				if (element && evt) {
					// If evt is function then make it's value equal func and default click on evt
					if (typeof(evt) === 'function') {
						func = evt;
						evt = 'click'
					}
					jQuery(element).unbind(evt, func);
				} else {
					CORE.log(1, "Unbind Event '" + evt + "' to element '" + element + "' : FAILED : One or more required paramaters are missing.");
				}
			},
			sort: function(stack, property, callback) {
				if (stack && property && typeof(property) === "string") {
					for (var element in stack) {
						console.log(stack[element][property])
					}
				}
			},
			replace: function(element, data) {
				if (element && data) {
					element.innerHTML = data;
				} else {
					CORE.log(1, "The element '" + element + "' could not be replaced with the data '" + data + "' : FAILED : One or more required paramaters are missing.")
				}
			},
			append: function(container, element) {
				if (container && element) {
					container.innerHTML += element;
				} else {
					CORE.log(1, "The data '" + element + "' could not be appended to the container '" + container + "' : FAILED : One or more required paramaters are missing.")
				}
			},
			prepend: function(container, element) {
				if (container && element) {
					container.innerHTML = element + container.innerHTML;
				} else {
					CORE.log(1, "The data '" + element + "' could not be appended to the container '" + container + "' : FAILED : One or more required paramaters are missing.")
				}
			},
			remove: function(element) {
				if (element) {
					element.parentNode.removeChild(element);
				}
			},
			effect: function(element, type, conf) {
				if (element && type) {
					jQuery(element)[type](conf);
				} else {
					CORE.log(1, "The action '" + type + "' failed to trigger on '" + element + "' : FAILED : One or more required paramaters are missing.")
				}
			}
		},
		animate: {
			// A bunch of pre determined effects and controls
			// Transition replace element
			// Slide up and down
		},
		is_array: function(array) {
			return jQuery.isArray(array);
		},
		is_object: function(object) {
			return jQuery.isPlainObject(object);
		},
		log: function(severity, message) {
			if (config.debug) {
				switch (severity) {
					case 1:
						console.error(message);
						return;
					case 2:
						console.warn(message);
						return;
					case 3:
						console.info(message);
						return;
					case 4:
						console.log(message);
						return;
					default:
						console.log(message);
						return;
				}
			} else {
				// report to server
			}
		}
	}
}());