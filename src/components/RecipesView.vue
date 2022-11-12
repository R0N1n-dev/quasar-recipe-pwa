<template>
  <div>
    <h2>
      Recipes
      <q-avatar size="3rem" color="red">
        <b>{{ recipes.length }}</b>
      </q-avatar>
    </h2>

    <div class="row q-col-gutter-md" v-if="recipes.length > 0">
      <div
        class="col col-sm-6 col-xs-6 col-md-3"
        v-for="recipe in recipes"
        :key="recipe.id"
      >
        <router-link
          style="text-decoration: none; color: black"
          :to="{ name: 'recipe-name', params: { name: recipe.name } }"
        >
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ recipe.name }}</div>
              <div class="text-subtitle2">{{ recipe.type }}</div>
            </q-card-section>
            <q-card-actions>
              <q-btn @click="$emit('delete', recipe.id)"
                ><q-icon name="delete" />
              </q-btn>
            </q-card-actions>
          </q-card>
        </router-link>
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

<style scoped>
.q-card{
  transition: all .3s ease-in-out;
  
}

.q-card:hover {
  box-shadow: 0.4rem 0.3rem 0.6rem lightblue;
  background: linear-gradient(to left, rgb(118, 206, 235), lightblue);
}
</style>
