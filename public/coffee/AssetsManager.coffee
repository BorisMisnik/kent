class AssetManager

  assets     :
    {}
  items      :
    {}
  constructor: (@host) ->
    @host ?= "./"
  addAssetURL: (name, url) ->
    @assets[name] = @host + url
  getAssetURL: (name) ->
    @items[name]
  getManifest: ->
    _manifest = []
    _manifest.push({id: name, src: url}) for name,url of @assets
    return _manifest
  loadAssets : (callbacks) ->
    {complete, error, progress} = callbacks

    handleFileLoad = (event) =>
      {item, type, result} = event

      if type is createjs.LoadQueue.JAVASCRIPT
        document.body.appendChild(result)

      @items[event.item.id] = event.result

    handleProgress = (event) =>
      progress?(event.loaded)

    handleComplete = (event) =>
      complete?(event)

    @queue = new createjs.LoadQueue(false)
    @queue.setMaxConnections(10);
    @queue.addEventListener("complete", handleComplete)
    @queue.addEventListener("fileload", handleFileLoad)
    @queue.addEventListener("progress", handleProgress)

    manifest = @getManifest()

    @queue.loadManifest(manifest);

    return

namespace "kent.packs", (exp) ->
  exp.assetsManager = new AssetManager()
