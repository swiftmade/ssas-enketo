import * as $ from 'jquery'
import Kernel from '../Kernel'
import EnketoForm from '../EnketoForm'

$(document).ready(function() {

    $('.save-progress').click(function () {
        EnketoForm.save()
    })

    $('#close-button').click(function () {
        Kernel.exit()
    })

    $('.validate-form').on('click', function () {

        EnketoForm.validate()
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