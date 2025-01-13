# Сервисный слой

Этот проект демонстрирует создание и применение сервисного слоя, а также настройку `axiosInstance` в контексте доклада на тему сервисных слоев.

---

## Оглавление

1. [Структура проекта](#структура-проекта)
2. [Примеры реализации сервисного слоя](#примеры-реализации-сервисного-слоя)
3. [Варианты использования промежуточного слоя](#варианты-использования-промежуточного-слоя)
4. [Обработка данных на IndexPage.vue](#обработка-данных-на-indexpagevue)
5. [Функциональность инпута](#функциональность-инпута)
6. [Инициализация и запуск проекта](#инициализация-и-запуск-проекта)
7. [Лицензия](#лицензия)

---

## Структура проекта

### Сервисы

Обратите внимание на папку `/services`. Здесь расположены все сервисы, включая `BaseService`.

### axios

В папке `/api` находится сконфигурированный клиент API — `axiosInstance`, а также вспомогательные функции и типы для его работы. В нашем проекте, помимо стандартного `ApiResponse`, определены кастомные `AxiosInstance`, `AxiosError` и различные дженерики для работы с API.

#### Типы и интерфейсы

Файл `types.ts` содержит определения типов и интерфейсов:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError as _AxiosError,
  AxiosInstance as _AxiosInstance,
} from "axios";

export interface AxiosInstance extends _AxiosInstance {
  request<T = StatusResponse, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  head<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  options<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  postForm<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  putForm<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patchForm<T = StatusResponse, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

export type AxiosError<T = StatusResponse> = _AxiosError<T>;

export type ApiResponse<T> = [null, T] | [Error];

export interface StatusResponse {
  status: "OK" | "ERROR";
  message: string;
}

export interface StatusDataResponse<T> extends StatusResponse {
  data: T;
}

interface PagedResponse<T> {
  page: number;
  pageSize: number;
  pages: number;
  total: number;
  records: T[];
}

export type PagedStatusDataResponse<T> = StatusDataResponse<PagedResponse<T>>;
```

### Специфика использования кастомных типов

Везде, где встречаются AxiosInstance и AxiosError, используются кастомные версии. Это оправдано повторяемостью ответа StatusResponse. Например:

```ts
const request = this.httpClient.postForm("/admin/popup/remove", { guid: id });
```

По умолчанию тип устанавливается как StatusResponse:

```ts
const request = this.httpClient.postForm<StatusResponse>("/admin/popup/remove", { guid: id });
```

## Примеры реализации сервисного слоя

### С базовым сервисом

- **UsersService:** Этот вариант предпочтительнее для унификации работы с сервисами.

### Без базового сервиса

- **PostsService:** Пример использования без базового сервиса.

## Варианты использования промежуточного слоя

### В композабле

- **useUser:** Предпочтительно для более сложных компонентов.

### Без композабла

- Прямое использование в компоненте для простых задач.

## Обработка данных на IndexPage.vue

При загрузке страницы `IndexPage.vue` выполняются следующие действия:

- Вызов списка пользователей через `handleGetUserList`.
- Вызов списка постов через `handleGetPostList`.

В случае возникновения ошибки во время запроса, происходит вывод уведомления с использованием `alert`.

## Функциональность инпута

- Пользователь может вводить значения от 1 до 10 (включительно) в инпут, чтобы запрашивать пользователя с указанным `id`.
- При вводе значения вне этого диапазона, произойдет вывод уведомления об ошибке с использованием `alert`.

## Инициализация и запуск проекта

### Инициализация

Установите все зависимости проекта:

```sh
yarn
```

## Запуск

Запустите проект с помощью:

```sh
yarn dev
```
