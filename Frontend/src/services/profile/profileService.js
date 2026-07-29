import { getUserProfile as fetchUserProfile, updateUserSubjects } from "../../api/authApi";

export async function getUserProfile() {
  return fetchUserProfile();
}

export async function updateSubjects(subjects) {
  return updateUserSubjects(subjects);
}
