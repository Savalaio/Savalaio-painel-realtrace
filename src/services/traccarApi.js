const API_BASE = "https://gps.rastriando.com.br/api";

let sessionCookie = null;

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email, password }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  sessionCookie = true;
  return data;
}

export async function getDevices() {
  const res = await fetch(`${API_BASE}/devices`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch devices");
  return res.json();
}

export async function getPositions() {
  const res = await fetch(`${API_BASE}/positions`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch positions");
  return res.json();
}

export async function sendCommand(deviceId, type) {
  const res = await fetch(`${API_BASE}/commands/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ deviceId, type }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to send command");
  }
  return res.json();
}

export async function blockVehicle(deviceId) {
  return sendCommand(deviceId, "engineStop");
}

export async function unblockVehicle(deviceId) {
  return sendCommand(deviceId, "engineResume");
}

export function isLoggedIn() {
  return sessionCookie === true;
}
