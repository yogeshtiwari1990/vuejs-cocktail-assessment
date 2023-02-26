import { ref, computed } from "vue";

import type {
  CocktailShort,
  Category,
  CocktailDetail,
} from "../cocktail-types";
import {
  getCocktailsByCategory,
  getCategories,
  getCocktail,
} from "../cocktail.service";

/**
 * Simple storage for all cocktails related functionality
 */
export default class CocktailsStorage {
  private static allCocktails = ref<Map<string, CocktailShort[]>>(new Map());
  private static allCategories = ref<Category[]>([]);
  private static currentCocktailTitle = ref<string>();

  private static error = ref<string>("");

  public static async setup() {
    await CocktailsStorage.fetchAllCategories();

    const tempMap: Map<string, CocktailShort[]> = new Map();
    for (const category of this.allCategories.value) {
      const cocktails = await CocktailsStorage.fetchCocktails(
        category.strCategory
      );
      tempMap.set(category.strCategory, cocktails);
    }
    CocktailsStorage.allCocktails.value = tempMap;
  }

  public static getCurrentCocktailTitle = computed(() => {
    return (): string | undefined => {
      return CocktailsStorage.currentCocktailTitle.value;
    };
  });

  public static getCocktails = computed(() => {
    return (category: Category): CocktailShort[] => {
      return (
        CocktailsStorage.allCocktails.value.get(category.strCategory) || []
      );
    };
  });

  public static getCategories = computed(() => {
    return (): Category[] => {
      return CocktailsStorage.allCategories.value;
    };
  });

  public static getError = computed(() => {
    return (): string => {
      return CocktailsStorage.error.value;
    };
  });

  public static setCurrentCocktailTitle = (title: string) => {
    CocktailsStorage.currentCocktailTitle.value = title;
  };

  public static getCocktailDetails = async (id: string) => {
    try {
      return this.toCocktailDetail(await getCocktail(id));
    } catch (e) {
      const err = e as Error;
      CocktailsStorage.error.value = err.message;
    }
  };

  private static toCocktailDetail = (cocktail: any): CocktailDetail => {
    const cocktailDetail = cocktail as CocktailDetail;

    cocktailDetail.strTags = cocktail.strTags
      ? cocktail.strTags.split(",")
      : [];

    cocktailDetail.strIngredientsAndMeasure = [];
    for (let i = 1; i < 16; i++) {
      const ingredient = cocktail["strIngredient" + i];
      const measure = cocktail["strMeasure" + i];

      if (ingredient || measure) {
        cocktailDetail.strIngredientsAndMeasure.push({
          ingredient,
          measure,
        });
      } else {
        break;
      }
    }

    return cocktailDetail;
  };

  private static fetchAllCategories = async () => {
    try {
      CocktailsStorage.allCategories.value = await getCategories();
    } catch (e) {
      const err = e as Error;
      CocktailsStorage.error.value = err.message;
    }
  };

  private static fetchCocktails = async (
    category: string
  ): Promise<CocktailShort[]> => {
    try {
      return await getCocktailsByCategory(category);
    } catch (e) {
      const err = e as Error;
      CocktailsStorage.error.value = err.message;
    }
    return [];
  };
}
