<template>
  <div>
    <h2>Recipes</h2>
    <div class="row q-col-gutter-md" v-if="recipes.length > 0">
      <div class="col col-sm-6 col-xs-6 col-md-3" v-for="recipe in recipes" :key="recipe.id">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ recipe.name }}</div>
            <div class="text-subtitle2">{{ recipe.type }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn @click="$emit('delete', recipe.id)"><q-icon name="delete" /> </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    recipes: {
      type: Array,
    },
  },
};
</script>
