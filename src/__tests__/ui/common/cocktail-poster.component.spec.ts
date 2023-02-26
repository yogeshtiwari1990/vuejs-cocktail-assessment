import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";

import Poster from "@/ui/common/cocktail-poster.vue";

describe("CocktailPoster.vue", () => {
  const vuetify = createVuetify();

  it("should renders is page content is correct", () => {
    const wrapper = mount(Poster, {
      props: { src: "SRC", footer: "Name" },

      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper).not.undefined;
  });
});
