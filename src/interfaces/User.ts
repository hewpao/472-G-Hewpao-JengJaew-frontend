export interface User {
  id: string;
  name: string;
  middle_name?: string | null;
  surname: string;
  is_verified: boolean;
  email: string;
  phone_number?: string | null;
}
