<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col col-md-6 col-sm-12 col-xs-10">
        <div class="q-pa-md">
          <q-stepper
            v-model="step"
            vertical
            header-nav
            color="primary"
            keep-alive
            animated
          >
            <q-step
              :name="1"
              title="Name of dish"
              icon="settings"
              :done="step > 1"
            >
              <q-input
                autogrow
                type="text"
                class="input my-1"
                placeholder="name"
                v-model="name"
                label="Name of dish"
              />

              <q-stepper-navigation>
                <q-btn @click="step = 2" color="primary" label="Continue" />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="2"
              title="Food type"
              caption="E.g snack, stew"
              icon="create_new_folder"
              :done="step > 2"
            >
              <q-input
                type="text"
                class="input my-1"
                placeholder="type"
                v-model="type"
                label="Type of dish"
              />

              <q-stepper-navigation>
                <q-btn @click="step = 3" color="primary" label="Continue" />
                <q-btn
                  flat
                  @click="step = 1"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="3"
              title="Ingredients"
              caption="Add ingredients & include a measure for ease"
              icon="assignment"
              :done="step > 3"
            >
              <q-input
                type="text"
                class="input my-1"
                placeholder="ingredientMeasure"
                v-model="inMeasure"
                label="Ingredient + measure"
              />
              <q-btn class="button is-primary" @click.prevent="addIn">
                Add ingredient
              </q-btn>
              <div v-if="ingredients.length > 0">
                <ul>
                  <li v-for="ingredient in ingredients" :key="ingredient">
                    {{ ingredient }}
                    <span style="cursor: pointer"
                      ><q-icon name="delete" @click.prevent="removeIngredient"
                    /></span>
                  </li>
                </ul>
              </div>
              <q-stepper-navigation>
                <q-btn @click="step = 4" color="primary" label="Continue" />
                <q-btn
                  flat
                  @click="step = 2"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="4" title="Cooking steps" icon="add_comment">
              <div>
                <q-input v-model="prepStep" filled autogrow></q-input>
                <q-btn @click.prevent="addStep">Add step</q-btn>
              </div>
              <div v-if="cookingSteps.length > 0">
                <ol>
                  <li v-for="step in cookingSteps" :key="step">{{ step }}
                    <span style="cursor: pointer"
                      ><q-icon name="delete" @click.prevent="removeCookingStep"
                    /></span>
                  </li>
                </ol>
              </div>
              <q-stepper-navigation>
                <q-btn
                  @click.prevent="addRecipe"
                  color="primary"
                  label="Add recipe"
                />
                <q-btn
                  flat
                  @click="step = 3"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </div>
        <div class="col col-md-8 col-sm-8 col-xs-10">
          <RecipesView :recipes="recipes" @delete="deleteRecipe" />
        </div>
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
    step: 1,
    prepStep: "",
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
    removeIngredient() {
      this.ingredients.length > 0 && this.ingredients.shift();
    },
    removeCookingStep() {
      this.cookingSteps.length > 0 && this.cookingSteps.shift();
    },
    addStep() {
      if (this.prepStep !== "") {
        this.cookingSteps.push(this.prepStep);
        this.prepStep = "";
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
