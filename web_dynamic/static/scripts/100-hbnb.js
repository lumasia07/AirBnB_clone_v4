$(document).ready(function () {
    const amenitiesSelected = {};
    const statesSelected = {};
    const citiesSelected = {};
  
    $('input[type="checkbox"]').change(function () {
      const isAmenity = $(this).closest('div').hasClass('amenities');
      const isState = $(this).closest('ul').parent('li').children('input[type="checkbox"]').length === 1;
      const isCity = !isAmenity && !isState;
  
      const id = $(this).attr('data-id');
      const name = $(this).attr('data-name');
  
      if (isAmenity) {
        if ($(this).is(':checked')) {
          amenitiesSelected[id] = name;
        } else {
          delete amenitiesSelected[id];
        }
        const amenitiesList = Object.values(amenitiesSelected).join(', ');
        $('.amenities h4').text(amenitiesList);
      } else if (isState) {
        if ($(this).is(':checked')) {
          statesSelected[id] = name;
        } else {
          delete statesSelected[id];
        }
        updateLocationsList();
      } else if (isCity) {
        if ($(this).is(':checked')) {
          citiesSelected[id] = name;
        } else {
          delete citiesSelected[id];
        }
        updateLocationsList();
      }
    });
  
    function updateLocationsList() {
      const statesList = Object.values(statesSelected).join(', ');
      const citiesList = Object.values(citiesSelected).join(', ');
      const locationsList = [statesList, citiesList].filter(Boolean).join(', ');
      $('.locations h4').text(locationsList);
    }
  
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === "OK") {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }).fail(function () {
      $('#api_status').removeClass('available');
    });
  
    function allPlaces(filterData) {
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(filterData),
        success: function (data) {
          $('section.places').empty();
          for (const place of data) {
            const article = $('<article></article>');
  
            const titlePlace = $('<div class="title_box"></div>');
            titlePlace.append(`<h2>${place.name}</h2>`);
            titlePlace.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
  
            const moreInfo = $('<div class="information"></div>');
            moreInfo.append(`<div class="max_guest">${place.max_guest} Guests</div>`);
            moreInfo.append(`<div class="number_rooms">${place.number_rooms} Bedrooms</div>`);
            moreInfo.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>`);
  
            const des = $('<div class="description"></div>');
            des.append(`<p>${place.description}</p>`);
  
            article.append(titlePlace);
            article.append(moreInfo);
            article.append(des);
  
            $('section.places').append(article);
          }
        },
        error: function (error) {
          console.log('Error:', error);
        }
      });
    }
  
    allPlaces({});
  
    $('button').click(function () {
      const filterData = {
        amenities: Object.keys(amenitiesSelected),
        states: Object.keys(statesSelected),
        cities: Object.keys(citiesSelected)
      };
      allPlaces(filterData);
    });
  });
  