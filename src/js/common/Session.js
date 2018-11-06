export default class Session {

    constructor(data) {
        this.data = {
            xml: null,
            online: false,
            draft: true,
            payload: {},
            _attachments: {},
            submitted: false,
            instance_id: null,
            deprecated_id: null,
            last_update: Date.now(),
            ...data,
        }
    }

    setData(data) {
        this.data = {
            ...this.data,
            ...data,
            last_update: Date.now(),
        }
        return this
    }

    writeEnketoForm(form) {
        this.setData({
            xml: form.xml,
            instance_id: form.instance_id,
            deprecated_id: form.deprecated_id,
            _attachments: this._getFiles(form.files)
        })
    }

    toFormInstance() {
        return {
            instanceStr: this.data.xml,
            session: this.data.payload,
            submitted: this.data.submitted,
        }
    }

    isOnline() {
        return this.data.online
    }

    _getFiles(files) {
        if (!files || typeof files !== 'object') {
            return this.data._attachments
        }

        const attachments = {}

        files.forEach(file => {
            // Mark already existing attachments as stub
            if (this._isFileStub(file)) {
                if (this._attachmentExists(file)) {
                    attachments[file] = {
                        ...this.data._attachments[file],
                        stub: true
                    }
                }
                return
            }
            attachments[file.name] = {
                data: file,
                content_type: file.type,
            }
        })

        return attachments
    }

    _isFileStub(file) {
        return typeof file === 'string'
    }

    _attachmentExists(name) {
        return this.data.hasOwnProperty('_attachments')
            && this.data._attachments.hasOwnProperty(name)
    }
}