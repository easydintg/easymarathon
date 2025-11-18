const SERVER_URL = "https://<ТВОЙ-ПРОЕКТ>.supabase.co/functions/v1/make-server-0f55acfc";

export interface ProgressResponse {
  completedDays: number[];
  lastUpdated: string;
}

export async function getUserProgress(userId: string) {
  const url = `${SERVER_URL}/progress/${userId}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch progress");

  return await res.json() as ProgressResponse;
}

export async function saveUserProgress(userId: string, completedDays: number[]) {
  const url = `${SERVER_URL}/progress/${userId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completedDays }),
  });

  if (!res.ok) throw new Error("Failed to save progress");

  return await res.json();
}

export async function registerUser(
  userId: string,
  firstName: string,
  lastName: string,
  username: string
) {
  const url = `${SERVER_URL}/user/${userId}/register`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, username }),
  });

  if (!res.ok) throw new Error("Failed to register user");

  return await res.json();
}

export async function getUserInfo(userId: string) {
  const res = await fetch(`${SERVER_URL}/user/${userId}/info`);
  if (!res.ok) throw new Error("Failed to fetch user info");

  return await res.json();
}
