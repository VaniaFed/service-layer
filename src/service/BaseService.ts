import type { ApiResponse } from "@/api/type";
import type { AxiosInstance } from "axios";

export class BaseService {
  protected httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  protected async performRequest<T>(
    request: Promise<{ data: T }>
  ): Promise<ApiResponse<T>> {
    try {
      const { data } = await request;
      return [null, data];
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      return [err];
    }
  }
}
