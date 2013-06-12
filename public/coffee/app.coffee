class App

  stage : null

  stageWidth : 1000
  stageHeight : 700

  constructor :() ->


  initStage : () ->
    console.log "initStage #{@stageWidth}, #{@stageHeight}"
    @stage = new createjs.Stage("app-canvas")
    @stage.enableMouseOver(20)


    @preload_label = new createjs.Text("0%".toUpperCase(),"22px Verdana","#6B747A")
    @preload_label.textAlign = "center"

    @preload_label.x = @stageWidth/2
    @preload_label.y = @stageHeight/2

    @stage.addChild @preload_label

    TweenMax.ticker.fps(60);
    TweenMax.ticker.addEventListener("tick", @stage.update, @stage);



    kent.packs.assetsManager.loadAssets
      complete : =>

        pss = new kent.packs.views.PackComposition()
        pss.x = @stageWidth/2
        pss.y = @stageHeight/2
        @stage.addChild pss

        console.log("COMPLETE")

        @preload_label.visible=false

      progress :(loaded)=>

        @preload_label.text = "#{Math.round(loaded*100)}%"

        #console.log("PROGRESS #{loaded}")

      error : ->




namespace "kent.packs", (exp) ->
  exp.app = new App()

kent.packs.app.initStage()


