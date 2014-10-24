require('ding-dong').createServer(function(context) {
  //context is a new instance of agi.Context for each new agi session
  //immedately after asterisk connects to the node process

  context.on('variables', function(vars) {
    console.log('received new call from: ' + vars.agi_callerid + ' with uniqueid: ' + vars.agi_uniqueid);
  });

  context.exec('ANSWER', function(err, res) {
    console.log('call answered');
    console.log(context);
  });

  context.dial('SIP/1061', 10, function(err, res){
    console.log('call dial');
  });

}).listen(3007);