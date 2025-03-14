export interface User {
  id: string;
  name: string;
  middle_name?: string | null;
  surname: string;
  email: string;
  phone_number?: string | null;
}
