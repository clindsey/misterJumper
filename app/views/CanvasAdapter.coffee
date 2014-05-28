moduleLibrary.define 'CanvasAdapter.View', gamecore.Pooled.extend 'CanvasAdapterView',
    create: (rawOptions = {}) ->
      options = _.defaults rawOptions, @DEFAULT_OPTIONS

      canvasAdapterView = @_super()

      canvasAdapterView.canvasEl = document.createElement 'canvas'
      canvasAdapterView.canvasEl.width = options.width
      canvasAdapterView.canvasEl.height = options.height
      containerEl = document.body
      if options.canvasContainerId
        containerEl = document.getElementById(options.canvasContainerId)

      containerEl.appendChild canvasAdapterView.canvasEl

      canvasAdapterView.containerEl = containerEl

      canvasAdapterView

    DEFAULT_OPTIONS:
      width: 480
      height: 320
  ,
    dispose: ->
      @canvasEl.parentNode.removeChild @canvasEl

      document.body.removeChild @canvasEl

      @release()
