var RxOld = require('rx');
var RxNew = require('../../../../index');

module.exports = function (suite) {
  var oldMergeMapWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread)
    .flatMap(function (x) {
      return RxOld.Observable.range(x, 25, RxOld.Scheduler.currentThread);
    });
  var newMergeMapWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler.queue)
    .mergeMap(function (x) {
      return RxNew.Observable.range(x, 25, RxNew.Scheduler.queue);
    });

  function _next(x) { }
  function _error(e) { }
  function _complete() { }
  return suite
    .add('old mergeMap with current thread scheduler', function () {
      oldMergeMapWithCurrentThreadScheduler.subscribe(_next, _error, _complete);
    })
    .add('new mergeMap with current thread scheduler', function () {
      newMergeMapWithCurrentThreadScheduler.subscribe(_next, _error, _complete);
    });
};