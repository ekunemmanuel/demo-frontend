<template>
  <div>
    <input v-model="user.username" placeholder="Username" />
    <input v-model="user.password" placeholder="text" type="text" />
    <button @click="login">Login</button>

    {{ data }}

    <br />
    {{ error }}

    <br />
    <UButton
      label="Home"
      color="neutral"
      variant="outline"
      icon="i-simple-icons-github"
      to="/"
    />
    <UButton
      label="Dashboard"
      color="neutral"
      variant="outline"
      icon="i-simple-icons-github"
      to="/dashboard"
    />
  </div>
</template>

<script lang="ts" setup>
// const { session, fetch } = useUserSession();
// const config = useRuntimeConfig();
const user = reactive({
  username: "admin",
  password: "password",
});
// const { execute } = await useApiFetch(`/auth`, {
//   method: "POST",
//   body: user,
// });
const { execute } = await useFetch(`/api/login`, {
  method: "POST",
  body: user,
  watch: false,
  immediate: false,
  credentials: "include", // Add this line to include credentials
});
const data = ref();
const error = ref();
const login = async () => {
  try {
    // const result = await useApiFetch(`/auth`, {
    //   method: "POST",
    //   body: user,
    // });
    // const result = await $fetch.raw(`${config.public.backendUrl}/auth`, {
    //   method: "POST",
    //   body: user,
    //   credentials: 'include' // Add this line to include credentials
    // });

    // console.log(result);

    // data.value = {
    //   ...result
    // };

    // execution of the fetch request is done here get the protected data from the backend /protected
    await execute();
    // await fetch();
    // useSession
    navigateTo("/");
  } catch (err) {
    console.error(err);
    error.value = error;
  }
};
</script>

<style></style>
