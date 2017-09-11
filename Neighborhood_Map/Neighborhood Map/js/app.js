// Global Map and InfoWindow References
var map;
var infoWindow;

/* Initialize Google Map */
var createMap = function() {

	// handle Google Map API errors
	// (KO bindings haven't been applied, use jQuery here)
	if ( typeof google != 'object' || typeof google.maps != 'object') {

		// display error message
		$('.error-message').html('<h2>ERROR: could not load Google Maps API.</h2><h5>Do you have an Internet connection?</h5>');

		// hide search bar/result are
		$('.search-area').hide();

		// quit
		return false;
	}

	// Map settings
	var mapOptions = {
		center: {lat: 47.608, lng: -122.286},
		zoom: 12,
		disableDefaultUI: true
	};

	// Instantiate global map variable
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	// Instantiate global info window
	infoWindow = new google.maps.InfoWindow({
		maxWidth: 240
	});
	
	ko.applyBindings(new ViewModel());
};
	
/* ViewModel in MVVM */
var ViewModel = function() {

	// Reference to ViewModel
	var self = this;

	// Information about a single map location
	this.Location = function(title, lat, lng, keyWords, street, city) {

		// Store information about the location
		this.title = ko.observable(title);
		this.lat = ko.observable(lat);
		this.lng = ko.observable(lng);
		this.keyWords = ko.observableArray(keyWords);
		this.street = ko.observable(street);
		this.city = ko.observable(city);

		// Create map marker
		this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			animation: google.maps.Animation.DROP,
			title: title,
		});

		// Google Street View
		this.streetViewImg = ko.observable('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x400&key=AIzaSyC2X0ZGPMlvH1NUQLAhBoaoRriiNf2mTuk&location=' + street + ', ' + city + '">');

		// Wikipedia Links
		this.wikiInfo = ko.observable('');

		// Reference to current location for use in event handlers
		var temp = this;

		// Infowindow information
		this.info = ko.computed(function(){
			return '<div>'+
						'<h3>' + temp.title() + '</h3>'+
						'<div><p>'+
							temp.keyWords().join(', ')+'<br><br>'+
							temp.wikiInfo()+'<br>'+
							'<div class="hidden-xs hidden-sm col-md-12">'+temp.streetViewImg()+'</div>'+
						'</p></div>'+
					'</div>';
		});

		// Add click event to show info window
		google.maps.event.addListener(this.marker, 'click', function() {
			temp.reveal();			
		});

		this.reveal = function() {
			map.setCenter(temp.marker.getPosition());
			infoWindow.setContent(temp.info());
			infoWindow.open(map, temp.marker);	
			temp.marker.setAnimation(google.maps.Animation.BOUNCE);
				setTimeout(function(){
					temp.marker.setAnimation(null);
				},800);
		};

		// Set marker map
		this.marker.setMap(map);
	};

	// A list of all location objects
	this.generateLocationList = function() {

		// Declare variables
		var locations = [];
		var keyWords;

		// Instantiate all locations
		keyWords = ['market', 'shopping', 'coffee'];
		locations.push( ko.observable(new self.Location('Pike Place Market', 47.609612, -122.341893, keyWords, '85 Pike St', 'Seattle, WA')) );

		keyWords = ['gym', 'fitness', 'training'];
		locations.push( ko.observable(new self.Location('Gold\'s Gym', 47.609111, -122.334772, keyWords, '1310 4th Ave', 'Seattle, WA')) );

		keyWords = ['mall', 'shopping'];
		locations.push( ko.observable(new self.Location('Bellevue Square', 47.616503, -122.203628, keyWords, '510 Bellevue Way NE', 'Bellevue, WA')) );

		keyWords = ['arts', 'museum'];
		locations.push( ko.observable(new self.Location('Bellevue Arts Museum', 47.6152234, -122.2013076, keyWords, '555 110th Ave NE', 'Bellevue, WA')) );

		keyWords = ['education', 'school', 'computer science'];
		locations.push( ko.observable(new self.Location('University of Washington', 47.656156, -122.303572, keyWords, 'University of Washington', 'Seattle, WA')) );

		keyWords = ['kids', 'museum', 'science'];
		locations.push( ko.observable(new self.Location("KidsQuest Children\'s Museum", 47.6207678, -122.1963324, keyWords, '1111 110th Ave NE', 'Bellevue, WA')) );
		
		keyWords = ['reading', 'books', 'literature'];
		locations.push( ko.observable(new self.Location('Seattle Library', 47.608362, -122.332463, keyWords, '1000 4th Ave', 'Seattle, WA')) );

		return locations;
	};
	this.allLocations = ko.observable(this.generateLocationList());

	// Initial value for search input field
	var defaultString = '';

	// Search string
	this.searchString = ko.observable(defaultString);

	// Computed observable, filtered based on searchString
	this.locations = ko.computed(function() {

		// Instantiate observable array
		var filteredLocations = ko.observableArray();

		// Determine filter from search string
		var filter = self.searchString().toLowerCase();

		// Iterate over locations
		self.allLocations().forEach(function(location) {

			// Set all location markers to be invisible
			location().marker.setVisible(false);

			// Check if title contains filter or the filter is the default string
			if ( location().title().toLowerCase().indexOf(filter) != -1 || self.searchString() === defaultString) {
				filteredLocations.push(location());
				location().marker.setVisible(true);
			}
			else {
				var words  = location().keyWords();

				// Interate over all words
				for (var i = 0; i < words.length; i++) {
					
					// If word contains searchString, push location
					if (words[i].toLowerCase().indexOf(filter) != -1) {
						filteredLocations.push(location());
						location().marker.setVisible(true);
						break;
					}
				}
			}
		});
		return filteredLocations();
	});

	// Determine wikipedia information
	this.wikipedia = function () {

		var wikipediaRequest = function(index) {
			// Request
			$.ajax({
				url: wikiUrl,
				dataType: 'jsonp',
				success: function(response){

					// string to replace wikInfo
					var newWikiInfo = self.locations()[index].wikiInfo();
					newWikiInfo = newWikiInfo.concat('Wikipedia:');
					newWikiInfo = newWikiInfo.concat('<ul>');

					// obtain articles from reponse
					var articleList = response[1];

					if(articleList.length === 0){
						newWikiInfo = newWikiInfo.concat('<li>No Wikipedia info to display.</li>');
					}
					for (var j = 0; j < articleList.length; j++) {
						// display up to three wikipedia articles
						if (j > 2) {
							break;
						}
						var articleStr = articleList[j];
						var url = 'http://en.wikipedia.org/wiki/' + articleStr;
						newWikiInfo = newWikiInfo.concat('<li> <a href="' + url + '">' + articleStr + '</a></li>');
					}
					newWikiInfo = newWikiInfo.concat('</ul>');
					self.locations()[index].wikiInfo(newWikiInfo);
				},
				error: function(error){
					var newWikiInfo = self.locations()[index].wikiInfo();
					newWikiInfo = newWikiInfo.concat('Wikipedia: Failed to  get information. Check your internet connection.');
					self.locations()[index].wikiInfo(newWikiInfo);
					console.log(error);
				}
			});
		};

		// Iterate through all locations
		for (var i = 0; i < self.locations().length; i++){

			// Wikipedia AJAX Request
			var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + self.locations()[i].title() + '&format=json&callback=wikiCallBack';
			wikipediaRequest(i);
		}
	};
	this.wikipedia();
};

var failedMap = function(){
	$('.error-message').html('<h2>ERROR: could not load Google Maps API.</h2><h5>Do you have an Internet connection?</h5>');
	$('.search-area').hide();
};