//---------------------call all functions, onclick-----------------------------
$("#foodButton").click(function() {
  $("#foodDiv").empty();
  displayFoursquareFood();
});

$("#coffeeButton").click(function() {
  $("#coffeeDiv").empty();
  displayFoursquareCoffee();
});

$("#weatherButton").click(function() {
  $("#weatherDiv").empty();
  weather();
});

$("#jobButton").click(function() {
  $("#jobDiv").empty();
  displayEventbriteJobs();
});

$("#musicButton").click(function() {
  $("#musicDiv").empty();
  displayEventbriteMusic();
});
$("#housingButton").click(function() {
  $("#housingDiv").empty();
  housing();
});

//-----------------------------Global Variable-----------------------------------

var city = sessionStorage.getItem("userInput");
var shortCity = sessionStorage.getItem("zillowCity");
var state = sessionStorage.getItem("zillowState");

$("#cityName").append(city);

//--------------------------------functions-------------------------------------

function displayFoursquareFood() {
  var queryURL =
    "https://api.foursquare.com/v2/venues/explore?near=" +
    city +
    "&section=food&venuePhotos=1&m=foursquare&oauth_token=XA4FOIKVQSHXMH32T3J2BKV0EQKYL5EZZYXYF4P3ATQYD2SN&v=20180308&limit=5";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("foursquare FOOD object: ");
    console.log(response);
    var link = "";
    var foodResultsTitle = $("<div>");
    $("#foodDiv").append(link);
    for (var i = 0; i < response.response.groups[0].items.length; i++) {
      link = response.response.groups[0].items[i].tips[0].canonicalUrl;
      $("#foodDiv").css("background-color", "white");
      $("#foodDiv").css("width", "50%");
      $("#foodDiv").css("margin-left", "auto");
      $("#foodDiv").css("margin-right", "auto");
      var foodResults = $("<div>");
      foodResults.append(
        "<a target = 'blank' href = " +
          link +
          "><img class = 'food-img' src = " +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .prefix +
          "original" +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .suffix +
          "></a>"
      );
      foodResults.append(
        "<h1 class='heading'><a target ='blank' href= " +
          link +
          ">" +
          response.response.groups[0].items[i].venue.name +
          "</a></h1>"
      );
      $("#foodDiv").append(foodResults);
    }
  });
}

function displayFoursquareCoffee() {
  var queryURL =
    "https://api.foursquare.com/v2/venues/explore?near=" +
    city +
    "&section=coffee&venuePhotos=1&m=foursquare&oauth_token=XA4FOIKVQSHXMH32T3J2BKV0EQKYL5EZZYXYF4P3ATQYD2SN&v=20180308&limit=5";
  //ajax request to get name and id
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("foursquare COFFEE object: ");
    console.log(response);
    var link = "";
    $("#coffeeDiv").append(link);
    for (var i = 0; i < response.response.groups[0].items.length; i++) {
      link = response.response.groups[0].items[i].tips[0].canonicalUrl;
      var coffeeResults = $("<div>");
      $("#coffeeDiv").css("background-color", "white");
      $("#coffeeDiv").css("width", "50%");
      $("#coffeeDiv").css("margin-left", "auto");
      $("#coffeeDiv").css("margin-right", "auto");
      $("#coffeeDiv").append(
        "<a target = 'blank' href = " +
          link +
          "><img class = 'coffee-img'src = " +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .prefix +
          "original" +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .suffix +
          "></a>"
      );
      $("#coffeeDiv").append(
        "<h1 class='heading'><a target ='blank' href= " +
          link +
          ">" +
          response.response.groups[0].items[i].venue.name +
          "</a></h1>"
      );
    }
  });
}
function displayEventbriteMusic() {
  var queryURL =
    "https://www.eventbriteapi.com/v3/events/search/?location.address=" +
    city +
    "&sort_by=best&categories=103&token=BXIHDDMOSK4ACTSU43OP";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("Evenbrite object: ");
    console.log(response);
    for (var i = 0; i < 5; i++) {
      var link = response.events[i].url;
      if (response.events[i].logo.url !== 0) {
        $("#musicDiv").css("background-color", "white");
        $("#musicDiv").css("width", "50%");
        $("#musicDiv").css("margin-left", "auto");
        $("#musicDiv").css("margin-right", "auto");
        var musicResults = $("<div>");
        $("#musicDiv").append(
          "<a target = 'blank' href = " +
            link +
            "><img class='music-img' src= " +
            response.events[i].logo.url +
            "></a>"
        );
        $("#musicDiv").append(
          "<a target = 'blank' href = " +
            link +
            "><h1 class='heading'>" +
            response.events[i].name.text +
            "</h1></a>"
        );
      }
    }
  });
}
function weather() {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" +
      city +
      "&units=imperial&appid=9d09809a4b038ee946dc9c53ea322c14",
    method: "GET",
  }).then(function(response) {
    console.log(response);
    console.log("Name: " + response.name);
    console.log("Max Current Temp in this city: " + response.main.temp_max);
    console.log("Min Current Temp in this city: " + response.main.temp_min);
    $("#weatherDiv").css("background-color", "white");
    $("#weatherDiv").css("width", "80%");
    $("#weatherDiv").css("margin-left", "auto");
    $("#weatherDiv").css("margin-right", "auto");
    $("#weatherDiv").css("padding", "20px");
    $("#weatherDiv").css("color", "grey");
    $("#weatherDiv").css("font-size", "15px");
    if (response.weather[0].main == "Clouds") {
      $("#weatherDiv").append(
        "<img class='weather-icon' src='Assets/Images/Weather-cloudy.png'><br>"
      );
    } else if (response.weather[0].main == "Snow") {
      $("#weatherDiv").append(
        "<img class='weather-icon' src='Assets/Images/Weather-snow.png'><br>"
      );
    } else if (response.weather[0].main == "Rain") {
      $("#weatherDiv").append(
        "<img class='weather-icon' src='Assets/Images/Weather-rain.png'><br>"
      );
    } else if (response.weather[0].main == "Clear") {
      $("#weatherDiv").append(
        "<img class='weather-icon' src='Assets/Images/Weather-clear.png'><br>"
      );
    } else {
      ("<img class='weather-icon' src='Assets/Images/Weather-misc.png'><br>");
    }
    $("#weatherDiv").append(
      "<b>" + response.weather[0].description + "</b><br>"
    );
    $("#weatherDiv").append(
      "Highs in " +
        response.name +
        ": " +
        response.main.temp_max +
        "<br>" +
        "Lows in " +
        response.name +
        ": " +
        response.main.temp_min +
        "<br>"
    );
  });
}
function displayEventbriteJobs() {
  var queryURL =
    "https://www.eventbriteapi.com/v3/events/search/?location.address=" +
    city +
    "&sort_by=best&categories=101&token=BXIHDDMOSK4ACTSU43OP";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("Evenbrite object: ");
    console.log(response);
    for (var i = 0; i < 5; i++) {
      var link = response.events[i].url;
      if (response.events[i].logo.url !== 0) {
        $("#jobDiv").css("background-color", "white");
        $("#jobDiv").css("width", "50%");
        $("#jobDiv").css("margin-left", "auto");
        $("#jobDiv").css("margin-right", "auto");
        $("#jobDiv").append(
          "<a target = 'blank' href = " +
            link +
            "><img class='job-img' src= " +
            response.events[i].logo.url +
            "></a>"
        );
        $("#jobDiv").append(
          "<a target = 'blank' href = " +
            link +
            "><h1 class='heading'>" +
            response.events[i].name.text +
            "</h1></a>"
        );
      }
    }
  });
}

function housing() {
  var zillowLink =
    "https://www.zillow.com/" + shortCity + "-" + state + "/home-values/";
  console.log(zillowLink);
  $("#housingDiv").css("background-color", "white");
  $("#housingDiv").css("width", "50%");
  $("#housingDiv").css("margin-left", "auto");
  $("#housingDiv").css("margin-right", "auto");
  $("#housingDiv").append(
    "<a target = 'blank' href = '" +
      zillowLink +
      "'>View real estate information for " +
      shortCity +
      "</a><br>"
  );

  $("#housingDiv").append(
    "<a target = 'blank' href = '" +
      zillowLink +
      "'><img class = 'zillow-img' src='Assets/Images/Zillow.png'></a>"
  );
}

//----------------------Initialize firebase, all firebase usage------------------------
var config = {
  apiKey: "AIzaSyDq0f3RJAgCPuS9R_PjfGWJQ57Xzx9sVso",
  authDomain: "project1-1520313005698.firebaseapp.com",
  databaseURL: "https://project1-1520313005698.firebaseio.com",
  projectId: "project1-1520313005698",
  storageBucket: "project1-1520313005698.appspot.com",
  messagingSenderId: "1065047897826",
};

firebase.initializeApp(config);

var database = firebase.database();

var coffeeCounter = 0;
var foodCounter = 0;
var musicCounter = 0;
var jobCounter = 0;
var weatherCounter = 0;
var housingCounter = 0;

$("#coffeeButton").on("click", function() {
  coffeeCounter++;
  updateDatabase();
});

$("#foodButton").on("click", function() {
  foodCounter++;
  updateDatabase();
});

$("#musicButton").on("click", function() {
  musicCounter++;
  updateDatabase();
});

$("#jobButton").on("click", function() {
  jobCounter++;
  updateDatabase();
});

$("#weatherButton").on("click", function() {
  weatherCounter++;
  updateDatabase();
});

$("#housingButton").on("click", function() {
  housingCounter++;
  updateDatabase();
});

function updateDatabase() {
  database.ref().set({
    coffee: coffeeCounter,
    food: foodCounter,
    music: musicCounter,
    job: jobCounter,
    weather: weatherCounter,
    housing: housingCounter,
  });
}

database.ref().on(
  "value",
  function(snapshot) {
    console.log(snapshot.val());

    housingCounter = snapshot.val().housing;
    weatherCounter = snapshot.val().weather;
    jobCounter = snapshot.val().job;
    musicCounter = snapshot.val().music;
    foodCounter = snapshot.val().food;
    coffeeCounter = snapshot.val().coffee;
  },
  function(errorObject) {
    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);
  }
);
