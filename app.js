
var uid = -1;
    var turnFlag = true;
var start = function () {
    var playercard1 = document.getElementById('card1');
    var playercard2 = document.getElementById('card2');
    var dealercards = document.getElementById('dealerarea');
    var wsImpl = window.WebSocket || window.MozWebSocket;
    var playerchipfield = document.getElementById('totalplayerchips');
    var input = document.getElementById('sendText');
    var enc = new TextEncoder(); // always utf-8

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

      playercard1.src = "card-assets/" + (json['Rank1']) + (json['Suit1'].toUpperCase()) + ".png";
      playercard2.src = "card-assets/" + (json['Rank2']) + (json['Suit2'].toUpperCase()) + ".png";
      playerchipfield.innerHTML = json['InitialChips'];

      break;
      case 2: // Show the flop
      var ranks = json['Ranks'];
      var suits = json['Suits'];
      if (ranks.length != suits.length)
        console.error('didn\'t receive equal ranks and suits.');
        for(var i=0; i<ranks.length; i++){
          let image = document.createElement('img');
          image.src = "card-assets/" + (ranks[i] + suits[i].toUpperCase())+ ".png";
          image.className = "dealercard";
          dealerarea.appendChild(image);
        }
        /*
      dealercard1.src = "card-assets/" + (ranks[0] + suits[0].toUpperCase())+ ".png";
      dealercard2.src = "card-assets/" + (ranks[1] + suits[1].toUpperCase())+ ".png";
      dealercard3.src = "card-assets/" + (ranks[2] + suits[2].toUpperCase())+ ".png";*/
      break;
      case 3: // Add new card
      let image = document.createElement('img');
      image.src = "card-assets/" + (json['Rank'] + json['Suit'].toUpperCase())+ ".png";
      image.className = "dealercard";
      dealerarea.appendChild(image);
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
      case 6:
        if(uid == json['WinnerIds'])
          alert("you won");
        else
          alert(json['WinnerIds']+" won");
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
          SendString(JSON.stringify(GetBaseJsonPacket(0,uid)));
        });

        $("#checkButton").click(function(){
          SendString(JSON.stringify(GetBaseJsonPacket(2,uid)));
        });

        $("#foldButton").click(function(){
          SendString(JSON.stringify(GetBaseJsonPacket(2,uid)));
        });

        $("#bidButton").click(function() {
          var bid = document.getElementById('bidAmount').value;
          checkBid(bid);
        });
}



    function GetBaseJsonPacket(type, payload=null){
      var jsonPacket =  {"PacketId":type,"UserId":payload}
      return jsonPacket;
    }

    function GARAndBetJsonPacket(type, action, payload=uid){
      var jsonPacket = {"PacketId": type, "BidAmount":action, "UserId":payload};
      return jsonPacket;
    }


    function checkBid(bidamnt){
        SendString(JSON.stringify(GARAndBetJsonPacket(1,bidamnt)));
    }

    function SendString(str){
      ws.send(str);
    }

    window.onload=start;
