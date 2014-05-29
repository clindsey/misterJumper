window.require.register("models/ScoreCounter", function(require, module) {moduleLibrary.define('ScoreCounter.Model', gamecore.Pooled.extend('ScoreCounterModel', {
  create: function() {
    var scoreCounterModel;
    scoreCounterModel = this._super();
    scoreCounterModel.score = 0;
    return scoreCounterModel;
  }
}, {
  dispose: function() {
    return this.release();
  }
}));
});
