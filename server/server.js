var express = require('express');
var path = require('path');
var app = express();

const cors = require('cors')
app.use(cors())

var dbConnection = path.join(__dirname + '/market1.db');
console.log(dbConnection);
const db = require('better-sqlite3')(dbConnection,  { verbose: console.log });

var port = process.env.PORT || 4100;

app.listen(port, ()=>{
  console.log('App initalized on port ' + port);
});

app.get("/ok", (req, res, next) => {
  res.json({"message":"Ok"})
});

app.get('/', (req, res)=>{
     res.sendFile(path.join(__dirname + '/Bootstrap4.html')); 
});

app.route('/recipe/:recipeID')
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


app.route('/ingredient/').get((req, res) => res.send(JSON.stringify(getIngredient(), null, 2)) );

function getIngredient(){
  console.log("is working")

  var ingredient = {Ingredients: []}
  const ingredientsDB = db.prepare('SELECT * FROM Ingredient').all();
  var ingredients = ingredientsDB;
  ingredient.Ingredients = ingredients;
  console.log(ingredient);

  return ingredient;
}

//app.listen(3001, () => console.log('Listening on port 3001'));