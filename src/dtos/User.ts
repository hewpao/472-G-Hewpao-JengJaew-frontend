export interface User {
    Id: string;
    Name: string;
    Middle_name?: string | null;
    Surname: string;
    IsVerified: boolean;
    Email: string;
    PhoneNumber?: string | null;
  }
  