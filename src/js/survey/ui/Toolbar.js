import Kernel from '../Kernel'
import EnketoForm from '../EnketoForm'

$(document).ready(function() {

    $('.save-progress').click(function () {
        EnketoForm.save()
    })

    $('#close-button').click(function () {
        Kernel.saveAndExit()
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

        const $self = $(this)
        $self.attr('disabled', 'disabled')

        Kernel.submit().catch(e => {
            console.error(e)
            $self.removeAttr('disabled')
        })

        return false
    });
    
})