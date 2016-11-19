const emailREx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const vatcodeREx = /^(IT)?[0-9]{11}$/;
const urlREx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const valOf = (name: string) => $(`#${name}`).val();
const checked = (name: string) => $(`#${name}`).is(':checked');

interface NameIsEmpty { kind: 'NameIsEmpty' };
interface NameIsTooShort { kind: 'NameIsTooShort', name: string };
interface VatCodeIsEmpty { kind: 'VatCodeIsEmpty' };
interface VatCodeNotValid { kind: 'VatCodeNotValid', vatcode: string };
interface EmailIsEmpty { kind: 'EmailIsEmpty' };
interface EmailIsNotValid { kind: 'EmailIsNotValid', email: string };
interface TermsNotAccepted { kind: 'TermsNotAccepted' };
interface WebsiteUrlNotValid { kind: 'WebsiteUrlNotValid', url: string };

function validateName(name: string): string | NameIsEmpty | NameIsTooShort {
    if (name === '') return { kind: 'NameIsEmpty' };
    return name.length > 3 ? name : {  kind: 'NameIsTooShort', name: name };
}
function validateEmail(email: string): string | EmailIsEmpty | EmailIsNotValid {
    if (email === '') return { kind: 'EmailIsEmpty' };
    return emailREx.test(email) ? email : { kind: 'EmailIsNotValid', email: email };
}
function validateVatCode(vatCode: string): string | VatCodeIsEmpty | VatCodeNotValid {
    if (vatCode === '') return { kind: 'VatCodeIsEmpty' };
    return vatcodeREx.test(vatCode) ? vatCode : { kind: 'VatCodeNotValid', vatcode: vatCode };
}
function validateUrl(url: string): string | WebsiteUrlNotValid {
    if (url === '') return url;
    return urlREx.test(url) ? url : { kind: 'WebsiteUrlNotValid', url: url };
}
function validateAccept(accept: boolean): boolean | TermsNotAccepted {
    return accept ? true : { kind: 'TermsNotAccepted' };
}

type Customer = {
    name: string,
    email: string,
    vatCode: string,
    website: string,
    accepted: boolean
};
function buildCustomer(name: string, email: string, vatCode: string, website: string, accepted: boolean) {
    return {
        name: name,
        email: email,
        vatCode: vatCode,
        website: website,
        accepted: accepted
    };
}

type CustomerError =
    NameIsEmpty | NameIsTooShort |
    VatCodeIsEmpty | VatCodeNotValid |
    EmailIsEmpty | EmailIsNotValid |
    WebsiteUrlNotValid | TermsNotAccepted
    ;

function errorMessage(e: CustomerError): string {
    switch (e.kind) {
        case 'NameIsEmpty': return 'Name cannot be empty';
        case 'NameIsTooShort': return `Name must be at least 3 chars long, actual is ${e.name.length}`;
        case 'EmailIsEmpty': return 'Email cannot be empty';
        case 'EmailIsNotValid': return `Email address '${e.email}' is not valid`;
        case 'VatCodeIsEmpty': return 'VAT code cannot be empty';
        case 'VatCodeNotValid': return `VAT code '${e.vatcode}' is not valid`;
        case 'WebsiteUrlNotValid': return `Url '${e.url}' is not valid`;
        case 'TermsNotAccepted': return 'Terms must be accepted';
    }
}

function saveCustomer(data: Validation.Valid<Customer>): true {
    $('#errors').addClass('hidden');
    return true;
}

function showErrors(data: Validation.Invalid<CustomerError>): false {
    $('#errors').empty();
    data.errors.forEach(e => {
        $('#errors').append(`<li>${errorMessage(e)}</li>`);
    });
    $('#errors').removeClass('hidden');
    return false;
}

//Validation can hold either a success value or a failure value (i.e. an error message or some other failure) and has methods for accumulating errors. We will represent a Validation like this: Validation<E,A> where E represents the error type and A represents the success type.
$(() => {
    const submit = $('button[type="submit"]');
    submit.click(dv => {
        /* //uncomment to see how the functional rule "A customer could be saved only if valid" is enforced at compile time (a customer type cannot be saved)
        const notValidatedCustomer = buildCustomer(valOf('Name'), valOf('Email'), valOf('VATCode'), valOf('Website'), checked('Accept'));
        saveCustomer(notValidatedCustomer);
        */
        const nameValidated: Validation.Validated<CustomerError, string> = Validation.bind<CustomerError, string>(valOf('Name'), validateName);
        const emailValidated = Validation.bind<CustomerError, string>(valOf('Email'), validateEmail);
        const vatcodeValidated = Validation.bind<CustomerError, string>(valOf('VATCode'), validateVatCode);
        const websiteValidated = Validation.bind<CustomerError, string>(valOf('Website'), validateUrl);
        const acceptValidated: Validation.Validated<CustomerError, Boolean> = Validation.bind<CustomerError, boolean>(checked('Accept'), validateAccept);
        
        const validatedCustomer: Validation.Validated<CustomerError, Customer> = Validation.for5 (
            nameValidated,
            emailValidated,
            vatcodeValidated,
            websiteValidated,
            acceptValidated,
            buildCustomer);

        const text: Validation.Validated<CustomerError, string> = Validation.map(validatedCustomer, c => `${c.name}(${c.email})`);
        Validation.foreach(text, t => alert(`I'm ${t}!`));

        if (Validation.isValid(validatedCustomer)) {
            return saveCustomer(validatedCustomer);
        } else {
            return showErrors(validatedCustomer);
        }
    });
});

/*//getting rid of null values altogether and providing our own type for representing optional values, i.e. values that may be present or not: the Option<A>
$(() => {
    const submit = $('button[type="submit"]');
    submit.click(dv => {
        const nameOptional: Optional.Option<string> = Optional.bind<string>(valOf('Name'));
        const emailOptional = Optional.bind<string>((valOf('Email'));
        const vatcodeOptional = Optional.bind<string>(valOf('VATCode'));
        const websiteOptional = Optional.bind<string>(valOf('Website'));
        const acceptOptional: Optional.Option<boolean> = Optional.bind<boolean>(checked('Accept'));

        const optionalCustomer: Optional.Option<Customer> = Optional.for5(
            nameOptional,
            emailOptional,
            vatcodeOptional,
            websiteOptional,
            acceptOptional,
            buildCustomer);

        const text: Optional.Option<string> = Optional.map(optionalCustomer, c => `${c.name}(${c.email})`);
        Optional.foreach(text, t => alert(`I'm ${t}!`));

        if (Optional.isSome(optionalCustomer)) {
            return saveCustomer(optionalCustomer);
        } else {
            return showErrors(optionalCustomer);
        }

        function saveCustomer(data: Optional.Some<Customer>): true {
            $('#errors').addClass('hidden');
            return true;
        }

        function showErrors(data: Optional.None): false {
            $('#errors').empty();
            $('#errors').append(`<li>customer has null values</li>`);
            $('#errors').removeClass('hidden');
            return false;
        }
    });
});
*/

/*//Use the Future<T> type to write highly readable and composable asynchronously executing code
$(() => {
    const asyncValOf = (name: string) => (cb: Async.Callback<string>) => cb(null, valOf(name));
    const asyncChecked = (name: string) => (cb: Async.Callback<Boolean>) => cb(null, checked(name));

    const submit = $('button[type="submit"]');
    submit.click(dv => {
        const nameFuture: Async.Future<string> = Async.bind<string>(asyncValOf("Name"));
        const emailFuture = Async.bind<string>(asyncValOf('Email'));
        const vatcodeFuture = Async.bind<string>(asyncValOf('VATCode'));
        const websiteFuture = Async.bind<string>(asyncValOf('Website'));
        const acceptFuture: Async.Future<Boolean> = Async.bind<boolean>(asyncChecked('Accept'));

        const futureCustomer: Async.Future<Customer> = Async.for5(
            nameFuture,
            emailFuture,
            vatcodeFuture,
            websiteFuture,
            acceptFuture,
            buildCustomer);

        const text: Async.Future<string> = Async.map(futureCustomer, c => `${c.name}(${c.email})`);
        Async.foreach(text, t => alert(`I'm ${t}!`));

        Async.onComplete<Customer>(futureCustomer, (fr: Async.FutureResult<Customer>) => {
            if (Async.isSuccess(fr)) {
                saveCustomer(fr);
            } else {
                showErrors(fr);
            }
        });
        
        function saveCustomer(data: Async.Success<Customer>): true {
            $('#errors').addClass('hidden');
            return true;
        }

        function showErrors(data: Async.Failure): false {
            $('#errors').empty();
            $('#errors').append(`<li>retrieve customer failure: ${data.}</li>`);
             $('#errors').removeClass('hidden');
            return false;
        }  
    });
});
*/