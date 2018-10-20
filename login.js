import app from "./app.js"

var loginFunc = (function() {

  var connSocket = app.getsocket();

  $("#login").click(function() {
    console.log("Jquery is working");
    connSocket.io.connect();
  });

})();
