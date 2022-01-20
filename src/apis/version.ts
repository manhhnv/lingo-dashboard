import axios from "utils/axios";
import { UpdateVersionModel, VersionModel, CreatVersionModel } from "models";

export const getCurrentVersion = async () => {
  try {
    const response = await axios.get("/api/admin/version/current");
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (e) {
    throw e;
  }
};

export const updatePlatformVersion = async (body: UpdateVersionModel) => {
  const res = await axios.put("/api/admin/version", body);
  return res.data;
};

export const getAllPlatformsVersion = async () => {
  try {
    const res = await axios.get<VersionModel[]>("/api/admin/version");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createNewVersion = async (body: CreatVersionModel) => {
  const res = await axios.post<CreatVersionModel>("/api/admin/version", body);
  return res.data;
};
