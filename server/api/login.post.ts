export default defineEventHandler(async (event) => {
  const { backendUrl } = useRuntimeConfig();
  const { username, password } = await readBody(event);

  const response = await $fetch.raw(`${backendUrl}/auth`, {
    method: "POST",
    body: {
      username,
      password,
    },
  });

  const cookies = response.headers.get("set-cookie")?.split(",") || [];

  for (const cookie of cookies) {
    appendHeader(event, "set-Cookie", cookie);
  }

  // // Set the user session using nuxt-auth-utils
  // await setUserSession(event, {
  //   token: response.headers.get("set-cookie"),
  // });

  return "Hello Nitro";
});
