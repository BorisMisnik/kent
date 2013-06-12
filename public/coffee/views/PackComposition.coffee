class PackComposition extends createjs.Container

  pss : null

  constructor: () ->
    @initialize()

  initialize: () ->
    super

    @pss = new kent.packs.views.PackSpiteSheet()
    @pss._mask.visible=false
    #@pss.frame=121
    @pss2= new kent.packs.views.PackSpiteSheet()
    @pss2.visible = false

    kent.packs.app.pss2 = @pss2

    @addChild @pss, @pss2

    @pack_rotator = new createjs.Shape()
    @pack_rotator.graphics.beginFill(createjs.Graphics.getRGB(0,255,0,0)).drawRect(0,0,220,280)
    @pack_rotator.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0,0,220,280))
    @pack_rotator.x = -110
    @pack_rotator.y = -60

    @pack_opener = new createjs.Shape()
    @pack_opener.graphics.beginFill(createjs.Graphics.getRGB(255,0,0,0)).drawRect(0,0,220,140)
    @pack_opener.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0,0,220,140))
    @pack_opener.x = -110
    @pack_opener.y = -200


    @fltr_btn_1 = new createjs.Shape()
    @fltr_btn_1.graphics.beginFill(createjs.Graphics.getRGB(0,255,0,.0)).drawRect(-100,-75,200,150)
    @fltr_btn_1.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-100,-75,200,150))
    @fltr_btn_1.y=40

    @fltr_btn_2 = new createjs.Shape()
    @fltr_btn_2.graphics.beginFill(createjs.Graphics.getRGB(0,255,0,.0)).drawRect(-100,-75,200,150)
    @fltr_btn_2.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-100,-75,200,150))
    @fltr_btn_2.y=40
    @fltr_btn_2.x=-280

    @fltr_btn_3 = new createjs.Shape()
    @fltr_btn_3.graphics.beginFill(createjs.Graphics.getRGB(0,255,0,.0)).drawRect(-100,-75,200,150)
    @fltr_btn_3.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-100,-75,200,150))
    @fltr_btn_3.y=40
    @fltr_btn_3.x=280

    @fltr_btn_1.visible = @fltr_btn_2.visible = @fltr_btn_3.visible  = false


    @title = new createjs.Text("Унікальний трисекційний фільтр".toUpperCase(),"20px Verdana","#6B747A")
    @title.textAlign = "center"
    @title.x = 0
    @title.y = -130


    @title_fltr_1 = new createjs.Text("Вугільний фільтр".toUpperCase(),"18px Verdana","#6B747A")
    @title_fltr_1.textAlign = "center"
    @title_fltr_1.x = -280
    @title_fltr_1.y = 150

    @title_fltr_sbt_1 = new createjs.Text("Забезпечує м'який смак".toUpperCase(),"11px Verdana","#6B747A")
    @title_fltr_sbt_1.textAlign = "center"
    @title_fltr_sbt_1.x = -280

    @title_fltr_2 = new createjs.Text("Надтонке волокно".toUpperCase(),"18px Verdana","#6B747A")
    @title_fltr_2.textAlign = "center"
    @title_fltr_2.y = 150

    @title_fltr_sbt_2 = new createjs.Text("Робить смак рівномірним".toUpperCase(),"11px Verdana","#6B747A")
    @title_fltr_sbt_2.textAlign = "center"


    @title_fltr_3 = new createjs.Text("Турбо-фільтр".toUpperCase(),"18px Verdana","#6B747A")
    @title_fltr_3.textAlign = "center"
    @title_fltr_3.x = 280
    @title_fltr_3.y = 150

    @title_fltr_sbt_3 = new createjs.Text("Миттєва передача смаку".toUpperCase(),"11px Verdana","#6B747A")
    @title_fltr_sbt_3.textAlign = "center"
    @title_fltr_sbt_3.x = 280

    @title_fltr_sbt_1.y = @title_fltr_sbt_2.y = @title_fltr_sbt_3.y = 180
    @title.alpha = @title_fltr_1.alpha =  @title_fltr_2.alpha = @title_fltr_3.alpha = @title_fltr_sbt_1.alpha = @title_fltr_sbt_2.alpha = @title_fltr_sbt_3.alpha = 0


    fltr_btn_2_src = 231
    fltr_btn_2_trgt = 243

    fltr_btn_1_src = 273
    fltr_btn_1_trgt = 287

    fltr_btn_3_src = 318
    fltr_btn_3_trgt = 327

    #318
    #327

    @fltr_btn_1.addEventListener "mouseover",()=>
      TweenMax.fromTo @pss2, fltr_btn_1_trgt-fltr_btn_1_src,
        frame:fltr_btn_1_src
      ,
        frame:fltr_btn_1_trgt,
        useFrames : true

#      TweenMax.to @title_fltr_2, fltr_btn_1_trgt-fltr_btn_1_src,
#        alpha:1
#        useFrames:true
#
#      TweenMax.to @title_fltr_sbt_2, fltr_btn_1_trgt-fltr_btn_1_src,
#        alpha:1
#        useFrames:true



    @fltr_btn_1.addEventListener "mouseout",()=>
      TweenMax.fromTo @pss2, fltr_btn_1_trgt-fltr_btn_1_src,
        frame:fltr_btn_1_trgt
      ,
        frame:fltr_btn_1_src
        useFrames : true

#      TweenMax.to @title_fltr_2, fltr_btn_1_trgt-fltr_btn_1_src,
#        alpha:0
#        useFrames:true
#
#      TweenMax.to @title_fltr_sbt_2, fltr_btn_1_trgt-fltr_btn_1_src,
#        alpha:0
#        useFrames:true


    @fltr_btn_2.addEventListener "mouseover",()=>
      TweenMax.fromTo @pss2, fltr_btn_2_trgt-fltr_btn_2_src,
        frame:fltr_btn_2_src
      ,
        frame:fltr_btn_2_trgt,
        useFrames : true

#      TweenMax.to @title_fltr_1, fltr_btn_2_trgt-fltr_btn_2_src,
#        alpha:1
#        useFrames:true
#
#      TweenMax.to @title_fltr_sbt_1, fltr_btn_2_trgt-fltr_btn_2_src,
#        alpha:1
#        useFrames:true


    @fltr_btn_2.addEventListener "mouseout",()=>
      TweenMax.fromTo @pss2, fltr_btn_2_trgt-fltr_btn_2_src,
        frame:fltr_btn_2_trgt
      ,
        frame:fltr_btn_2_src
        useFrames : true

#      TweenMax.to @title_fltr_1, fltr_btn_2_trgt-fltr_btn_2_src,
#        alpha:0
#        useFrames:true
#
#      TweenMax.to @title_fltr_sbt_1, fltr_btn_2_trgt-fltr_btn_2_src,
#        alpha:0
#        useFrames:true

    @fltr_btn_3.addEventListener "mouseover",()=>
      TweenMax.fromTo @pss2, fltr_btn_3_trgt-fltr_btn_3_src,
        frame:fltr_btn_3_src
      ,
        frame:fltr_btn_3_trgt,
        useFrames : true


#      TweenMax.to @title_fltr_3, fltr_btn_3_trgt-fltr_btn_3_src,
#        alpha:1
#        useFrames:true
#
#
#      TweenMax.to @title_fltr_sbt_3, fltr_btn_3_trgt-fltr_btn_3_src,
#        alpha:1
#        useFrames:true


    @fltr_btn_3.addEventListener "mouseout",()=>
      TweenMax.fromTo @pss2, fltr_btn_3_trgt-fltr_btn_3_src,
        frame:fltr_btn_3_trgt
      ,
        frame:fltr_btn_3_src
        useFrames : true

#      TweenMax.to @title_fltr_3, fltr_btn_3_trgt-fltr_btn_3_src,
#        alpha:0
#        useFrames:true
#
#      TweenMax.to @title_fltr_sbt_3, fltr_btn_3_trgt-fltr_btn_3_src,
#        alpha:0
#        useFrames:true



    #@pack_opener.cursor = @pss.cursor="pointer"

    @addChild @pack_opener, @pack_rotator, @fltr_btn_1, @fltr_btn_2, @fltr_btn_3, @title,@title_fltr_1,@title_fltr_2,@title_fltr_3, @title_fltr_sbt_1,@title_fltr_sbt_2,@title_fltr_sbt_3

    @state_machine = StateMachine.create
      inital: 'none'
      events : [
        name: 'rotate'
        from: 'none'
        to  : 'rotation'
      ,
        name: 'open'
        from: 'rotation'
        to  : 'opening'
      ,
        name: 'getsig'
        from: ['rotation','opening']
        to  : 'sig'
      ,
        name: 'rotatesig'
        from: ['sig']
        to  : 'rotatedsig'
      ,
        name: 'openfilter'
        from: ['rotatedsig']
        to  : 'openedfilter'
      ,
        name: 'previewfilter'
        from: ['openedfilter']
        to  : 'filterbtns'

      ]
      callbacks:
        onenterrotation :()=>

          @pack_rotator.addEventListener "mousedown",(e)=>

            @pack_opener.visible = false

            prevX = e.stageX
            prevY = e.stageY


            @pack_rotator.getStage().addEventListener "stagemousemove",(e)=>

              deltaX =  prevX-e.stageX
              deltaY =  prevY-e.stageY

              prevX = e.stageX
              prevY = e.stageY

              nuFrame =  @pss.frame+deltaX/2
              nuFrame = (if (nuFrame < 0) then 106 + nuFrame else (if (nuFrame > 106) then nuFrame - 106 else nuFrame))
              @pss.frame = nuFrame

            @pack_rotator.getStage().addEventListener "stagemouseup",(e)=>
              console.log "@pack_rotator stagemouseup"
              @pack_rotator.getStage().removeAllEventListeners "stagemousemove"
              @pack_rotator.getStage().removeAllEventListeners "stagemouseup"

              targetFrame = (if (@pss.frame > 106 / 2) then 106 else 0)
              time =(if (targetFrame is 0) then (@pss.frame) else targetFrame-@pss.frame)

              TweenMax.to @pss, time,
                frame:targetFrame
                useFrames:true
                ease:Linear.easeNone,
                onComplete : ()=>
                  @pack_opener.visible = true

          @pack_opener.addEventListener "mousedown",(e)=>

            @pack_rotator.visible = false

            prevX = e.stageX
            prevY = e.stageY

            @pack_opener.getStage().addEventListener "stagemousemove",(e)=>
              deltaX =  prevX-e.stageX
              deltaY =  prevY-e.stageY

              prevX = e.stageX
              prevY = e.stageY

              nuFrame =  @pss.frame+deltaY/4
              nuFrame = (if (nuFrame < 107) then 107 else (if (nuFrame > 120) then 120 else nuFrame))
              @pss.frame = nuFrame

            @pack_opener.getStage().addEventListener "stagemouseup",(e)=>
              console.log "@pack_opener stagemouseup"
              @pack_opener.getStage().removeAllEventListeners "stagemousemove"
              @pack_opener.getStage().removeAllEventListeners "stagemouseup"

              if(@pss.frame>115)
                time = 120-@pss.frame
                TweenMax.to @pss, time,
                  frame:120
                  ease:Linear.easeNone
                  useFrames:true
                  onComplete:()=>
                    @state_machine.getsig()
              else
                TweenMax.to @pss, time,
                  frame:107
                  ease:Linear.easeNone
                  useFrames:true
                  onComplete:()=>
                    @pack_rotator.visible = true



        onleaverotation:()=>
          @pack_opener.visible = false;
          @pack_rotator.visible = false;
          @pack_opener.removeAllEventListeners "mousedown"
          @pack_rotator.removeAllEventListeners "mousedown"

        onenteropen :()=>
          console.log('on enter open')

        onentersig : ()=>
          @pss2.y+=6
          @pss2.frame = 121
          @pss2.visible=true
          @pss2.rotation=-90
          @pss2.scaleX=@pss2.scaleY=.597
          @pss2.maskLeft=690

          @pack_opener.visible=true


          @pack_opener.addEventListener "mousedown",(e)=>


            prevX = e.stageX
            prevY = e.stageY

            @pack_opener.getStage().addEventListener "stagemousemove",(e)=>
              deltaX =  prevX-e.stageX
              deltaY =  prevY-e.stageY

              prevX = e.stageX
              prevY = e.stageY

              nuy = @pss2.y - deltaY

              if(nuy<7)
                @pss2.y = nuy
                @pss2.maskLeft -= deltaY * 1/.597




              #nuFrame =  @pss.frame+deltaY/4
              #nuFrame = (if (nuFrame < 107) then 107 else (if (nuFrame > 120) then 120 else nuFrame))
              #@pss.frame = nuFrame

            @pack_opener.getStage().addEventListener "stagemouseup",(e)=>

              @pack_opener.getStage().removeAllEventListeners "stagemousemove"
              @pack_opener.getStage().removeAllEventListeners "stagemouseup"

              if @pss2.y>-70
                TweenMax.to @pss2, .5,
                  y : 6
                  maskLeft:690
              else
                @pack_opener.visible = false
                @pack_opener.removeAllEventListeners "mousedown"
                @pack_opener.getStage().removeAllEventListeners "stagemousemove"

                TweenMax.to @pss, 1.5,
                  y : 1000

                TweenMax.to @pss2, .5,
                  maskLeft:0
                  y:0
                  onComplete : ()=>
                    @state_machine.rotatesig()


                  #maskLeft:690
              #@pss.getStage().removeAllEventListeners "stagemouseup"

        onenterrotatedsig : ()=>
          TweenMax.to @pss2, .5,
            scaleX:1
            scaleY:1
            rotation:0


          @pack_opener.getStage().addEventListener "click", ()=>
            @state_machine.openfilter()


        onenteropenedfilter : ()=>

          @pack_opener.getStage().removeAllEventListeners "click"

          console.log @pss2.frame
          TweenMax.to @pss2, 110*2,

            frame:121+110
            ease:Linear.easeNone
            useFrames:true

            onComplete:()=>
              @state_machine.previewfilter()

          TweenMax.to @title, .5,
            alpha:1
          TweenMax.to @title_fltr_1, 1,
            alpha:1
            delay: 3
            ease:Sine.easeOut

          TweenMax.to @title_fltr_2, 1,
            alpha:1
            delay: 3.5
            ease:Sine.easeOut

          TweenMax.to @title_fltr_3, 1,
            alpha:1
            delay: 4
            ease:Sine.easeOut

          TweenMax.to @title_fltr_sbt_1, 1,
            alpha:1
            delay: 3
            ease:Sine.easeOut

          TweenMax.to @title_fltr_sbt_2, 1,
            alpha:1
            delay: 3.5
            ease:Sine.easeOut

          TweenMax.to @title_fltr_sbt_3, 1,
            alpha:1
            delay: 4
            ease:Sine.easeOut




        onenterfilterbtns : ()=>
          @fltr_btn_1.visible = @fltr_btn_2.visible = @fltr_btn_3.visible  = true




    @state_machine.rotate()

    console.log @state_machine.current

#    //tl = new TimelineMax({useFrames:true, paused:true})
#    //tl.add( TweenMax.to pss, 106, {repeat:10,frame:106, ease:Linear.easeNone} )



namespace "kent.packs.views", (exp) ->
  exp.PackComposition = PackComposition
