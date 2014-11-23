/*
CORE.create_sandbox('counter', function(sandbox) {

	var view, self, counter;

	return {
		init: function() {
			self = this;
			view = sandbox.container(0);
			counter = sandbox.find('.counter')[0];

			jQuery.get("http://localhost:3000/visa/0", self.handlePayload);
		},
		handlePayload: function(payload) {
			// Extract date
			var date = new Date(payload.data.date);
			// Pass date to countdown
			countdown(date, self.handleCountdown);
		},
		handleCountdown: function(complete) {
			if (complete !== true) console.log("Error");
			counter.innerHTML = complete;

			console.log(view)
			//alert('Completed yo!');
		},
		destroy: function() {

		}
	}
});
*/

alert('loaded counter script')

//CORE.start('counter');