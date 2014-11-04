var agiServer = require('ding-dong');


var handler = function(context) {
  //context is a new instance of agi.Context for each new agi session
  //immedately after asterisk connects to the node process

  context.on('variables', function(vars) {
    console.log('received new call from: ' + vars.agi_callerid + 
      ' with uniqueid: ' + vars.agi_uniqueid);
    console.log(vars);
  });

}

agiServer.createServer(handler).listen(3007);