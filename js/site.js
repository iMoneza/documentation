$(function() {
    $('.swagger-method-title').on('click', function(e) {
        var item = $(this).next('.swagger-method-details');
        $(item).collapse('toggle');
    });
});
