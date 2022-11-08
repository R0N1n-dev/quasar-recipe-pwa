<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col col-md-6 col-sm-12 col-xs-10">
        <q-input
          autogrow
          type="text"
          class="input my-1"
          placeholder="name"
          v-model="name"
        />
        <q-input
          type="text"
          class="input my-1"
          placeholder="type"
          v-model="type"
        />
        <q-input
          type="text"
          class="input my-1"
          placeholder="ingredientMeasure"
          v-model="inMeasure"
        />
        <q-btn class="button is-primary" @click.prevent="addIn">
          Add ingredient
        </q-btn>
        <div v-if="ingredients.length > 0">
          {{ ingredients.length }} ingredients
        </div>
        <div>
          <q-input v-model="step" filled autogrow></q-input>
          <q-btn @click.prevent="addStep">Add step</q-btn>
        </div>
        <div v-if="cookingSteps.length > 0">
          {{ cookingSteps.length }} steps
        </div>
        <q-btn @click.prevent="addRecipe">Add recipe</q-btn>
      </div>
      <div class="col col-md-8 col-sm-8 col-xs-10">
        <RecipesView :recipes="recipes" @delete="deleteRecipe" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipesView from "../components/RecipesView.vue";
import { db } from "../base";
import { v4 as uuidv4 } from "uuid";
export default {
  components: { RecipesView },
  data: () => ({
    name: "",
    type: "",
    inMeasure: "",
    ingredients: [],
    step: "",
    cookingSteps: [],
    newRecipeAdded: false,
    recipes: [],
  }),
  methods: {
    addIn() {
      if (this.inMeasure !== "") {
        this.ingredients.push(this.inMeasure);
        this.inMeasure = "";
        console.log("Succesfully added ingredient");
        console.log(this.ingredients);
      } else {
        alert("No ingredient, please add");
        return;
      }
    },
    addStep() {
      if (this.step !== "") {
        this.cookingSteps.push(this.step);
        this.step = "";
        console.log("Added cooking step");
      } else {
        alert("Step not added, add first");
        return;
      }
    },
    async addRecipe() {
      try {
        let newRecipe = {
          id: uuidv4(),
          name: this.name,
          type: this.type,
          ingredients: this.ingredients,
          cookingSteps: this.cookingSteps,
        };
        await db.collection("Recipes").add(newRecipe);
        console.log("New recipe added");
        this.name = "";
        this.type = "";
        this.ingredients.length = 0;
        this.cookingSteps.length = 0;
        this.reLoad(200);
        this.getRecipes();
      } catch (error) {
        console.log(error.message);
      }
    },
    getRecipes() {
      db.collection("Recipes")
        .get()
        .then((Recipes) => {
          this.recipes = Recipes;
        });
    },
    deleteRecipe(id) {
      db.collection("Recipes")
        .doc({ id })
        .delete()
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          console.log("Recipe successfully deleted");
          this.reLoad(200);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          alert(err + "Error deleting recipe");
        });
    },
    reLoad(time) {
      setTimeout(() => {
        this.getRecipes();
      }, time);
    },
  },
  mounted() {
    this.getRecipes();
  },
};
</script>
