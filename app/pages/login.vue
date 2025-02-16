<template>
  <div>
    <input v-model="user.username" placeholder="Username" />
    <input v-model="user.password" placeholder="text" type="text" />
    <button @click="login">Login</button>

    {{ data }}
  </div>
</template>

<script lang="ts" setup>
// const config = useRuntimeConfig();
const user = reactive({
  username: "admin",
  password: "password",
});
// const { execute } = await useApiFetch(`/auth`, {
//   method: "POST",
//   body: user,
// });
// const { execute: protectedExceute } = await useFetch(
//   `${config.public.backendUrl}/protected`,
//   {
//     watch: false,
//     immediate: false,
//     credentials: "include", // Add this line to include credentials
//   }
// );
const data = ref();
const login = async () => {
  try {
    const result = await useApiFetch(`/auth`, {
      method: "POST",
      body: user,
    });
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
    // await protectedExceute();

    navigateTo("/");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
