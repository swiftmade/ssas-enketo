var $ = require('jquery');
var Promise = require('lie');
var TaskQueue = require('./utils/task-queue');
var sessionRepo = require("./repositories/sessions-repository");

var utils = {
	form: function(packet) {
		var form = new FormData();
		form.append('Date', new Date().toUTCString());
		form.append('xml_submission_file', new Blob([packet.xml]));
		return form;
	},

	headers: function(packet) {
		return {
			'X-OpenRosa-Version': '1.0',
			'X-OpenRosa-Deprecated-Id': packet.deprecated_id,
			'X-OpenRosa-Instance-Id': packet.instance_id
		};
	},

	chunks: function(files) {
		var chunks = [
			[]
		];
		
		var index = 0;
		var size = 0;
		// TODO: learn this from the server
		var maxSize = 50 * 1024 * 1024;

		for (var name in files) {
			var file = files[name];
			if (size >= maxSize) {
				size = 0;
				index++;
				chunks[index] = [];
			}
			chunks[index].push(name);
			size += file.length;			
		}
		
		return chunks;
	},

	loadChunk: function(packet, chunk, form) {

		if(packet.hasOwnProperty('browser_mode')) {
			chunk.forEach(function(file) {
				form.append(file, packet._attachments[file].data, file);
			});
			return Promise.resolve(true);
		}

		return Promise.all(chunk.map(function(file) {
			return sessionRepo.getAttachment(packet._id, file).then(function(blob) {
				form.append(file, blob, file);
			});
		}));
	},

	upload: function(packet, progressCb) {
		var _this = this;
		// Chunks of submission
		var chunks = this.chunks(packet._attachments);
		var headers = _this.headers(packet);

		var uploadQueue = new TaskQueue();

		chunks.forEach(function(chunk) {
			var factory = function() {
				var form = _this.form(packet);
				return _this.loadChunk(packet, chunk, form).then(function() {
					return _this.request(form, headers, progressCb);
				});
			};
			uploadQueue.add(factory);
		});

		return uploadQueue.run();
	},

	request: function(form, headers, progressCb) {
		var _this = this;
		return new Promise(function(resolve, reject) {
			$.ajax(_this.openrosaUrl, {
				'type': 'POST',
				'data': form,
				cache: false,
				contentType: false,
				processData: false,
				headers: headers,
				xhr: function() {
					var xhr = new window.XMLHttpRequest();
					xhr.upload.addEventListener("progress", function(evt) {
						if (evt.lengthComputable) {
							var percentComplete = evt.loaded / evt.total;
							if (progressCb) {
								progressCb(percentComplete);
							}
						}
					}, false);
					return xhr;
				}
			}).done(function(result, textStatus, xhr) {
				if (xhr.status == 201 || xhr.status == 202) {
					resolve(result);
					return;
				}

				reject("Submission was not successful!");
			}).fail(function(xhr, status, error) {
				reject(error);
			});
		});
	},

	setOpenrosaServer: function(url) {
		this.openrosaUrl = url;
	}
};

module.exports = function(to, packet, progressCb) {
	// Set the server url
	utils.setOpenrosaServer(to);
	// TODO: Learn the maximum upload size first.
	return utils.upload(packet, progressCb);
};
