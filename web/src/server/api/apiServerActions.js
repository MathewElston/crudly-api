"use server";
import ApiService from "@/lib/api/ApiService";
import db from "@/lib/database/db";

const apiService = new ApiService(db);

export async function createApiKey(userId) {
  return await apiService.createApiKey(userId);
}

export async function resetApiKey(userId) {
  return await apiService.resetApiKey(userId);
}

export async function getApiKey(userId) {
  return await apiService.getApiKey(userId);
}
