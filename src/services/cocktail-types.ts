/**
 * Typings for the data returned from the api's
 */

export interface GenericResponse<T> {
  drinks: T[];
}

export interface AllCocktails {
  category: string;
  cocktails: CocktailShort[];
}

export interface CocktailShort {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

export interface Category {
  strCategory: string;
}

export interface CocktailDetail extends CocktailShort, Category {
  strTags: string[];
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strIngredientsAndMeasure: IngredientMeasure[];
}

export interface IngredientMeasure {
  ingredient: string;
  measure: string;
}
