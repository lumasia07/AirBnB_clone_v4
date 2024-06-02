$(document).ready(function () {

    const amenitiesSelected = {};

    $('input[type="checkbox"]').change(function () {
        const amenityID = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            amenitiesSelected[amenityID] = amenityName;
        } else {
            delete amenitiesSelected[amenityID];
        }

        const amenitiesList = Object.values(amenitiesSelected).join(', ');
        $('.amenities h4').text(amenitiesList);
    });

    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === "OK") {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }).fail(function () {
        $('#api_status').removeClass('available');
    });

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
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
});