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
  <div class="searchbar">
    <input
      type="text"
      v-model="query"
      placeholder="Search for a movie, tv show, documentary, ..."
      @keyup.enter="search"
    />

    <button @click="search" class="search-btn">Search</button>
  </div>
</template>

<style>
  .searchbar {
    display: flex;
    gap: 8px;
  }

  input {
    flex: 1;
    padding: 6px;
  }

  .search-btn{
    border: none;
    border-radius: 5px;
    padding: .8em 1.5em;
    background-color: black;
    font-family: Arial;
    color: white;
    
    cursor: pointer;
  }
</style>