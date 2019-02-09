// Retrieve AJAX for events and populate HTML
// Sounds like according to brief the events placeholders are to be rendered first, then are to be replaced by the events fed by the AJAXed JSON

var eventsGlobs = {
	endpoint: 'https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/events.json',
	// DEFAULT EVENTS
	// These will be replaced when/if the events JSON file is retrieved
	events: [
		{
			description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
			imgUrlDesktop: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A.png",
			imgUrlDesktop2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A@2x.png",
			imgUrlMobile: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A.png",
			imgUrlMobile2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A@2x.png",
			title: "Event Title 1"
		}, {
			description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
			imgUrlDesktop: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A.png",
			imgUrlDesktop2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A@2x.png",
			imgUrlMobile: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A.png",
			imgUrlMobile2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A@2x.png",
			title: "Event Title 2"
		}, {
			description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
			imgUrlDesktop: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A.png",
			imgUrlDesktop2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A@2x.png",
			imgUrlMobile: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A.png",
			imgUrlMobile2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A@2x.png",
			title: "Event Title 3"
		}, {
			description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
			imgUrlDesktop: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A.png",
			imgUrlDesktop2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A@2x.png",
			imgUrlMobile: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A.png",
			imgUrlMobile2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A@2x.png",
			title: "Event Title 4"
		}, {
			description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
			imgUrlDesktop: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A.png",
			imgUrlDesktop2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A@2x.png",
			imgUrlMobile: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A.png",
			imgUrlMobile2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A@2x.png",
			title: "Event Title 5"
		}, {
			description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
			imgUrlDesktop: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A.png",
			imgUrlDesktop2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Desktop-Tablet_placeholder-A@2x.png",
			imgUrlMobile: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A.png",
			imgUrlMobile2x: "https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/Assets/Mobile_placeholder-A@2x.png",
			title: "Event Title 6"
		}
	]
};

const outputEvents = {

	getJSON: function(url){
		// none of this works for IE without a complex polyfill -_-
        // return new Promise(function(resolve, reject){
        //     let req = new XMLHttpRequest();
        //     req.open('GET', url);

        //     req.onload = function(){
        //         if(req.status == 200){
        //             resolve(req.response);
        //         } else {
        //             reject(Error(req.statusText));
        //         }
        //     };
        //     req.onerror = function(){
        //         reject(Error('Network Error'));
        //     }
        //     req.send();
		// })

		let req = new XMLHttpRequest();
		req.open('GET', url);
		req.onload = function() {
			if (req.status === 200) {
				console.log('success!');
				eventsGlobs.events = JSON.parse(req.responseText);
				outputEvents.renderEvents();
			}
			else {
				console.log('failed to retrieve events JSON', req.status);
			}
		};
		req.send();
    },

	eventTemplate: function(result){
		return `
		<a href="#" class="event col-1 col-md-2 col-lg-3">
			<div class="event-image">
				<div class="image" style="background-image:url( ${result.imgUrlDesktop} )"></div>
			</div>
			<div class="event-text">
				<div class="event-title"><h3> ${result.title} </h3></div>
				<div class="event-description"> ${result.description} </div>
			</div>
		</a>
		`
	},
	renderEvents: function(){
		document.getElementById('events-output').innerHTML = `
			${eventsGlobs.events.map(outputEvents.eventTemplate).join('')}
		`;
	},
	init: function(){
        // render the initial placeholders
		outputEvents.renderEvents();

		// then replace them with the stuff from the JSON file
		outputEvents.getJSON(eventsGlobs.endpoint);
	}
}

outputEvents.init();