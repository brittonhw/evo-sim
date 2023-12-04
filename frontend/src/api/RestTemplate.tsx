
export const EVO_SIM_BASE_URL = 'http://localhost:8300/evo-sim'

export const POSITIONS_URL = '/creature/population-positions/bytes'

export async function postData(url: string, data: any) {
  const response_json = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
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
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
  return response_blob;
}
