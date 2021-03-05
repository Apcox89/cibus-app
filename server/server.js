var express = require('express');
var path = require('path');
var app = express();

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

var dbConnection = path.join(__dirname + '/market1.db');
console.log(dbConnection);
const db = require('better-sqlite3')(dbConnection,  { verbose: console.log });

var port = process.env.PORT || 4100;

app.listen(port, ()=>{
  console.log('App initalized on port ' + port);
});

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + '/Bootstrap4.html')); 
});

app.get("/api/ok", (req, res, next) => {
  res.json({"message":"Ok"})
});

app.route('/api/recipe/:recipeID')
  .get((req, res) =>
  res.send(JSON.stringify(getRecipe(req.params.recipeID), null, 2)) );

function getRecipe(RecipeID) {
    // We will be getting this from the database !!!!!!
    var recipe = {RecipeTitle:"Template", Servings:"4", Ingredients:[]};
    const row = db.prepare('SELECT * FROM Recipe WHERE recipeId = ' + RecipeID).get();
    recipe.RecipeTitle = row.recipeTitle;
    //console.log(row.recipeTitle);

    const ingredientsDB = db.prepare('SELECT ingredientName FROM [vwRec-Ing] WHERE recipe_Id = ' + RecipeID).all();
    var ingredients = ingredientsDB;    
    
    recipe.Ingredients = ingredients;
    return recipe;
};


app.route('/api/ingredient/').get((req, res) => res.send(JSON.stringify(getIngredient(), null, 2)) );

function getIngredient(){
  console.log("is working")

  var ingredient = {Ingredients: []}
  const ingredientsDB = db.prepare('SELECT * FROM Ingredient').all();
  var ingredients = ingredientsDB;
  ingredient.Ingredients = ingredients;
  console.log(ingredient);

  return ingredient;
}

app.route('/api/recipe/:recipeTitle').get((req, res) => {
  const RecipeTitle = req.params['recipeTitle']
  res.send({ recipeTitle: Recipetitle })
})

app.route('/api/ingredients').post((req, res) => {
  res.send(201, req.body)
})


app.route('/api/ingredient/:ingredientName').post((req, res) => 
  res.send(JSON.stringify(postIngredient(req.params.ingredietnName), null, 2)) );

function postIngredient(IngredientName){

    var ingredient = {Ingredients: req.body.ingredientName};
    //var params = [Ingredients.ingredientName];
    console.log(Ingredients.ingredientName);
    const row = db.prepare(`INSERT INTO Ingredient(ingredientName) VALUES(${IngredientName})`).run()
    ingredient.Ingredients = row.ingredientName;

}

//app.listen(3001, () => console.log('Listening on port 3001'));