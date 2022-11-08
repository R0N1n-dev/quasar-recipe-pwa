<template>
  <q-page class="">
    <div>
      <RecipeForm />
    </div>
  </q-page>
</template>

<script>
import RecipeForm from "../components/RecipeForm.vue"
export default {
  name: "PageIndex",
  data: () => ({}),
  components:{
    RecipeForm
  }
};
</script>
