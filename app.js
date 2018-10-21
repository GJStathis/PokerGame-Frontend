

var start = function () {
    var playercard1 = document.getElementById('card1');
    var playercard2 = document.getElementById('card2');
    var wsImpl = window.WebSocket || window.MozWebSocket;
    var playerchipfield = document.getElementById('totalplayerchips');
    var input = document.getElementById('sendText');
    var enc = new TextEncoder(); // always utf-8

    var uid = -1;
    var activePlayer;

    console.log("connecting to server ...");
    // create a new websocket and connect
    window.ws = new wsImpl('ws://10.254.186.218:9000/');

    // when data is comming from the server, this metod is called
    ws.onmessage = function (evt) {
    var json = JSON.parse(evt.data);
    var packetId = json['PacketId'];
    console.log('Received packet ID ' + packetId);
    switch (packetId)
    {
      case 0: // Log in
      console.log('Your UID is ' + json['UserId'] +
      ', login status code is ' + json['LoginStatus']);
      uid = json['UserId'];
      break;
      case 1: // Initial board
      console.log('There are ' + json['NumPlayers'] + ' other players.');
      console.log('You have ' + json['InitialChips'] + ' chips.');
      console.log('Your hand is ' + (json['Rank1'])
      + (json['Suit1'].toUpperCase()) + ' ' + (json['Rank2'])
      + (json['Suit2']));

      playercard1.src = "card-assets/" + (json['Rank1']) + (json['Suit1'].toUpperCase()) + ".png";
      playercard2.src = "card-assets/" + (json['Rank2']) + (json['Suit2'].toUpperCase()) + ".png";
      playerchipfield.innerHTML = json['InitialChips'];

      break;
      case 2: // Show the flop
      var ranks = json['Ranks'];
      var suits = json['Suits'];
      if (ranks.length != suits.length)
        console.error('didn\'t receive equal ranks and suits.');

      console.log('Board');
      for (var i = 0; i < ranks.length; i++)
        console.log(ranks[i] + suits[i]);
      break;
      case 3: // Add new card
      console.log(json['Rank'] + json['Suit']);
      break;
      case 4: // Mark active player
      if (json['UserId'] === uid)
      {
        activePlayer = json['IsActive'];
        console.log('You became the active player');
      }
      else
      {
        activePlayer = false;
        console.log('You are no longer the active player');
      }
      break;
    }
        };

        // when the connection is established, this method is called
        ws.onopen = function () {
            console.log("connection is opened");
        };
        // when the connection is closed, this method is called
        ws.onclose = function () {
            console.log("connection is closed");
        }

        // allows player to login to the server
        $("#logintest").click(function() {
          ws.send(JSON.stringify(GetBaseJsonPacket(0,-1)));
        });

        $("check")

/*
    form.addEventListener('submit', function(e){
    e.preventDefault();
    var val = input.value;
    var tokens = val.split(" ");
    switch (tokens[0])
    {
    case "login":
    var jsonMsg = JSON.stringify({'PacketId':0,'UserId':-1});
    ws.send(jsonMsg);
    break;
    case "check":
    var jsonMsg = JSON.stringify({'PacketId':2, 'UserId': uid});
    ws.send(jsonMsg);
    break;
    case "bet":
    var jsonMsg = JSON.stringify({'PacketId':1, 'UserId': uid, 'BetAmount':tokens[1]});
    ws.send(jsonMsg);
    break;
    case "fold":
    var jsonMsg = JSON.stringify({'PacketId':2, 'UserId': uid});
    ws.send(jsonMsg);
    break;
    }
*/

}

 window.onload = start;

//var buffer = new Uint8Array([0,255,0,4,5]).buffer;
//var exampleSocket = new WebSocket("ws://10.254.186.218:9000/");

function SendString(str){
  exampleSocket.send(str);
}

function GetBaseJsonPacket(type, payload=null){
  var jsonPacket =  {"PacketId":type,"UserId":payload}
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
