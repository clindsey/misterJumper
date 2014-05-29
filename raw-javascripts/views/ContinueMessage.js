moduleLibrary.define('ContinueMessage.View', gamecore.Pooled.extend('ContinueMessageView', {
  create: function(x, y, messageString) {
    var continueMessageView, height, width;
    continueMessageView = this._super();
    continueMessageView.el = new createjs.Text(messageString, '20px Arial', '#333');
    width = continueMessageView.el.getMeasuredWidth();
    height = continueMessageView.el.getMeasuredHeight();
    continueMessageView.el.x = x - width / 2;
    continueMessageView.el.y = y - height / 2;
    continueMessageView.el.cache(0, 0, width, height);
    return continueMessageView;
  }
}, {
  dispose: function() {
    this.el.uncache();
    this.el.getStage().removeChild(this.el);
    delete this['el'];
    return this.release();
  }
}));
