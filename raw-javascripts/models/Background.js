moduleLibrary.define('Background.Model', gamecore.Pooled.extend('BackgroundModel', {
  create: function(tileCount, velocity) {
    var backgroundModel;
    backgroundModel = this._super();
    backgroundModel.tileCount = tileCount;
    backgroundModel.velocity = velocity;
    return backgroundModel;
  }
}, {
  dispose: function() {
    return this.release();
  }
}));
