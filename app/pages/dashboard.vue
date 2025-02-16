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
    <br>
    <UButton label="Login" icon="i-lucide-square-play" to="/login" />

  </div>
</template>

<script lang="ts" setup>
const data = ref();
const {
  // session: {
  //   value: { token },
  // },
  clear,
} = useUserSession();
const error = ref();
const token = useCookie('tokens');
onMounted(async () => {
  try {
    const result = await useApiFetch(`/protected`, {
      credentials: "include",
      headers: token.value ? { cookie: token.value } : undefined,
    });
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
    console.log("Logged out", token.value);
    // await clear();
    token.value = null;

    console.log("Logged out", token.value);
    
    navigateTo("/login");
  } catch (err) {
    console.error(err);
    error.value = err;
  }
};
</script>

<style></style>
