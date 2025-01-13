// Типизация для геолокации
interface Geo {
  lat: string;
  lng: string;
}

// Типизация для адреса
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

// Типизация для компании
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Основная типизация для пользователя
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
