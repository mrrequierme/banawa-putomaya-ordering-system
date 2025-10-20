<template>
  <form
    @submit.prevent="handleSubmit"
    enctype="multipart/form-data"
    class="space-y-4"
  >
    <!-- Name -->
    <div>
      <label class="block text-gray-600 font-medium mb-1">Name</label>
      <input
        v-model="form.name"
        type="text"
        class="w-full border border-gray-300 rounded-lg p-2"
        required
      />
    </div>

    <!-- Price -->
    <div>
      <label class="block text-gray-600 font-medium mb-1">Price</label>
      <input
        v-model="form.price"
        type="number"
        step="0.01"
        class="w-full border border-gray-300 rounded-lg p-2"
        required
      />
    </div>

    <!-- Description -->
    <div>
      <label class="block text-gray-600 font-medium mb-1">Description</label>
      <textarea
        v-model="form.description"
        class="w-full border border-gray-300 rounded-lg p-2"
        rows="3"
        required
      ></textarea>
    </div>

    <!-- Image Preview, for edit only -->
    <div v-if="form.imagePreview">
      <label class="block text-gray-600 font-medium mb-1">Current Image</label>
      <img
        :src="form.imagePreview"
        class="w-32 h-32 object-cover rounded border"
      />
    </div>

    <!-- Image Upload -->
    <div>
      <label class="block text-gray-600 font-medium mb-1">
        {{ mode === "edit" ? "Replace Image (optional)" : "Upload Image" }}
      </label>
      <input
        type="file"
        @change="handleFileUpload"
        accept="image/png, image/jpeg"
      />
    </div>

    <!-- Submit -->
    <button
      type="submit"
      class="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark cursor-pointer"
    >
      {{ mode === "edit" ? "Update Product" : "Add Product" }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Swal from "sweetalert2";
import api from "@/plugins/axios";

const props = defineProps({
  mode: { type: String, default: "add" },
  product: { type: Object, default: null },
});
const emits = defineEmits(["submitted"]);

const form = ref({
  name: "",
  price: "",
  description: "",
  image: null,
  imagePreview: "",
});

onMounted(() => {
  if (props.product) {
    form.value = {
      name: props.product.name,
      price: props.product.price,
      description: props.product.description,
      image: null,
      imagePreview: `http://127.0.0.1:8000/storage/${props.product.image}`,
    };
  }
});

const handleFileUpload = (e) => {
  form.value.image = e.target.files[0];
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("price", form.value.price);
  formData.append("description", form.value.description);
  if (form.value.image) formData.append("image", form.value.image);

  try {
    if (props.mode === "edit") {
      await api.post(
        `/admin/products/${props.product.id}?_method=PUT`,
        formData
      );
      Swal.fire("Updated!", "Product updated successfully", "success");
    } else {
      await api.post("/admin/products", formData);
      Swal.fire("Added!", "Product added successfully", "success");
    }
    emits("submitted");
  } catch (err) {
    Swal.fire("Error", "Something went wrong", "error");
  }
};
</script>
