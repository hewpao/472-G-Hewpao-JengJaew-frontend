import{ User} from "@/interfaces/User";

export const mockUsers: User[] = [
    {
      id: "01958b3b-d417-751b-9544-fcee1ea41ef3",
      name: 'John',
      middle_name: 'Michael',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone_number: '123-456-7890',
      is_verified: false
    },
    {
      id: '2',
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      phone_number: '987-654-3210',
      is_verified: false
    },
    {
      id: '3',
      name: 'Alice',
      middle_name: null,
      surname: 'Johnson',
      email: 'alice.johnson@example.com',
      is_verified: false
    },
    {
      id: '4',
      name: 'Bob',
      surname: 'Williams',
      email: 'bob.williams@example.com',
      middle_name: 'Robert',
      is_verified: false
    },
    {
      id: '5',
      name: 'Eva',
      middle_name: undefined,
      surname: 'Brown',
      email: 'eva.brown@example.com',
      phone_number: '555-123-4567',
      is_verified: false
    },
    {
      id: '6',
      name: 'David',
      surname: 'Davis',
      email: 'david.davis@example.com',
      is_verified: false
    }
  ];