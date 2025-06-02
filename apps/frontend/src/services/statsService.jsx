const url = import.meta.env.VITE_API_BASE_URL;
// statsService.jsx

const BASE_URL = `${url}/v1/stats`;

async function handleResponse(res, label) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch ${label}: ${errorText}`);
  }
  return res.json();
}

async function fetchStat(endpoint, label, headers) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, { headers });
  return handleResponse(res, label);
}

export function getTotalVenues(headers) {
  return fetchStat("total-venues", "venues", headers);
}

export function getTotalStudents(headers) {
  return fetchStat("total-students", "students", headers);
}

export function getTotalUsers(headers) {
  return fetchStat("total-users", "users", headers);
}

export function getTotalAvailableVenues(headers) {
  return fetchStat("total-available", "available venues", headers);
}

export function getTotalOrders(headers) {
  return fetchStat("total-orders", "orders", headers);
}
