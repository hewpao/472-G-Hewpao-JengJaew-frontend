import { User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  middle_name?: string | null;
  surname: string;
  phone_number?: string;
}

export const mockUsers: User[] = [
    {
      id: '1',
      name: 'John',
      middle_name: 'Michael',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone_number: '123-456-7890',
    },
    {
      id: '2',
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      phone_number: '987-654-3210',
    },
    {
      id: '3',
      name: 'Alice',
      middle_name: null,
      surname: 'Johnson',
      email: 'alice.johnson@example.com',
    },
    {
      id: '4',
      name: 'Bob',
      surname: 'Williams',
      email: 'bob.williams@example.com',
      middle_name: 'Robert'
    },
    {
      id: '5',
      name: 'Eva',
      middle_name: undefined,
      surname: 'Brown',
      email: 'eva.brown@example.com',
      phone_number: '555-123-4567',
    },
    {
      id: '6',
      name: 'David',
      surname: 'Davis',
      email: 'david.davis@example.com',
  
    }
  ];