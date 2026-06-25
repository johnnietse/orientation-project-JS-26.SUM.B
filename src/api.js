const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export function get(url) {
  return request(url);
}

export function post(url, data) {
  return request(url, { method: "POST", body: JSON.stringify(data) });
}

export function put(url, data) {
  return request(url, { method: "PUT", body: JSON.stringify(data) });
}

export function del(url) {
  return request(url, { method: "DELETE" });
}

export async function uploadLogo(file) {
  const formData = new FormData();
  formData.append("logo", file);
  const res = await fetch(`${BASE_URL}/upload/logo`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
