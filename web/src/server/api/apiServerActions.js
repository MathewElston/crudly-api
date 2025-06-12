"use server";
import ApiService from "@/lib/api/ApiService";
import db from "@/lib/database/db";

const apiService = new ApiService(db);

export async function createApiKey(userId) {
  return await apiService.createApiKey(userId);
}
