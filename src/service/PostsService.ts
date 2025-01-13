import axiosInstance from "@/api/axiosInstance";
import { BaseService } from "@/service/BaseService";
import type { Post } from "@/types";
import type { AxiosInstance } from "axios";

// сервис без использования базового сервиса BaseService
// работает аналогично, но выглядит не так элегантно
class PostsService {
  constructor(private httpClient: AxiosInstance) {}

  async getList() {
    try {
      const { data } = await this.httpClient.get<Post[]>("/posts");
      return [null, data];
    } catch (error) {
      console.error(error);
      return [error];
    }
  }

  async getById(id: number) {
    try {
      const { data } = await this.httpClient.get<Post>(`/posts/${id}`);
      return [null, data]
    } catch (error) {
      console.error(error);
      return [error];
    }
  }
}

export default new PostsService(axiosInstance);
