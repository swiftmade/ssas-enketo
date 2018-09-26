import * as $ from 'jquery'

$(document).ready(function() {

    $('.save-progress').click(function () {
        Survey.save(true);
    });

    $('#close-button').click(function () {
        Survey.saveAndExit();
    });

    $('.validate-form').on('click', function () {
        Survey.validate().then(function () {
            toastr.success("The data looks valid!");
            $('.last-page').click();
        }).catch(function (error) {
            toastr.error(error.message ? error.message : "An unknown error occured");
        });
    });

    $('.first-page-alias').click(function () {
        $('.first-page').click()
    })

    $('.last-page-alias').click(function () {
        $('.last-page').click()
    })

    // validate handler for validate button
    $('.submit-form').on('click', function () {
        Survey.submit().then(function () {
            // Successful
            toastr.success("Your submission has been successfully saved on the device");
            $('.submit-form').remove();
        }).catch(function (error) {
            if (error.message == "redirected!") {
                return;
            }
            // Rejected!
            toastr.error(error.message ? error.message : "An unknown error occured");
        });

        return false;
    });
    
})