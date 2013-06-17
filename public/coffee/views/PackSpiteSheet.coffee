#pb_rotate_000.png -  pb_rotate_106.png

i = 0

while i < 107

  filename = "pb_rotate_#{pad(i.toString(), 3)}"
  filepath = "img/packs/pb_rotate_#{pad(i.toString(), 3)}.png"

  kent.packs.assetsManager.addAssetURL(filename, filepath)

  i++

i = 118

while i < 132
  filename = "pb_open_#{pad(i.toString(), 3)}"
  filepath = "img/packs/pb_open_#{pad(i.toString(), 3)}.png"

  kent.packs.assetsManager.addAssetURL(filename, filepath)
  i++

i = 224

while i < 236
  filename = "pb_sig_#{pad(i.toString(), 3)}"
  filepath = "img/packs/pb_sig_#{pad(i.toString(), 3)}.png"

  kent.packs.assetsManager.addAssetURL(filename, filepath)
  i++

i = 251

while i < 471
  filename = "pb_filters_#{pad(i.toString(), 3)}"
  filepath = "img/packs/pb_filters_#{pad(i.toString(), 3)}.png"

  kent.packs.assetsManager.addAssetURL(filename, filepath)
  i++


class PackSpiteSheet extends createjs.Container

  _maskLeft : 0
  _maskRight : 0

  constructor: () ->
    @initialize()

  initialize: () ->
    super

    images = []
    frames = []

    #rotate
    i = 0
    n = 0
    while i < 107
      #console.log(kent.packs.assetsManager.getAssetURL( "pb_rotate_#{pad(i.toString(),3)}" ))
      images.push kent.packs.assetsManager.getAssetURL("pb_rotate_#{pad(i.toString(), 3)}")
      frames.push [0, 0, 978, 550, n, 0, 0]
      i++
      n++

    #open
    i = 118

    while i < 132
      #console.log(kent.packs.assetsManager.getAssetURL( "pb_rotate_#{pad(i.toString(),3)}" ))
      images.push kent.packs.assetsManager.getAssetURL("pb_open_#{pad(i.toString(), 3)}")
      frames.push [0, 0, 978, 550, n, 0, 0]
      i++
      n++

    i = 224

    while i < 236
      images.push kent.packs.assetsManager.getAssetURL("pb_sig_#{pad(i.toString(), 3)}")
      frames.push [0, 0, 978, 550, n, 0, 0]
      i++
      n++

    i = 251

    while i < 471
      images.push kent.packs.assetsManager.getAssetURL("pb_filters_#{pad(i.toString(), 3)}")
      frames.push [0, 0, 978, 550, n, 0, 0]
      i++
      n++

    @spriteSheet = new createjs.SpriteSheet(
      images    : images
      frames    : frames
      animations:
        rotate    : [0, 106]
        open      : [107, 120]
        sig       : [121, 132]
        filter    : [133, 353]
        sig_filter: [121, 353]

    )

    @img = new createjs.BitmapAnimation @spriteSheet

    scale=.95

    @img.scaleX=scale
    @img.scaleY=scale

    @img.x = -978*scale / 2
    @img.y = -550*scale / 2


    @img.gotoAndStop(0);

    @maskWidth  = 1000


    @_mask = new createjs.Shape()
    @_mask.graphics.beginFill(createjs.Graphics.getRGB(0,255,0,0.5)).drawRect(0,0,@maskWidth-@_maskLeft-@_maskRight,550)

    @_mask.x = -@maskWidth/2+@_maskLeft
    @_mask.y = -550/2

    @img.mask = @_mask


    @addChild @img

  _frame: 0

  @define "frame",
    get: -> return @_frame
    set: (value)->
      @_frame = (if(value>@_frame) then Math.ceil(value) else Math.floor(value))

      @_frame = (if(@_frame is 106) then 0 else @_frame)

      #console.log "#{value} -> #{@_frame}"

      @img.gotoAndStop(@_frame)

  @define "maskLeft",
    get: -> return @_maskLeft
    set: (value)->
      @_maskLeft = value

      @_mask.graphics
        .clear()
        .beginFill(createjs.Graphics.getRGB(0,255,0,0.5))
        .drawRect(0,0,@maskWidth-@_maskLeft-@_maskRight,550)

      @_mask.x = -@maskWidth/2+@_maskLeft

    @define "maskRight",
      get: -> return @_maskRight
      set: (value)->
        @_maskRight = value

        @_mask.graphics
          .clear()
          .beginFill(createjs.Graphics.getRGB(0,255,0,0.5))
          .drawRect(0,0,@maskWidth-@_maskLeft-@_maskRight,550)

        @_mask.x = -@maskWidth/2+@_maskLeft


#console.log "#{@_mask.x}, #{@maskWidth-@_maskLeft-@_maskRight}"

namespace "kent.packs.views", (exp) ->
  exp.PackSpiteSheet = PackSpiteSheet
