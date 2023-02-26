/**
 * Api calls to get data from the endpoint
 */
import type {
  Category,
  CocktailDetail,
  CocktailShort,
  GenericResponse,
} from "./cocktail-types";

export async function getCocktailsByCategory(
  category: string
): Promise<CocktailShort[]> {
  const query = new URLSearchParams({
    c: category,
  }).toString();

  const url = `${BASE_URL}${"/filter.php"}?${query}`;

  const response = await GetAPIHelper<GenericResponse<CocktailShort>>(url);
  return response.drinks;
}

export async function getCocktail(id: string): Promise<any> {
  const query = new URLSearchParams({
    i: id,
  }).toString();

  const url = `${BASE_URL}${"/lookup.php"}?${query}`;
  const response = await GetAPIHelper<GenericResponse<any>>(url);

  if (response.drinks.length == 0) {
    console.error("Drink not found");
    throw new Error("Drink not found");
  }

  return response.drinks[0];
}

export async function searchCocktails(
  search: string
): Promise<CocktailDetail[]> {
  const query = new URLSearchParams({
    s: search,
  }).toString();

  const url = `${BASE_URL}${"/search.php"}?${query}`;

  const response = await GetAPIHelper<GenericResponse<CocktailDetail>>(url);

  return response.drinks;
}

export async function getCategories(): Promise<Category[]> {
  const url = `${BASE_URL}${"/list.php?c=list"}`;

  const response = await GetAPIHelper<GenericResponse<Category>>(url);

  return response.drinks;
}

/**
 * Wrapper for the http requests
 * (Can be extracted to a separate file)
 */

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";
const GetAPIHelper = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    console.error("Error while fetching: " + response.status);
    throw new Error(response.statusText);
  }

  return (await response.json()) as Promise<T>;
};
