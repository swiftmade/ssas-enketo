import * as $ from 'jquery'
const emitter = require('tiny-emitter/instance')
import queryParams from '../../common/QueryParams'
import SessionManager from '../sessions/SessionManager'

/**
 * Set event listeners
 */
$(document).ready(() => setBackgroundImage())
emitter.once('EnketoForm.initialized', () => showSurvey())

/**
 * Callbacks
*/

const setBackgroundImage = () => {
    if (!queryParams.has('bg')) {
        return;
    }
    var style = "content: ' ';" +
        "display: block;" +
        "position: absolute;" +
        "top: 0;" +
        "left: 0;" +
        "width: 100%;" +
        "height: 100%;" +
        "opacity: 0.2;" +
        "z-index: -1;" +
        "background-image: url('" + queryParams.get('bg') + "');" +
        "background-size: cover;" +
        "background-position: center;" +
        "background-repeat: no-repeat;"

    $('<style>' + '#loading-block:after { ' + style + '} </style>')
        .appendTo('head')
}

const showSurvey = () => {

    if (!SessionManager.driver.canSave()) {
        document.querySelector('.save-progress').remove()
    }

    document.querySelector('.form-header').style.display = 'block'
    document.querySelector('#submit-progress').style.display = 'none'
    document.querySelector('#loading-block').remove()
    window.scrollTo(0, 0)

}
