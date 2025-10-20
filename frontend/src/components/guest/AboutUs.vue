<template>
  <section id="about" class="max-w-6xl mx-auto px-4 py-10">
    <h3 class="text-center text-2xl font-semibold mb-6">About Us</h3>

    <div class="flex flex-col lg:flex-row gap-8">
      <div class="lg:w-2/3">
        <p class="text-gray-600 leading-relaxed text-justify">
          Puto Maya is a type of Filipino delicacy made from glutinous rice,
          usually cooked with coconut milk and a bit of ginger, then often
          topped with sugar or paired with ripe mangoes and sikwate (hot
          chocolate drink). This sticky rice treat is popular in the Visayas and
          Mindanao regions, especially as a traditional breakfast or snack.
          Unlike the more common steamed puto, puto maya is not fluffy but
          sticky and rich, offering a comforting and satisfying taste. Its
          combination with sweet mangoes and warm sikwate highlights the unique
          and beloved flavors of Filipino heritage cuisine.
        </p>
      </div>

      <div class="lg:w-1/3 flex justify-center">
        <img
          src="/images/aboutUsImg.jpg"
          alt="puto mango"
          class="rounded-lg shadow-md w-3/4"
        />
      </div>
    </div>
  </section>
</template>
<style scoped>
img {
  width: 350px;
  height: 200px;
  object-fit: cover;
}

@media (max-width: 768px) {
  #about {
    height: auto;
  }
  img {
    width: 200px;
  }
}
</style>
