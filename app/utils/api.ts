import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";

export function useApiFetch<DataT>(
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options: NitroFetchOptions<NitroFetchRequest> = {}
) {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();

  const headers = {
    ...options.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // Get cookie headers
  // if (import.meta.client) {
  //   const token = useCookie("token");
  //   const refreshToken = useCookie("refreshToken");

  //   Object.assign(headers, {
  //     Authorization: `Bearer ${token.value}`,
  //     "Refresh-Token": `Bearer ${refreshToken.value}`,
  //   });
  // }

  return $fetch<DataT>(`${backendUrl}${url}`, {
    ...options,
    // credentials: "include",
    headers,
  });
}

export function useApiFetchRaw<DataT>(
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options: NitroFetchOptions<NitroFetchRequest> = {}
) {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();

  const headers = {
    ...options.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return $fetch.raw<DataT>(`${backendUrl}${url}`, {
    ...options,
    credentials: "include",
    headers,
  });
}
