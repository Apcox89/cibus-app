import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipePageComponent } from './recipe-page.component';
import { AddIngredientComponent } from './add-ingredient.component';

const routes: Routes = [
  {path: 'recipe-page', component: RecipePageComponent},
  {path: 'add-ingredient', component: AddIngredientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
