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
});