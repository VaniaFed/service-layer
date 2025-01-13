import axiosInstance from "@/api/axiosInstance";
import { BaseService } from "@/service/BaseService";
import type { User } from "@/types";
import type { AxiosInstance } from "axios";

class UsersService extends BaseService {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  getList() {
    const request = this.httpClient.get<User[]>(
      "/users"
    );

    return this.performRequest(request);
  }

  getById(id: number) {
    const request = this.httpClient.get<User>(
      `/users/${id}`
    );

    return this.performRequest(request);
  }

  delete(id: number) {
    const request = this.httpClient.delete(
      `/users/${id}`
    )

    return this.performRequest(request);
  }
}

export default new UsersService(axiosInstance);
