/**
 * Created by Kelli Marquardt on 6/30/2015.
 */
var geocoder;  // A geocoder for a map
var map;     // The actual interactive map on the page
var number = "";
var street = "";
var cityStreet = "";
var stateStreet = "";
var descriptor = "";
var route = "";
var box = "";
var cityRR = "";
var stateRR = "";
var cityPO = "";
var statePO = "";


/**
 *  Returns a random mapView
 *  @return {mapTypeId} mapView This returns a random mapView
 */
function randomizeView() {
    var randomNum = Math.floor((Math.random() * 3) + 1); // Generate a number between 1 and 3
    var mapView;
    switch(randomNum) {
        case(1):
            mapView = google.maps.MapTypeId.ROADMAP;
            break;
        case(2):
            mapView = google.maps.MapTypeId.SATELLITE;
            break;
        default:
            mapView = google.maps.MapTypeId.TERRAIN;
    }
    return mapView;
}

/**
 * Initializes an interactive Google Map with a geocoder
 * @param {boolean} randomize Parameter that determines whether or not the user wants the map view randomized.
 *          set to false by default if user does not specify
 */
function initialize(randomize) {
    randomize = randomize || false;  // If the user does not pass in an argument for randomize, assume false
    var mapView = (randomize) ? randomizeView() : google.maps.MapTypeId.ROADMAP;

    geocoder = new google.maps.Geocoder();
    var lat = 38.8977;  // latitude and longitude of the White House
    var long = -77.0366;
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        center: new google.maps.LatLng(lat,long),
        zoom: 17,  // 17 is a reasonably high zoom level
        mapTypeId: mapView
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

/**
 * Concatenates an address from HTML fields and calls a geocoding function with
 * the concatenated address
 */
 

/**
 * Concatenates a rural route address from HTML fields and calls a geocoding function with
 * the concatenated address
 */


/**
 * Concatenates a P.O. Box from HTML fields and calls a geocoding function with
 * the concatenated address.
 *
 * Right now, it only geocodes a particular city and state because we cannot reverse geocode
 * post offices right now.
 */

/**
 * Geocodes an address and shows the resulting address on a Google Map and takes appropriate actions
 * If the user passes in a partial address, give possible corrections and let the user select one of them.
 * This also contains code to delete the old marker when a new address is typed in.
 *
 * @param address A concatenated address from codeAddress(), codeRuralRoute(), or codePOBox().  It will
 *      be used with the global geocoder variable.
 */





function geocodeAddressStreet(number,street,city,state) {
  var address="";
  address=address.concat(number.value," ",street.value, " ",city.value, ", ",state.value) ;
  
  
    geocoder.geocode({'address': address}, function (results, status) {
        /*  Essentially, partial_match is true whenever Google uses some sort of autocompletion
         to fix the user input
         Step 1- check if "partial_match" was defined
         -  For some reason, "partial_match" isn't initialized when the user gives a valid input
         Step 2- if the user gave a bad input, warn them
        
         Information on partial_match can be found at
         https://developers.google.com/maps/documentation/geocoding/
         */

        if (typeof results[0].partial_match !== 'undefined') {
            alert("We did not find a match for your address. You entered: " + address +
                "\n\nDid you mean: " + results[0].formatted_address + "?");
            //return;  // Used for testing purposes; does not return anything on the map. //I want to return the partial match
        }
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            if (map.marker) {    // See lines 53 and 54 at http://jsfiddle.net/zbZ8p/1/
                map.marker.setMap(null);
                delete map.marker;    // Erase the existing marker
            }

            map.marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}


function geocodeAddressRR(descriptor,route,box,cityRR,stateRR) {
  var address="";
  address=address.concat(descriptor.value," ", route.value, " ","Box", " ", box.value, ", ",cityRR.value, ", ", stateRR.value) ;
  

  
    geocoder.geocode({'address': address}, function (results, status) {
        /*  Essentially, partial_match is true whenever Google uses some sort of autocompletion
         to fix the user input
         Step 1- check if "partial_match" was defined
         -  For some reason, "partial_match" isn't initialized when the user gives a valid input
         Step 2- if the user gave a bad input, warn them
        
         Information on partial_match can be found at
         https://developers.google.com/maps/documentation/geocoding/
         */

        if (typeof results[0].partial_match !== 'undefined') {
            alert("We did not find a match for your address. You entered: " + address +
                "\n\nDid you mean: " + results[0].formatted_address + "?");
            //return;  // Used for testing purposes; does not return anything on the map. //I want to return the partial match
        }
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            if (map.marker) {    // See lines 53 and 54 at http://jsfiddle.net/zbZ8p/1/
                map.marker.setMap(null);
                delete map.marker;    // Erase the existing marker
            }

            map.marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

function geocodeAddressPO(cityPO, statePO) {
  var address="";
  address=address.concat(cityPO.value, ", ", statePO.value) ;
  

  
    geocoder.geocode({'address': address}, function (results, status) {
        /*  Essentially, partial_match is true whenever Google uses some sort of autocompletion
         to fix the user input
         Step 1- check if "partial_match" was defined
         -  For some reason, "partial_match" isn't initialized when the user gives a valid input
         Step 2- if the user gave a bad input, warn them
        
         Information on partial_match can be found at
         https://developers.google.com/maps/documentation/geocoding/
         */

        if (typeof results[0].partial_match !== 'undefined') {
            alert("We did not find a match for your address. You entered: " + address +
                "\n\nDid you mean: " + results[0].formatted_address + "?");
            //return;  // Used for testing purposes; does not return anything on the map. //I want to return the partial match
        }
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            if (map.marker) {    // See lines 53 and 54 at http://jsfiddle.net/zbZ8p/1/
                map.marker.setMap(null);
                delete map.marker;    // Erase the existing marker
            }

            map.marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
