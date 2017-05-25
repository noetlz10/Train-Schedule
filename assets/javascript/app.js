// Personal Firebase API
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAc5HXA3UeNDLy6lSKTEq5xBZTxViRwXPQ",
    authDomain: "train-schedule-be5b8.firebaseapp.com",
    databaseURL: "https://train-schedule-be5b8.firebaseio.com",
    projectId: "train-schedule-be5b8",
    storageBucket: "train-schedule-be5b8.appspot.com",
    messagingSenderId: "259244067175"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();


$("#addTrainBtn").on("click", function(){

  
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  //Military Time
  var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequencyInput").val().trim();


  var newTrain = {
    name:  trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  }


  trainData.ref().push(newTrain);

  alert("Your train was added Successfully!");

  // Console.log inputs
  console.log(newTrain.name);
  console.log(newTrain.destination); 
  console.log(firstTrainUnix);
  console.log(newTrain.frequency)


  // Clears text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  // Determines the next trains arrival.
  return false;
});


// Firebase event for adding trains to the database and in the DOM
trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tableTrainName = childSnapshot.val().name;
  var destinationTrain = childSnapshot.val().destination;
  var frequencyTrain = childSnapshot.val().frequency;
  var firstTrainTrain = childSnapshot.val().firstTrain;

  //calculate the minutes till arrival, current time in unix  and subtract the FirstTrain time and find the modulus between the difference and the frequency  
  var differenceTimes = moment().diff(moment.unix(firstTrainTrain), "minutes");
  var trainRemainder = moment().diff(moment.unix(firstTrainTrain), "minutes") % frequencyTrain ;
  var trainMinutes = frequencyTrain - trainRemainder;

  // To calculate the arrival time, add the trainMinutes to the currrent time
  var trainArrival = moment().add(trainMinutes, "m").format("hh:mm A"); 
  console.log(trainMinutes);
  console.log(trainArrival);

  console.log(moment().format("hh:mm A"));
  console.log(trainArrival);
  console.log(moment().format("X"));

  $("#trainTable").append("<tr><td>" + tableTrainName + "</td><td>" + destinationTrain + "</td><td>" + frequencyTrain + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");

});

