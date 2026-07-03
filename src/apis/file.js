import api from "./axios";

export const uploadFile = (image) =>
    api.post("/api/files/upload", {
        image,
    });