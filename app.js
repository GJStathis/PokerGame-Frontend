
/*var app = (function() {

  var socket = io.connect("http://10.254.186.218:9000");

   socket.on('connect', function() {
     console.log("User connected");
   });

   socket.on('connect_error',function(){
     console.log("error connecting to server");
   });

   $("#login").click(function() {
     console.log("Sending");
     socket.emit([0x00,0x01,0x02,0x03,0x04]);
   });

   return {
     getsocket: function() {return socket;}
   }

})();
*/

var buffer = new Uint8Array([0,255,0,4,5]).buffer;

var exampleSocket = new WebSocket("ws://10.254.186.218:9000/");
/*


exampleSocket.onopen = function(event) {
  console.log("Connection opened");
  exampleSocket.send(buffer);
};*/



function SendString(str){
  exampleSocket.send(str);
}

function GetBaseJsonPacket(type, payload=null){
  var jsonPacket =  {"PacketID":type,"UserID":payload}
  return jsonPacket;
}

function AddBetAmount(jsonPacket, bet){
  jsonPacket["BetAmount"] = bet;
  return jsonPacket;
}

$("#loginButton").click(function() {
  SendString(JSON.stringify(GetBaseJsonPacket(0,1234)));
});
