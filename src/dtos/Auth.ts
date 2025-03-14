export interface RegisterUserRequestDTO {
  email: string;
  password: string;
  name: string;
  middle_name?: string | null;
  surname: string;
}

export interface LoginWithCredentialsRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  id: string;
  email: string;
  name: string;
  middle_name?: string | null;
  surname: string;
  access_token: string;
}

export interface LoginWithOAuthRequestDTO {
  provider: string;
  id_token: string;
}
