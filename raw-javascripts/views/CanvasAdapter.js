moduleLibrary.define('CanvasAdapter.View', gamecore.Pooled.extend('CanvasAdapterView', {
  create: function(rawOptions) {
    var canvasAdapterView, containerEl, options;
    if (rawOptions == null) {
      rawOptions = {};
    }
    options = _.defaults(rawOptions, this.DEFAULT_OPTIONS);
    canvasAdapterView = this._super();
    canvasAdapterView.canvasEl = document.createElement('canvas');
    canvasAdapterView.canvasEl.width = options.width;
    canvasAdapterView.canvasEl.height = options.height;
    containerEl = document.body;
    if (options.canvasContainerId) {
      containerEl = document.getElementById(options.canvasContainerId);
    }
    containerEl.appendChild(canvasAdapterView.canvasEl);
    canvasAdapterView.containerEl = containerEl;
    return canvasAdapterView;
  },
  DEFAULT_OPTIONS: {
    width: 480,
    height: 320
  }
}, {
  dispose: function() {
    this.canvasEl.parentNode.removeChild(this.canvasEl);
    document.body.removeChild(this.canvasEl);
    return this.release();
  }
}));
