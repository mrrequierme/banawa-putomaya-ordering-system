<template>
  <section id="home" class="max-w-6xl mx-auto px-4 py-3">
    <div class="flex flex-col lg:flex-row items-center h-9/10 gap-10">
      <div class="lg:w-1/2 mb-6 lg:mb-0 Autoshow">
        <h1 class="text-4xl font-bold mb-4 text-center lg:text-left">
          Putomaya sa Banawa
        </h1>
        <p class="text-gray-600 mb-6 leading-relaxed text-center lg:text-left">
          It is a Filipino delicacy made from glutinous rice, cooked with
          coconut milk and ginger, often paired with ripe mangoes and hot
          chocolate.
        </p>
        <RouterLink
          to="/login"
          class="block w-max bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition mx-auto lg:mx-0 AutoshowBtn"
        >
          Buy Now
        </RouterLink>
      </div>

      <div class="lg:w-1/2 flex justify-center">
        <img
          src="/images/featuredPuto.jpg"
          alt="puto"
          class="featured-img AutoshowImg rounded-lg shadow-lg w-3/4"
        />
      </div>
    </div>
  </section>
</template>
<style scoped>
.featured-img {
  width: 450px;
  height: 450px;
  object-fit: cover;
}
#home {
  height: 100vh;
}

.Autoshow {
  animation: slideFadeIn 2s ease-out forwards;
}
@keyframes slideFadeIn {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.AutoshowImg {
  animation: Slide 2s ease-in;
}

@keyframes Slide {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.AutoshowBtn {
  animation: Slidebtn 2s ease-in;
}

@keyframes Slidebtn {
  0% {
    opacity: 0;
    transform: translateX(-35px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@media (max-width: 768px) {
  #home {
    height: auto;
    margin-bottom: 100px;
  }
  .featured-img {
    width: 280px;
    height: 280px;
  }
}
@media (max-width: 426px) {
  #home {
    margin-bottom: unset;
  }
}
</style>
