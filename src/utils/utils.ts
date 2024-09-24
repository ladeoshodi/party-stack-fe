import { AxiosError } from "axios";
import { IApiErrorResponse } from "../interfaces/api";

function getAxiosErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as IApiErrorResponse;
    return data.message || "An unknown error occurred";
  }
  return "An unknown error occurred";
}

export { getAxiosErrorMessage };
