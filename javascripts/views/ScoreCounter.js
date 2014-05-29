window.require.register("views/ScoreCounter", function(require, module) {moduleLibrary.define('ScoreCounter.View', gamecore.Pooled.extend('ScoreCounterView', {
  create: function(scoreCounterModel, x, y) {
    var height, scoreCounterView, width;
    scoreCounterView = this._super();
    scoreCounterView.model = scoreCounterModel;
    scoreCounterView.el = new createjs.Text(scoreCounterView.model.score, '20px Arial', '#333');
    this.lastScore = ~~(scoreCounterView.model.score / 10);
    width = scoreCounterView.el.getMeasuredWidth();
    height = scoreCounterView.el.getMeasuredHeight();
    scoreCounterView.el.cache(0, 0, width, height);
    scoreCounterView.el.x = x - width / 2;
    scoreCounterView.el.y = y - height / 2;
    _.bindAll(scoreCounterView, 'onTick');
    createjs.Ticker.addEventListener('tick', scoreCounterView.onTick);
    return scoreCounterView;
  }
}, {
  onTick: function() {
    var height, width;
    if (createjs.Ticker.getPaused()) {
      return;
    }
    if (this.lastScore === this.model.score) {
      return;
    }
    this.el.text = ~~(this.model.score / 10);
    this.lastScore = ~~(this.model.score / 10);
    width = this.el.getMeasuredWidth();
    height = this.el.getMeasuredHeight();
    return this.el.cache(0, 0, width, height);
  },
  dispose: function() {
    this.el.uncache();
    this.el.getStage().removeChild(this.el);
    delete this['el'];
    return this.release();
  }
}));
});
