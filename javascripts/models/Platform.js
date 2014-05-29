window.require.register("models/Platform", function(require, module) {moduleLibrary.define('Platform.Model', gamecore.Pooled.extend('PlatformModel', {
  create: function(platformCount, velocity) {
    var platformModel;
    platformModel = this._super();
    platformModel.platformCount = platformCount;
    platformModel.velocity = velocity;
    return platformModel;
  }
}, {
  dispose: function() {
    return this.release();
  }
}));
});
