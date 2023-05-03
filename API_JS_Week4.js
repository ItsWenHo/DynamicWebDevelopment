// 1. Add your dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// 2. Instantiate your Express application
const app = express();

// 3. Add your express middleware
// 3. Middleware: serve public as a static folder
app.use(express.static("public"));
// 3. Middleware: parse http request body as json
app.use(express.json());

// This is not necessary for the API, but let's keep it in, why not
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// 4. Add functions to read/write to toppings.json when API requests are made
// 4.1 Returns the contents as JSON of toppings.json
function getWines() {
  const contents = fs.readFileSync(path.join(__dirname, "./api_comments.json"));
  const obj = JSON.parse(contents);
  return obj.content;
}

function getWine(name) {
  const wines = getWines();
  let result = [];
  for (let i = 0; i < wines.length; i++) {
    if(name == wines[i].Name){
      result.push(wines[i]);
    }
  }
  result = {"content": result};
  console.log(result);
  return result;
}

// 4.2 Adds a new topping to the pizzaToppings array,
// then saves the object to disk
function addWine(wineType, name, places, food) {
  const wines = getWines();
  let newWine = {"WineType": wineType,
  "Name": name,
  "Places": [places],
  "Food": [food]};
  // Push updates the original array
  wines.push(newWine);
  let result = {"content" : wines};
  fs.writeFileSync(path.join(__dirname, "./api_comments.json"), JSON.stringify(result));
  return result;
}

// 4.2 Deletes a topping from the pizzaToppings array,
// then saves the object to disk
function deleteWine(wineNameToDelete) {
  const wines = getWines();
  let result = [];
  for (let i = 0; i < wines.length; i++) {
    if(wineNameToDelete != wines[i].Name){
      result.push(wines[i]);
    }
  }
  result = {"content": result};
  fs.writeFileSync(path.join(__dirname, "./api_comments.json"), JSON.stringify(result));
  return result;
}

// 5 Create API endpoints
// 5.1 GET /toppings - returns the list of all toppings
// curl http://localhost:3000/wines
app.get("/wines", (req, res) => {
  const wines = getWines();
  res.append('Access-Control-Allow-Origin', ['*']);
  res.json(wines);
});

app.get("/wines/:name", (req, res) => {
  const wineToGet = req.params.name;
  const result = getWine(wineToGet);
  res.append('Access-Control-Allow-Origin', ['*']);
  res.json(result);
});

// 5.2 POST /toppings - adds the topping in req.body.topping to the topping array
// curl -X POST -H 'Content-Type: application/json' -d '{"name":"name", "wineType":"wine type", "places":"places", "food":"food"}' http://localhost:3000/wines
app.post("/wines", (req, res) => {
  //wineType, name, places, food
  const wineType = req.body.wineType;
  const name = req.body.name;
  const places = req.body.places;
  const food = req.body.food;

  let result = addWine(wineType, name, places, food);
  // often, updated list will be returned by API
  res.append('Access-Control-Allow-Origin', ['*']);
  res.json(result);
});

// 5.2 DELETE /toppings/:name - removes the topping in :name from the topping array
// curl -X DELETE http://localhost:3000/wines/{name}
app.delete("/wines/:name", (req, res) => {
  const wineToDelete = req.params.name;
  const result = deleteWine(wineToDelete);
  res.append('Access-Control-Allow-Origin', ['*']);
  res.json(result);
});

// 6 Start the server
app.listen(8000, () => {
  console.log("Server is listening on port 8000!");
});
