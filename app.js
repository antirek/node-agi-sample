var agiServer = require('ding-dong');


var handler = function(context) {
  //context is a new instance of agi.Context for each new agi session
  //immedately after asterisk connects to the node process

  context.on('variables', function(vars) {
    console.log('received new call from: ' + vars.agi_callerid + 
      ' with uniqueid: ' + vars.agi_uniqueid);
  });

  context.exec('ANSWER', function(err, res) {
    console.log('call answered');    
  });

  var filename = '/tmp/agent-alreadyon';
  context.streamFile(filename, function(err, res){
    console.log(err);
    console.log(res);
    
  });

  context.sayDigits('987654321', '*#', function(err, res) {
    console.log('say number');
    console.log(res);
    
  });
  
}

agiServer.createServer(handler).listen(3007);