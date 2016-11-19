/* //custom JQuery type definition: uninstall the jquery.TypeScript.DefinitelyType nuget package and un comment to use the custom definition
interface JQueryStatic {
    (callback: () => any): JQuery;
    (selector: string): JQuery;
    ajax(url: string, params: AjaxSettings): JQuery;
}

interface AjaxSettings {
    method: string;
    success(data: string): void;
    error(jqXHR: any, textStatus: string, errorThrown: string): void;
}

interface JQuery {
    keyup(callback: () => any): JQuery;
    val(): string;
    text(value: string): string;
}

declare var $: JQueryStatic;
*/

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
            return $('#message').text(data);
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
            if (data.HasSinglename) return $('#message').text(`Hello ${data.Singlename}!`);
            return $('#message').text(`Hello Mr. ${data.Firstname} ${data.Lastname}!`);
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
