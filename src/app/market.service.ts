import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Market {
  name: string
}

@Injectable()
export class MarketService {
  constructor(private http: HttpClient) {}

  //when you come back to this make sure your function
  //names match in the api 

  getAllIngredients(): Observable<Market[]> {
    return this.http.get<Market[]>('/api/ingredients/')
  }

  getIngredient(ingredientName: string): Observable<Market> {
    return this.http.get<Market>('/api/ingredient/' + ingredientName)
  }

  postIngredient(ingredientName: Market): Observable<Market> {
    return this.http.post<Market>('/api/ingredient/',ingredientName )
  }

  updateIngredient(ingredient: Market): Observable<void> {
    return this.http.put<void>(
      '/api/ingredient/' + ingredient.name,
      ingredient
    )
  }

  deleteIngredient(ingredientName: string) {
    return this.http.delete('/api/ingredient/' + ingredientName)
  }
}