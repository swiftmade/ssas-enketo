function TaskQueue() {
    
    var tasks = [];
    var _this = this;
    
    // This is the function that will be called when the 'done' count changes
    var progressDelegate = null;
    
    this.progress = {
        total: 0, // Total number of tasks added to the queue
        done: 0, // Number of tasks that are done
    };

    function taskIsDone() {
        _this.progress.done += 1;
        if (progressDelegate !== null) {
            progressDelegate(_this.progress);
        }
    }

    /**
     * Registers a callback method that's called upon progress
     * @param {*} callback 
     */
    this.onProgress = function (callback) {
        progressDelegate = callback;
    };

    /**
     * The parameter you pass here must be a function
     * When called, this function must return a promise
     * @param {function} taskFactory 
     */
    this.add = function (taskFactory) {
        tasks.push(taskFactory);
        _this.progress.total += 1;
    };

    this.isEmpty = function () {
        return !tasks.length;
    };

    this.run = function () {
        return tasks.reduce ( function(previous, taskFactory) {
            return previous
                .then(function() {
                    return taskFactory().then(function() {
                        taskIsDone();
                    });
                });
        }, Promise.resolve());
    };
}

module.exports = TaskQueue;