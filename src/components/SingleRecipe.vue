<template>
  <div>
    <p class="my-1rem text-2xl">Recipe</p>
    <q-btn @click="$router.go(-1)">Back</q-btn>
    <div v-if="recipe !== null">
      <div class="card" actionable>
        <div slot="header">
          {{ recipe.name }}
        </div>
        <div>
          <div>
            <div>
              <p class="text-xl uppercase">Ingredients</p>
              <ul>
                <li v-for="ingredient in recipe.ingredients" :key="ingredient">
                  {{ ingredient }}
                </li>
              </ul>
            </div>
            <div>
              <p class="text-xl">Steps to cook</p>
              <ol>
                <li v-for="step in recipe.cookingSteps" :key="step">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../base";
export default {
  data: () => ({
    recipe: null,
  }),
  methods: {
    getOne() {
      db.collection("Recipes")
        .doc({ name: this.$route.params.name })
        .get()
        .then((doc) => {
          this.recipe = doc;
          console.log(doc);
        });
    },
  },
  mounted() {
    this.getOne();
  },
};
</script>
