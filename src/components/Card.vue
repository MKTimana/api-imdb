<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="w-full md:w-2/3 lg:w-full dark:bg-dark-200/30 flex gap-3 text-dark-300 dark:text-surface-100 rounded-xl p-4 shadow-md shadow-black/50"
  >
    <img
      :src="movie.image_url"
      :alt="movie.title"
      class="flex min-w-32 max-w-48 min-h-44 max-h-56 border shrink-0"
    />
    <span class="flex flex-col gap-1 sm:gap-2.5 justify-evenly">
      <h2 class="text-xl font-semibold w-full border-b-2 border-accent-300">
        {{ movie.title }}
      </h2>
      <p
        class="text-justify text-clip text-sm sm:text-base md:text-lg max-h-32 line-clamp-4"
      >
        {{ movie.description }} Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta, inventore impedit nulla ipsa officia incidunt
        at numquam laudantium sit, laborum culpa quia, molestiae minus amet
        exercitationem vitae nostrum quo! Rem!
      </p>
      <button
        class="outline-0 transition-smooth self-center w-full rounded-lg shadow-sm shadow-black/30 cursor-pointer hover:scale-95 px-2 py-0.5 bg-linear-to-t from-accent-300 to-accent-200 sm:max-w-1/2"
      >
        View
      </button>
    </span>
  </div>
</template>

<style scoped></style>
