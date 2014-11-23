CORE.setup({
	socket: "http://localhost:3000",
	debug: true
});

window.onload = function() {
	resizeWindow(window.innerWidth, window.innerHeight);
}

window.onresize = function(event) {
	var element = event.target;
	resize(element.innerWidth, element.innerHeight);
}

function resizeWindow(width, height) {

	var body = document.getElementsByTagName("body")[0];

	body.style.width = width + 'px';
	body.style.height = height + 'px';
}

function animateViewOffset(element, offset) {
	jQuery(element).animate({left:offset});
}

function countdown(date, complete) {
	// Store the date we are counting to
	var targetTime = date.getTime()
	,	currentTime = +new Date
	,	timeDiference = (targetTime - currentTime);
	// Condition
	console.log(Math.round(timeDiference/1000) + " diference in time")
	// Create timer
	var handle = setInterval(function() {

		timeDiference = timeDiference - 1000;

		if (timeDiference <= 0) {
			complete(true);
			clearInterval(handle);
		} else {
			complete(Math.round(timeDiference/1000));
		}

	}, 1000);
}

CORE.create_sandbox("notification", function(sandbox) {
	var view;
	return {
		init: function() {
			view = sandbox.container(0);
		},
		destroy: function() {

		}
	}
});

CORE.create_sandbox("feature", function(sandbox) {

	var view, self, button, showing, content;

	return {
		init: function() {
			self = this;
			view = sandbox.container(0);
			content = sandbox.find('.content')[0];
			button = sandbox.find('.menu-btn');

			sandbox.addEvent(button, 'click', this.toggle);

			this.expandMenu()

			sandbox.listen({'update-content': this.updateContent, 'highlight-feature': this.contractMenu})
		},
		handlePayload: function(payload) {
			// Extract date
			var date = new Date(payload.data.date);
			// Pass date to countdown
			countdown(date, self.handleCountdown);
		},
		updateContent: function(element) {
			content.innerHTML = element;
		}, 
		expandMenu: function() {
			animateViewOffset(view, '60%');
			//view.style.left = '30%';
			showing = true;
		},
		contractMenu: function() {
			animateViewOffset(view, '0%');
			showing = false;
		},
		toggle: function(sender) {
			if (showing) {
				self.contractMenu();
			} else {
				self.expandMenu();
			}
		},
		destroy: function() {

		}
	}
});

CORE.create_sandbox('form', function(sandbox) {

	var view, input, submit;

	return {
		init: function() {
			view = sandbox.container(0);
			input = sandbox.find('.field');
			submit = sandbox.find('.submit');

			console.log(submit)

			sandbox.addEvent(submit, 'click', this.postForm);
		},
		postForm: function(sender) {
			sender.preventDefault();
			console.log('button clicked');
		},
		destroy: function() {

		}
	}
});

CORE.create_sandbox('login', function(sandbox) {

	var view, fields, buttons;

	return {
		init: function() {
			view = sandbox.container(0);
			fields = sandbox.find('.field');
			buttons = sandbox.find('.button');

			sandbox.addEvent(buttons, 'click', this.buttonClicked);
		},
		buttonClicked: function(sender) {
			sender.preventDefault();
			console.log('button clicked');
		},
		destroy: function() {

		}
	}
});

CORE.create_sandbox("menu", function(sandbox) {

	var view, self, buttons;

	return {
		init: function() {
			self = this;
			view = sandbox.container(0);
			buttons = sandbox.find('li');
			sandbox.addEvent(buttons, 'click', this.buttonClicked);
		},
		buttonClicked: function(sender) {
			jQuery.get( "http://localhost:3000/" + sender.currentTarget.dataset.item, self.didReceiveResponse);
		},
		didReceiveResponse: function(payload) {
			var data = payload.data;
			sandbox.notify('highlight-feature');
			sandbox.notify('update-content', data.content);
		},
		destroy: function() {

		}
	}
});

CORE.start_all();