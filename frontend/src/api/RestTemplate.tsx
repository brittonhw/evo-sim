
export const EVO_SIM_BASE_URL = 'http://localhost:8300/evo-sim'
export const POSITIONS_URL = '/creature/population-positions/bytes'
export const GAMEBOARD_SAVE_URL = '/gameboard/save/'
export const AUTH_URL = '/auth'

export async function postData(url: string, data: any) {
  const response_json = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
  return response_json;
}

export async function getBlob(url: string) {
  const response_blob = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/octet-stream",
    },
    credentials: "include"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .catch((reason)  => {
      throw new Error("Not ok: " + reason)
    })
  return response_blob;
}

export async function getData(url: string) {
  const response_json = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok" + response);
      }
      return response.json();
    })
    .catch((reason)  => {
      throw new Error("Token not fetched" + reason)
    })
  return response_json;
}
