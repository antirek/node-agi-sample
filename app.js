var agiServer = require('ding-dong');
var NAMI = require('nami').Nami;
var namiLib = require('nami');

var namiConfig = {
    host: "127.0.0.1",
    port: 5038,
    username: "admin",
    secret: "password"
};

var amiServer = new NAMI(namiConfig);
amiServer.on('namiEventDial', function (event) { 
  console.log(event)
});

var action = new namiLib.Actions.Originate();

action.Channel = 'SIP/1060';
action.Exten = '1061';
action.Context = 'default';
action.Priority = 1;



amiServer.on('namiConnected', function (event) {
    
    amiServer.send(action, function(response) {
        console.log('Action', action);
        console.log(response);
    });

});

amiServer.open();

var handler = function(context) {
  //context is a new instance of agi.Context for each new agi session
  //immedately after asterisk connects to the node process

  context.on('variables', function(vars) {
    console.log('received new call from: ' + vars.agi_callerid + 
      ' with uniqueid: ' + vars.agi_uniqueid);
    console.log(vars);
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