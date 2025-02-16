<template>
  <div>
    {{ data }}
    <br />
    {{ error }}
    <br />
    <UButton
      label="Logout"
      color="neutral"
      variant="outline"
      icon="i-simple-icons-github"
      @click="logout"
    />
  </div>
</template>

<script lang="ts" setup>
const data = ref();
const error = ref();
onMounted(async () => {
  try {
    const result = await useApiFetch(`/protected`, {});
    data.value = result;
  } catch (err) {
    console.error(err);
    error.value = err;
  }
});

const logout = async () => {
  try {
    await useApiFetch(`/logout`, {
      method: "POST",
    });
    navigateTo("/login");
  } catch (err) {
    console.error(err);
    error.value = err;
  }
};
</script>

<style></style>
