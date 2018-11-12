import $ from 'jquery'
import queryParams from '../../common/QueryParams'
const emitter = require('tiny-emitter/instance')

export default class Sms {
    
    constructor(session) {
        this.session = session
    }

    transcode(xml) {
        return (new EnketoXmlParser(xml)).parse()
    }

    objectToText(object) {
        return Object.keys(object)
            .map(key => `${key}:${object[key]}`)
            .join(';')
    }

    async submit() {
        const number = queryParams.get('sms')

        let output = {
            ...(typeof this.session.data.payload === 'object' ? this.session.data.payload : {}),
            ...this.transcode(this.session.data.xml)
        }
    
        const smsLink = this._smsLink(
            number,
            this.objectToText(output)
        )

        window.clickSendSms = () => {
            emitter.emit('SMS.click')
        }

        emitter.emit(
            'EnketoForm.submit.status',
            '<a href="' + smsLink + '" class="btn btn-primary" target="_blank" onclick="clickSendSms()">Click here to send SMS</a>'
        )

        return new Promise(resolve => {
            emitter.once('SMS.click', () => {
                setTimeout(resolve, 200)
            })
        })
    }

    _smsLink(number, body)  {
        const sms = 'sms:' + encodeURIComponent(number)
        if (this._isPlatformApple()) {
            return sms + '&body=' + encodeURIComponent(body)
        }
        return sms + '?body=' + encodeURIComponent(body)
    }

    _isPlatformApple() {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipod|ipad|os\sx/.test(userAgent)
    }
}

const IGNORED_TAGS = [
    'meta',
    'start',
    'end',
    'today',
    'username',
    'simserial',
    'subscriberid',
    'deviceid',
    'phonenumber',
]

class EnketoXmlParser
{
    constructor(xml) {
        this.$xml = $($.parseXML(xml))
        this.output = {}
    }

    parse() {
        this._appendMeta()
        this._appendFromNodes(this.$xml.find('data').children())
        return this.output
    }

    _appendMeta() {
        const meta = this.$xml.find('meta')
        this._appendFromNodes(meta.children())
    }

    _appendFromNodes($children) {
        const _this = this
        $children.each(function() {
            if ($(this).children().length) {
                return _this._appendFromNodes($(this).children())
            }

            const node = $(this)[0]

            if (IGNORED_TAGS.includes(node.nodeName)) {
                return
            } else if (node.getAttribute('type') === 'file') {
                return
            } else if (!node.textContent) {
                return
            } else {
                _this.output[node.nodeName] = node.textContent
            }
        })
    }
}