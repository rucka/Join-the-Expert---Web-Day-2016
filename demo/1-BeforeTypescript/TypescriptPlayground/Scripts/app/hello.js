$(function() {
    $('#who').keyup(function() {
        sayHello($('#who').val());
    });
    sayHello($('#who').val());
});

function sayHello(who) {
    const url = '/home/hi/' + who;
    $.ajax(url, {
        method: 'GET',
        success: function (data) {
            $('#message').text(data);
        },
        error: function (jqXHR, textStatus, errorThrown) { 
            $('#message').text('error: ' + errorThrown);
        }
    });
}