Function::define = (prop, desc) ->
  Object.defineProperty this.prototype, prop, desc

namespace = (target, name, block) ->
  [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top


pad = (str, max) ->
  (if str.length < max then pad("0" + str, max) else str)