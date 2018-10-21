var start = function () {
    var inc = document.getElementById('incomming');
    var wsImpl = window.WebSocket || window.MozWebSocket;
    var input = document.getElementById('');
    var enc = new TextEncoder(); // always utf-8

    inc.innerHTML += "connecting to server ..<br/>";
    // create a new websocket and connect
    window.ws = new wsImpl('ws://localhost:9000/');
    // when data is comming from the server, this metod is called
    ws.onmessage = function (evt) {
      var json = JSON.parse(evt.data);
      var packetId = json['PacketId'];
      inc.innerHTML += 'Received packet ID ' + packetId + '<br\>';
      switch (packetId)
      {
        case 0:
          //get uid
        //inc.innerHTML += 'Your UID is ' + json['UserId'] +
        //', login status code is ' + json['LoginStatus'] + '<br/>';
        break;
        case 1:
          //display two cards, num players and numer of chips
        //inc.innerHTML += 'There are ' + json['NumPlayers'] + ' other players.<br/>';
        //inc.innerHTML += 'You have ' + json['InitialChips'] + ' chips.<br/>';
        //inc.innerHTML += 'Your hand is ' + (json['Rank1'])
        //+ (json['Suit1']) + ' ' + (json['Rank2'])
        //+ (json['Suit2']) + '<br/>';
        break;
        case 2:
          //display flow
        break;
      }
    };
    // when the connection is established, this method is called
    ws.onopen = function () {
      inc.innerHTML += '.. connection open<br/>';
    };
    // when the connection is closed, this method is called
    ws.onclose = function () {
      inc.innerHTML += '.. connection closed<br/>';
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var val = input.value;
      var jsonMsg = JSON.stringify({'PacketId':0,'UserId':val});
      console.log(jsonMsg);
      ws.send(jsonMsg);
      input.value = "";
    });
  }

var buffer = new Uint8Array([0,255,0,4,5]).buffer;
var exampleSocket = new WebSocket("ws://10.254.186.218:9000/");

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

});

$("#foldButton").click(function() {
  SendString(JSON.stringify(GetBaseJsonPacket(0,1234)));
});

$("#checkButton").click(function() {
  SendString(JSON.stringify(GetBaseJsonPacket(0,1234)));
});

$("#foldButton").click(function() {
  SendString(JSON.stringify(GetBaseJsonPacket(0,1234)));
});

$("#foldButton").click(function() {
  SendString(JSON.stringify(GetBaseJsonPacket(0,1234)));
});
