export type Address = {
  street: string;
  city: string;
  zipcode: string;
};

export type Company = {
  name: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  channel: "whatsapp" | "instagram" | "direct";
  label: string | null;
  address: Address;
  company: Company;
};