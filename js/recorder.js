(function(window){

  var Recorder = function(source, cfg){
    var config = cfg || {};
    var bufferLen = config.bufferLen;
    this.context = source.context;
    if(!this.context.createScriptProcessor){
       this.node = this.context.createJavaScriptNode(bufferLen, 5, 5);
    } else {
       this.node = this.context.createScriptProcessor(bufferLen, 5, 5);
    }
    source.connect(this.node);
    this.node.connect(this.context.destination);
  };
  window.Recorder = Recorder;
})(window);
