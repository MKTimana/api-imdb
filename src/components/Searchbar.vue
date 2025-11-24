<script>
  export default {
    name: "Seachbar",

    data() {
      return {
        query: ""
      };
    },

    methods: {
      search(){
        this.$emit("search", this.query);
      }
    }
  }
</script>

<template>
  <div class="flex rounded-xl gap-1.5 p-1.5 transition-smooth bg-surface-200 dark:bg-dark-200/30 inset-shadow-sm inset-shadow-black/40 dark:inset-shadow-black/80 outline-1 outline-transparent focus-within:outline-dark-300 dark:focus-within:outline-surface-300">
    <input
      type="text"
      v-model="query"
      placeholder="Search for a movie, tv show, documentary, ..."
      @keyup.enter="search"
      class="w-full text-base py-1.5 px-3 outline-0"
    />

    <button @click="search" class="px-1.5">Search</button>
  </div>
</template>
