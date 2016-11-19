const emailREx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const vatcodeREx = /^(IT)?[0-9]{11}$/;
const urlREx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const valOf = (name: string) => $(`#${name}`).val();
const checked = (name: string) => $(`#${name}`).is(':checked');

function validateEmail(email: string) {
    return emailREx.test(email);
}
function validateVatCode(vatcode: string) {
    return vatcodeREx.test(vatcode);
}
function validateUrl(url: string) {
    return urlREx.test(url);
}

class Customer {
    constructor(readonly name: string, readonly email: string, readonly website: string, readonly vatcode: string, readonly accepted: boolean) {}
    isValid() {
        return this.validate().length === 0;
    }
    validate() {
        let errors: string[] = [];
        if (this.name === '') {
            errors.push('name must be filled');
        }
        if (this.vatcode === '') {
            errors.push('vat code must be filled');
        }
        if (this.email === '') {
            errors.push('email must be filled');
        }
        if (!this.accepted) {
            errors.push('terms must be accepted');
        }
        if (this.email !== '' && !validateEmail(this.email)) {
            errors.push('email is not valid');
        }
        if (this.vatcode !== '' && !validateVatCode(this.vatcode)) {
            errors.push('vatcode is not valid');
        }
        if (this.website !== '' && !validateUrl(this.website)) {
            errors.push('website is not valid');
        }
        return errors;
    }
}

function getCustomer() {
    const name = valOf('Name');
    const email = valOf('Email');
    const vatcode = valOf('VATCode');
    const website = valOf('Website');
    const accepted = checked('Accept');
    return new Customer(name, email, website, vatcode, accepted);
}

const submit = $('button[type="submit"]');
submit.click(dv => {
    const customer = getCustomer();
    if (customer.isValid()) {
        $('#errors').addClass('hidden');
        return true;
    }
    const errors = customer.validate();
    $('#errors').empty();
    errors.forEach(e => {
        $('#errors').append(`<li>${e}</li>`);
    });
    $('#errors').removeClass('hidden');
    return false;
});