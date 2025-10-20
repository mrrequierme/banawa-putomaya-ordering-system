<template>
  <footer class="bg-gray-100">
    <div class="max-w-6xl mx-auto px-4 py-6">
      <div
        class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      >
        <!-- Left -->
        <div class="space-y-2">
          <h5 class="text-lg font-semibold text-gray-800">Contact Us</h5>

          <div>
            <a
              href="#home"
              class="inline-flex items-center gap-2 text-gray-600 hover:text-green-700"
            >
              <img
                src="/images/logo.jpg"
                alt="logo"
                class="w-8 h-8 rounded-full"
              />
              <span class="font-medium">Putomaya Sa Banawa</span>
            </a>

            <p class="text-gray-600 flex items-center mt-2">
              <i class="bi bi-geo-alt-fill mr-2 text-gray-600"></i>
              Banawa Cebu City, 6000 Cebu
            </p>
            <p class="text-gray-600 flex items-center mt-1">
              <i class="bi bi-telephone-fill mr-2 text-gray-600"></i>
              0923 560 9751
            </p>
            <a
              href="https://www.facebook.com/putomayasabanawa"
              class="flex items-center text-gray-600 hover:text-blue-600 mt-1"
            >
              <i class="bi bi-facebook mr-2 text-blue-600"></i>
              putomayasabanawa
            </a>
          </div>
        </div>

        <!-- Right -->
        <div class="w-full lg:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.3727205326054!2d123.87262717764493!3d10.312026563535351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99fea15034877%3A0x8e928cee9b8d90b3!2sEllen's%20Puto%20Maya%20sa%20Banawa!5e0!3m2!1sen!2sph!4v1752829306112!5m2!1sen!2sph"
            class="w-full h-72 border-0 rounded-lg shadow-md"
            loading="lazy"
            :allowfullscreen="true"
            referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
iframe {
  height: 200px;
}
</style>
