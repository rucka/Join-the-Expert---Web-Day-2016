/*
$(() => {
    $('#who').keyup(() => {
        sayHello($('#who').val());
    });
    sayHello($('#who').val());
});
*/
$(() => {
    $('#who').keyup(() => {
        sayWho($('#who').val());
    });
    sayWho($('#who').val());
});

function sayHello(who: string) {
    const url = '/home/hi/' + who;
    httpGetRequest<string>(
        url,
        (e, data) => {
            if (e) return $('#message').text(`error: ${e}`);
            if (data) $('#message').text(data);
        }
    );
}

type Who = {
    Firstname: string,
    Lastname: string,
    Singlename: string,
    HasSinglename: boolean
}

function sayWho(who: string) {
    const url = '/home/who/' + who;
    httpGetRequest<Who>(
        url,
        (e, data) => {
            if (e) return $('#message').text(`error: ${e}`);
            if (data && data.HasSinglename) return $('#message').text(`Hello ${data.Singlename}!`);
            if (data) return $('#message').text(`Hello Mr. ${data.Firstname} ${data.Lastname}!`);
        }
    );
}

function httpGetRequest<T>(url: string, complete: (error: string | null, data: T | null) => void): any {
    $.ajax(url, {
        method: 'GET',
        success: (data: T, textStatus: string, jqXHR: any) => complete(null, data),
        error: (jqXHR: any, textStatus: string, errorThrown: string) => complete(errorThrown, null)
    })
}
