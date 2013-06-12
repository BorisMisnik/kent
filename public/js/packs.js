(function() {
  var App, AssetManager, PackComposition, PackSpiteSheet, filename, filepath, i, namespace, pad,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Function.prototype.define = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };

  namespace = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref1;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref1 = name.split('.');
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      item = _ref1[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };

  pad = function(str, max) {
    if (str.length < max) {
      return pad("0" + str, max);
    } else {
      return str;
    }
  };

  AssetManager = (function() {
    AssetManager.prototype.assets = {};

    AssetManager.prototype.items = {};

    function AssetManager(host) {
      this.host = host;
      if (this.host == null) {
        this.host = "./";
      }
    }

    AssetManager.prototype.addAssetURL = function(name, url) {
      return this.assets[name] = this.host + url;
    };

    AssetManager.prototype.getAssetURL = function(name) {
      return this.items[name];
    };

    AssetManager.prototype.getManifest = function() {
      var name, url, _manifest, _ref;
      _manifest = [];
      _ref = this.assets;
      for (name in _ref) {
        url = _ref[name];
        _manifest.push({
          id: name,
          src: url
        });
      }
      return _manifest;
    };

    AssetManager.prototype.loadAssets = function(callbacks) {
      var complete, error, handleComplete, handleFileLoad, handleProgress, manifest, progress,
        _this = this;
      complete = callbacks.complete, error = callbacks.error, progress = callbacks.progress;
      handleFileLoad = function(event) {
        var item, result, type;
        item = event.item, type = event.type, result = event.result;
        if (type === createjs.LoadQueue.JAVASCRIPT) {
          document.body.appendChild(result);
        }
        return _this.items[event.item.id] = event.result;
      };
      handleProgress = function(event) {
        return typeof progress === "function" ? progress(event.loaded) : void 0;
      };
      handleComplete = function(event) {
        return typeof complete === "function" ? complete(event) : void 0;
      };
      this.queue = new createjs.LoadQueue(false);
      this.queue.setMaxConnections(10);
      this.queue.addEventListener("complete", handleComplete);
      this.queue.addEventListener("fileload", handleFileLoad);
      this.queue.addEventListener("progress", handleProgress);
      manifest = this.getManifest();
      this.queue.loadManifest(manifest);
    };

    return AssetManager;

  })();

  namespace("kent.packs", function(exp) {
    return exp.assetsManager = new AssetManager();
  });

  i = 0;

  while (i < 107) {
    filename = "pb_rotate_" + (pad(i.toString(), 3));
    filepath = "img/packs/pb_rotate_" + (pad(i.toString(), 3)) + ".png";
    kent.packs.assetsManager.addAssetURL(filename, filepath);
    i++;
  }

  i = 118;

  while (i < 132) {
    filename = "pb_open_" + (pad(i.toString(), 3));
    filepath = "img/packs/pb_open_" + (pad(i.toString(), 3)) + ".png";
    kent.packs.assetsManager.addAssetURL(filename, filepath);
    i++;
  }

  i = 224;

  while (i < 236) {
    filename = "pb_sig_" + (pad(i.toString(), 3));
    filepath = "img/packs/pb_sig_" + (pad(i.toString(), 3)) + ".png";
    kent.packs.assetsManager.addAssetURL(filename, filepath);
    i++;
  }

  i = 251;

  while (i < 471) {
    filename = "pb_filters_" + (pad(i.toString(), 3));
    filepath = "img/packs/pb_filters_" + (pad(i.toString(), 3)) + ".png";
    kent.packs.assetsManager.addAssetURL(filename, filepath);
    i++;
  }

  PackSpiteSheet = (function(_super) {
    __extends(PackSpiteSheet, _super);

    PackSpiteSheet.prototype._maskLeft = 0;

    PackSpiteSheet.prototype._maskRight = 0;

    function PackSpiteSheet() {
      this.initialize();
    }

    PackSpiteSheet.prototype.initialize = function() {
      var frames, images, n;
      PackSpiteSheet.__super__.initialize.apply(this, arguments);
      images = [];
      frames = [];
      i = 0;
      n = 0;
      while (i < 107) {
        images.push(kent.packs.assetsManager.getAssetURL("pb_rotate_" + (pad(i.toString(), 3))));
        frames.push([0, 0, 978, 550, n, 0, 0]);
        i++;
        n++;
      }
      i = 118;
      while (i < 132) {
        images.push(kent.packs.assetsManager.getAssetURL("pb_open_" + (pad(i.toString(), 3))));
        frames.push([0, 0, 978, 550, n, 0, 0]);
        i++;
        n++;
      }
      i = 224;
      while (i < 236) {
        images.push(kent.packs.assetsManager.getAssetURL("pb_sig_" + (pad(i.toString(), 3))));
        frames.push([0, 0, 978, 550, n, 0, 0]);
        i++;
        n++;
      }
      i = 251;
      while (i < 471) {
        images.push(kent.packs.assetsManager.getAssetURL("pb_filters_" + (pad(i.toString(), 3))));
        frames.push([0, 0, 978, 550, n, 0, 0]);
        i++;
        n++;
      }
      this.spriteSheet = new createjs.SpriteSheet({
        images: images,
        frames: frames,
        animations: {
          rotate: [0, 106],
          open: [107, 120],
          sig: [121, 132],
          filter: [133, 353],
          sig_filter: [121, 353]
        }
      });
      this.img = new createjs.BitmapAnimation(this.spriteSheet);
      this.img.x = -978 / 2;
      this.img.y = -550 / 2;
      this.img.gotoAndStop(0);
      this.maskWidth = 1000;
      this._mask = new createjs.Shape();
      this._mask.graphics.beginFill(createjs.Graphics.getRGB(0, 255, 0, 0.5)).drawRect(0, 0, this.maskWidth - this._maskLeft - this._maskRight, 550);
      this._mask.x = -this.maskWidth / 2 + this._maskLeft;
      this._mask.y = -550 / 2;
      this.img.mask = this._mask;
      return this.addChild(this.img);
    };

    PackSpiteSheet.prototype._frame = 0;

    PackSpiteSheet.define("frame", {
      get: function() {
        return this._frame;
      },
      set: function(value) {
        this._frame = (value > this._frame ? Math.ceil(value) : Math.floor(value));
        this._frame = (this._frame === 106 ? 0 : this._frame);
        return this.img.gotoAndStop(this._frame);
      }
    });

    PackSpiteSheet.define("maskLeft", {
      get: function() {
        return this._maskLeft;
      },
      set: function(value) {
        this._maskLeft = value;
        this._mask.graphics.clear().beginFill(createjs.Graphics.getRGB(0, 255, 0, 0.5)).drawRect(0, 0, this.maskWidth - this._maskLeft - this._maskRight, 550);
        return this._mask.x = -this.maskWidth / 2 + this._maskLeft;
      }
    }, PackSpiteSheet.define("maskRight", {
      get: function() {
        return this._maskRight;
      },
      set: function(value) {
        this._maskRight = value;
        this._mask.graphics.clear().beginFill(createjs.Graphics.getRGB(0, 255, 0, 0.5)).drawRect(0, 0, this.maskWidth - this._maskLeft - this._maskRight, 550);
        return this._mask.x = -this.maskWidth / 2 + this._maskLeft;
      }
    }));

    return PackSpiteSheet;

  })(createjs.Container);

  namespace("kent.packs.views", function(exp) {
    return exp.PackSpiteSheet = PackSpiteSheet;
  });

  PackComposition = (function(_super) {
    __extends(PackComposition, _super);

    PackComposition.prototype.pss = null;

    function PackComposition() {
      this.initialize();
    }

    PackComposition.prototype.initialize = function() {
      var fltr_btn_1_src, fltr_btn_1_trgt, fltr_btn_2_src, fltr_btn_2_trgt, fltr_btn_3_src, fltr_btn_3_trgt,
        _this = this;
      PackComposition.__super__.initialize.apply(this, arguments);
      this.pss = new kent.packs.views.PackSpiteSheet();
      this.pss._mask.visible = false;
      this.pss2 = new kent.packs.views.PackSpiteSheet();
      this.pss2.visible = false;
      kent.packs.app.pss2 = this.pss2;
      this.addChild(this.pss, this.pss2);
      this.pack_rotator = new createjs.Shape();
      this.pack_rotator.graphics.beginFill(createjs.Graphics.getRGB(0, 255, 0, 0)).drawRect(0, 0, 220, 280);
      this.pack_rotator.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, 220, 280));
      this.pack_rotator.x = -110;
      this.pack_rotator.y = -60;
      this.pack_opener = new createjs.Shape();
      this.pack_opener.graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0, 0)).drawRect(0, 0, 220, 140);
      this.pack_opener.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, 220, 140));
      this.pack_opener.x = -110;
      this.pack_opener.y = -200;
      this.fltr_btn_1 = new createjs.Shape();
      this.fltr_btn_1.graphics.beginFill(createjs.Graphics.getRGB(0, 255, 0, .0)).drawRect(-100, -75, 200, 150);
      this.fltr_btn_1.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-100, -75, 200, 150));
      this.fltr_btn_1.y = 40;
      this.fltr_btn_2 = new createjs.Shape();
      this.fltr_btn_2.graphics.beginFill(createjs.Graphics.getRGB(0, 255, 0, .0)).drawRect(-100, -75, 200, 150);
      this.fltr_btn_2.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-100, -75, 200, 150));
      this.fltr_btn_2.y = 40;
      this.fltr_btn_2.x = -280;
      this.fltr_btn_3 = new createjs.Shape();
      this.fltr_btn_3.graphics.beginFill(createjs.Graphics.getRGB(0, 255, 0, .0)).drawRect(-100, -75, 200, 150);
      this.fltr_btn_3.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-100, -75, 200, 150));
      this.fltr_btn_3.y = 40;
      this.fltr_btn_3.x = 280;
      this.fltr_btn_1.visible = this.fltr_btn_2.visible = this.fltr_btn_3.visible = false;
      this.title = new createjs.Text("Унікальний трисекційний фільтр".toUpperCase(), "20px Verdana", "#6B747A");
      this.title.textAlign = "center";
      this.title.x = 0;
      this.title.y = -130;
      this.title_fltr_1 = new createjs.Text("Вугільний фільтр".toUpperCase(), "18px Verdana", "#6B747A");
      this.title_fltr_1.textAlign = "center";
      this.title_fltr_1.x = -280;
      this.title_fltr_1.y = 150;
      this.title_fltr_sbt_1 = new createjs.Text("Забезпечує м'який смак".toUpperCase(), "11px Verdana", "#6B747A");
      this.title_fltr_sbt_1.textAlign = "center";
      this.title_fltr_sbt_1.x = -280;
      this.title_fltr_2 = new createjs.Text("Надтонке волокно".toUpperCase(), "18px Verdana", "#6B747A");
      this.title_fltr_2.textAlign = "center";
      this.title_fltr_2.y = 150;
      this.title_fltr_sbt_2 = new createjs.Text("Робить смак рівномірним".toUpperCase(), "11px Verdana", "#6B747A");
      this.title_fltr_sbt_2.textAlign = "center";
      this.title_fltr_3 = new createjs.Text("Турбо-фільтр".toUpperCase(), "18px Verdana", "#6B747A");
      this.title_fltr_3.textAlign = "center";
      this.title_fltr_3.x = 280;
      this.title_fltr_3.y = 150;
      this.title_fltr_sbt_3 = new createjs.Text("Миттєва передача смаку".toUpperCase(), "11px Verdana", "#6B747A");
      this.title_fltr_sbt_3.textAlign = "center";
      this.title_fltr_sbt_3.x = 280;
      this.title_fltr_sbt_1.y = this.title_fltr_sbt_2.y = this.title_fltr_sbt_3.y = 180;
      this.title.alpha = this.title_fltr_1.alpha = this.title_fltr_2.alpha = this.title_fltr_3.alpha = this.title_fltr_sbt_1.alpha = this.title_fltr_sbt_2.alpha = this.title_fltr_sbt_3.alpha = 0;
      fltr_btn_2_src = 231;
      fltr_btn_2_trgt = 243;
      fltr_btn_1_src = 273;
      fltr_btn_1_trgt = 287;
      fltr_btn_3_src = 318;
      fltr_btn_3_trgt = 327;
      this.fltr_btn_1.addEventListener("mouseover", function() {
        return TweenMax.fromTo(_this.pss2, fltr_btn_1_trgt - fltr_btn_1_src, {
          frame: fltr_btn_1_src
        }, {
          frame: fltr_btn_1_trgt,
          useFrames: true
        });
      });
      this.fltr_btn_1.addEventListener("mouseout", function() {
        return TweenMax.fromTo(_this.pss2, fltr_btn_1_trgt - fltr_btn_1_src, {
          frame: fltr_btn_1_trgt
        }, {
          frame: fltr_btn_1_src,
          useFrames: true
        });
      });
      this.fltr_btn_2.addEventListener("mouseover", function() {
        return TweenMax.fromTo(_this.pss2, fltr_btn_2_trgt - fltr_btn_2_src, {
          frame: fltr_btn_2_src
        }, {
          frame: fltr_btn_2_trgt,
          useFrames: true
        });
      });
      this.fltr_btn_2.addEventListener("mouseout", function() {
        return TweenMax.fromTo(_this.pss2, fltr_btn_2_trgt - fltr_btn_2_src, {
          frame: fltr_btn_2_trgt
        }, {
          frame: fltr_btn_2_src,
          useFrames: true
        });
      });
      this.fltr_btn_3.addEventListener("mouseover", function() {
        return TweenMax.fromTo(_this.pss2, fltr_btn_3_trgt - fltr_btn_3_src, {
          frame: fltr_btn_3_src
        }, {
          frame: fltr_btn_3_trgt,
          useFrames: true
        });
      });
      this.fltr_btn_3.addEventListener("mouseout", function() {
        return TweenMax.fromTo(_this.pss2, fltr_btn_3_trgt - fltr_btn_3_src, {
          frame: fltr_btn_3_trgt
        }, {
          frame: fltr_btn_3_src,
          useFrames: true
        });
      });
      this.addChild(this.pack_opener, this.pack_rotator, this.fltr_btn_1, this.fltr_btn_2, this.fltr_btn_3, this.title, this.title_fltr_1, this.title_fltr_2, this.title_fltr_3, this.title_fltr_sbt_1, this.title_fltr_sbt_2, this.title_fltr_sbt_3);
      this.state_machine = StateMachine.create({
        inital: 'none',
        events: [
          {
            name: 'rotate',
            from: 'none',
            to: 'rotation'
          }, {
            name: 'open',
            from: 'rotation',
            to: 'opening'
          }, {
            name: 'getsig',
            from: ['rotation', 'opening'],
            to: 'sig'
          }, {
            name: 'rotatesig',
            from: ['sig'],
            to: 'rotatedsig'
          }, {
            name: 'openfilter',
            from: ['rotatedsig'],
            to: 'openedfilter'
          }, {
            name: 'previewfilter',
            from: ['openedfilter'],
            to: 'filterbtns'
          }
        ],
        callbacks: {
          onenterrotation: function() {
            _this.pack_rotator.addEventListener("mousedown", function(e) {
              var prevX, prevY;
              _this.pack_opener.visible = false;
              prevX = e.stageX;
              prevY = e.stageY;
              _this.pack_rotator.getStage().addEventListener("stagemousemove", function(e) {
                var deltaX, deltaY, nuFrame;
                deltaX = prevX - e.stageX;
                deltaY = prevY - e.stageY;
                prevX = e.stageX;
                prevY = e.stageY;
                nuFrame = _this.pss.frame + deltaX / 4;
                nuFrame = (nuFrame < 0 ? 106 + nuFrame : (nuFrame > 106 ? nuFrame - 106 : nuFrame));
                return _this.pss.frame = nuFrame;
              });
              return _this.pack_rotator.getStage().addEventListener("stagemouseup", function(e) {
                var targetFrame, time;
                console.log("@pack_rotator stagemouseup");
                _this.pack_rotator.getStage().removeAllEventListeners("stagemousemove");
                _this.pack_rotator.getStage().removeAllEventListeners("stagemouseup");
                targetFrame = (_this.pss.frame > 106 / 2 ? 106 : 0);
                time = (targetFrame === 0 ? _this.pss.frame : targetFrame - _this.pss.frame);
                return TweenMax.to(_this.pss, time, {
                  frame: targetFrame,
                  useFrames: true,
                  ease: Linear.easeNone,
                  onComplete: function() {
                    return _this.pack_opener.visible = true;
                  }
                });
              });
            });
            return _this.pack_opener.addEventListener("mousedown", function(e) {
              var prevX, prevY;
              _this.pack_rotator.visible = false;
              prevX = e.stageX;
              prevY = e.stageY;
              _this.pack_opener.getStage().addEventListener("stagemousemove", function(e) {
                var deltaX, deltaY, nuFrame;
                deltaX = prevX - e.stageX;
                deltaY = prevY - e.stageY;
                prevX = e.stageX;
                prevY = e.stageY;
                nuFrame = _this.pss.frame + deltaY / 4;
                nuFrame = (nuFrame < 107 ? 107 : (nuFrame > 120 ? 120 : nuFrame));
                return _this.pss.frame = nuFrame;
              });
              return _this.pack_opener.getStage().addEventListener("stagemouseup", function(e) {
                var time;
                console.log("@pack_opener stagemouseup");
                _this.pack_opener.getStage().removeAllEventListeners("stagemousemove");
                _this.pack_opener.getStage().removeAllEventListeners("stagemouseup");
                if (_this.pss.frame > 115) {
                  time = 120 - _this.pss.frame;
                  return TweenMax.to(_this.pss, time, {
                    frame: 120,
                    ease: Linear.easeNone,
                    useFrames: true,
                    onComplete: function() {
                      return _this.state_machine.getsig();
                    }
                  });
                } else {
                  return TweenMax.to(_this.pss, time, {
                    frame: 107,
                    ease: Linear.easeNone,
                    useFrames: true,
                    onComplete: function() {
                      return _this.pack_rotator.visible = true;
                    }
                  });
                }
              });
            });
          },
          onleaverotation: function() {
            _this.pack_opener.visible = false;
            _this.pack_rotator.visible = false;
            _this.pack_opener.removeAllEventListeners("mousedown");
            return _this.pack_rotator.removeAllEventListeners("mousedown");
          },
          onenteropen: function() {
            return console.log('on enter open');
          },
          onentersig: function() {
            _this.pss2.y += 6;
            _this.pss2.frame = 121;
            _this.pss2.visible = true;
            _this.pss2.rotation = -90;
            _this.pss2.scaleX = _this.pss2.scaleY = .597;
            _this.pss2.maskLeft = 690;
            _this.pack_opener.visible = true;
            return _this.pack_opener.addEventListener("mousedown", function(e) {
              var prevX, prevY;
              prevX = e.stageX;
              prevY = e.stageY;
              _this.pack_opener.getStage().addEventListener("stagemousemove", function(e) {
                var deltaX, deltaY, nuy;
                deltaX = prevX - e.stageX;
                deltaY = prevY - e.stageY;
                prevX = e.stageX;
                prevY = e.stageY;
                nuy = _this.pss2.y - deltaY;
                if (nuy < 7) {
                  _this.pss2.y = nuy;
                  return _this.pss2.maskLeft -= deltaY * 1 / .597;
                }
              });
              return _this.pack_opener.getStage().addEventListener("stagemouseup", function(e) {
                _this.pack_opener.getStage().removeAllEventListeners("stagemousemove");
                _this.pack_opener.getStage().removeAllEventListeners("stagemouseup");
                if (_this.pss2.y > -70) {
                  return TweenMax.to(_this.pss2, .5, {
                    y: 6,
                    maskLeft: 690
                  });
                } else {
                  _this.pack_opener.visible = false;
                  _this.pack_opener.removeAllEventListeners("mousedown");
                  _this.pack_opener.getStage().removeAllEventListeners("stagemousemove");
                  TweenMax.to(_this.pss, 1.5, {
                    y: 1000
                  });
                  return TweenMax.to(_this.pss2, .5, {
                    maskLeft: 0,
                    y: 0,
                    onComplete: function() {
                      return _this.state_machine.rotatesig();
                    }
                  });
                }
              });
            });
          },
          onenterrotatedsig: function() {
            TweenMax.to(_this.pss2, .5, {
              scaleX: 1,
              scaleY: 1,
              rotation: 0
            });
            return _this.pack_opener.getStage().addEventListener("click", function() {
              return _this.state_machine.openfilter();
            });
          },
          onenteropenedfilter: function() {
            _this.pack_opener.getStage().removeAllEventListeners("click");
            console.log(_this.pss2.frame);
            TweenMax.to(_this.pss2, 110 * 2, {
              frame: 121 + 110,
              ease: Linear.easeNone,
              useFrames: true,
              onComplete: function() {
                return _this.state_machine.previewfilter();
              }
            });
            TweenMax.to(_this.title, .5, {
              alpha: 1
            });
            TweenMax.to(_this.title_fltr_1, 1, {
              alpha: 1,
              delay: 3,
              ease: Sine.easeOut
            });
            TweenMax.to(_this.title_fltr_2, 1, {
              alpha: 1,
              delay: 3.5,
              ease: Sine.easeOut
            });
            TweenMax.to(_this.title_fltr_3, 1, {
              alpha: 1,
              delay: 4,
              ease: Sine.easeOut
            });
            TweenMax.to(_this.title_fltr_sbt_1, 1, {
              alpha: 1,
              delay: 3,
              ease: Sine.easeOut
            });
            TweenMax.to(_this.title_fltr_sbt_2, 1, {
              alpha: 1,
              delay: 3.5,
              ease: Sine.easeOut
            });
            return TweenMax.to(_this.title_fltr_sbt_3, 1, {
              alpha: 1,
              delay: 4,
              ease: Sine.easeOut
            });
          },
          onenterfilterbtns: function() {
            return _this.fltr_btn_1.visible = _this.fltr_btn_2.visible = _this.fltr_btn_3.visible = true;
          }
        }
      });
      this.state_machine.rotate();
      return console.log(this.state_machine.current);
    };

    return PackComposition;

  })(createjs.Container);

  namespace("kent.packs.views", function(exp) {
    return exp.PackComposition = PackComposition;
  });

  App = (function() {
    App.prototype.stage = null;

    App.prototype.stageWidth = 1000;

    App.prototype.stageHeight = 700;

    function App() {}

    App.prototype.initStage = function() {
      var _this = this;
      console.log("initStage " + this.stageWidth + ", " + this.stageHeight);
      this.stage = new createjs.Stage("app-canvas");
      this.stage.enableMouseOver(20);
      this.preload_label = new createjs.Text("0%".toUpperCase(), "22px Verdana", "#6B747A");
      this.preload_label.textAlign = "center";
      this.preload_label.x = this.stageWidth / 2;
      this.preload_label.y = this.stageHeight / 2;
      this.stage.addChild(this.preload_label);
      TweenMax.ticker.fps(60);
      TweenMax.ticker.addEventListener("tick", this.stage.update, this.stage);
      return kent.packs.assetsManager.loadAssets({
        complete: function() {
          var pss;
          pss = new kent.packs.views.PackComposition();
          pss.x = _this.stageWidth / 2;
          pss.y = _this.stageHeight / 2;
          _this.stage.addChild(pss);
          console.log("COMPLETE");
          return _this.preload_label.visible = false;
        },
        progress: function(loaded) {
          return _this.preload_label.text = "" + (Math.round(loaded * 100)) + "%";
        },
        error: function() {}
      });
    };

    return App;

  })();

  namespace("kent.packs", function(exp) {
    return exp.app = new App();
  });

  kent.packs.app.initStage();

}).call(this);
