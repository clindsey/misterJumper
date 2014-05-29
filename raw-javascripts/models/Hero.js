moduleLibrary.define('Hero.Model', gamecore.Pooled.extend('HeroModel', {
  create: function() {
    var heroModel;
    heroModel = this._super();
    return heroModel;
  }
}, {
  dispose: function() {
    return this.release();
  }
}));
