moduleLibrary.define 'ContinueMessage.View', gamecore.Pooled.extend 'ContinueMessageView',
    create: (x, y, messageString) ->
      continueMessageView = @_super()

      continueMessageView.el = new createjs.Text messageString, '20px Arial', '#333'

      width = continueMessageView.el.getMeasuredWidth()
      height = continueMessageView.el.getMeasuredHeight()

      continueMessageView.el.x = x - width / 2
      continueMessageView.el.y = y - height / 2

      continueMessageView.el.cache 0, 0, width, height

      continueMessageView
  ,
    dispose: ->
      @el.uncache()

      @el.getStage().removeChild @el

      delete this['el']

      @release()
