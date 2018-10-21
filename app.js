var uid = -1;
var start = function (){
    var wsImpl = window.WebSocket || window.MozWebSocket;
    var enc = new TextEncoder(); // always utf-8

    // create a new websocket and connect
    window.ws = new wsImpl('ws://10.254.186.218:9000/');
    // when data is comming from the server, this metod is called
    ws.onmessage = function (evt) {
      var json = JSON.parse(evt.data);
      var packetId = json['PacketId'];
      //inc.innerHTML += 'Received packet ID ' + packetId + '<br\>';
      switch (packetId)
      {
        case 0:
          uid = json['UserId'];
          console.log('UserID = ' + uid);
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
      console.log('.. connection open<br/>');
      SendString(JSON.stringify(GetBaseJsonPacket(0,uid)));
    };
    // when the connection is closed, this method is called
    ws.onclose = function () {
    }
}

    function GetBaseJsonPacket(type, payload=null){
      var jsonPacket =  {"PacketID":type,"UserID":payload}
      return jsonPacket;
    }

    function AddBetAmount(jsonPacket, bet){
      jsonPacket["BetAmount"] = bet;
      return jsonPacket;
    }

    function Fold() {
      SendString(JSON.stringify(GetBaseJsonPacket(3,uid)));
    }

    function Bid() {
      var input = document.getElementById('bidAmount');
      SendString(JSON.stringify(GetBaseJsonPacket(1,uid)));
    };

    function SendString(str){
      ws.send(str);
    }

    function Call(){
      SendString(JSON.stringify(GetBaseJsonPacket(2,uid)));
    }
    window.onload=start;
