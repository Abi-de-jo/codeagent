const API = "https://codeagentserver.vercel.app/";

export const loginOrRegister = async (email, password) => {
  const res = await fetch(`${API}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
};

export const getProfile = async (token) => {
  const res = await fetch(`${API}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const saveHistory = async (data, token) => {
  const res = await fetch(`${API}/history`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getHistory = async (token) => {
  const res = await fetch(`${API}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};