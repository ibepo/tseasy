<template>
  <div bg-orange>
    <button @click="readClipboard">
      read
    </button>
    <button @click="sw">
      read
    </button>
    {{ text }}
  </div>
</template>

<script setup lang="ts">
const text = ref('')
const readClipboard = async() => {
  try {
    text.value = await navigator.clipboard.readText()
    console.log(text.value)
  }
  catch (err) {
    text.value = err.message
  }
}
const sw = () => {
  Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool',
  })
}

</script>
