import type { AxiosError } from "axios";

export const generateResponseError = (error: AxiosError) => {
  let errorMessage = "Произошла непредвиденная ошибка";

  /* Кастомная обработка сообщения ошибки */

  // if (error.response?.data?.message) {
  //   errorMessage = error.response.data.message;
  // } else if (error.message) {
  //   errorMessage = error.message;
  // }
  if (error.status === 404) {
    errorMessage = "Пользователь не найден";
  }

  console.error(error)
  return new Error(errorMessage);
};
