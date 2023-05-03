const redWineName = document.getElementById("redWineName");
const whiteWineName = document.getElementById("whiteWineName");
const champagneWineName = document.getElementById("champagneWineName");

const wineDisplay = document.getElementById("wineDisplay");

redWineName.addEventListener("click", function(){
  console.log(redWineName.value);
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    'http://127.0.0.1:8000/wines/' + redWineName.value
  );
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 404) {
      alert("Place not found");
    } else {
      var data = JSON.parse(xhr.response);
      let places = "";
      let foods = "";
      for (let i = 0; i < data.content[0].Places.length; i++) {
        places = places + data.content[0].Places[i] + ". ";
      }
      for (let i = 0; i < data.content[0].Food.length; i++) {
        foods = foods + data.content[0].Food[i] + ". ";
      }
      wineDisplay.innerHTML = " " + data.content[0].Name + " is " + data.content[0].WineType 
                          + " from " + places 
                          + "<br>" + "Best Consumed With: " + foods;
      console.log(data);
    }
  };

});

whiteWineName.addEventListener("click", function(){
  console.log(whiteWineName.value);
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    'http://127.0.0.1:8000/wines/' + whiteWineName.value
  );
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 404) {
      alert("Place not found");
    } else {
      var data = JSON.parse(xhr.response);
      let places = "";
      let foods = "";
      for (let i = 0; i < data.content[0].Places.length; i++) {
        places = places + data.content[0].Places[i] + ". ";
      }
      for (let i = 0; i < data.content[0].Food.length; i++) {
        foods = foods + data.content[0].Food[i] + ". ";
      }
      wineDisplay.innerHTML = " " + data.content[0].Name + " is " + data.content[0].WineType 
                          + " from " + places + "<br>" + "Best Consumed With: " 
                          + foods;
      console.log(data);
    }
  };

});

champagneWineName.addEventListener("click", function(){
  console.log(champagneWineName.value);
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    'http://127.0.0.1:8000/wines/' + champagneWineName.value
  );
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 404) {
      alert("Place not found");
    } else {
      var data = JSON.parse(xhr.response);
      let places = "";
      let foods = "";
      for (let i = 0; i < data.content[0].Places.length; i++) {
        places = places + data.content[0].Places[i] + ". ";
      }
      for (let i = 0; i < data.content[0].Food.length; i++) {
        foods = foods + data.content[0].Food[i] + ". ";
      }
      wineDisplay.innerHTML = " " + data.content[0].Name + " is " + data.content[0].WineType 
                          + " from " + places + "<br>" +  "Best Consumed With: " 
                          + foods;
      console.log(data);
    }
  };

});

