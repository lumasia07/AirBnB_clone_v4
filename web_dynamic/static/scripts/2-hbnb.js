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
});