export interface VerifyWithKYCDTO {
  "card-image": File;
  provider: string;
}

export interface UpdateUserVerificationDTO {
  isVerified: boolean;
}

export interface EKYCResponseDTO {
  alley: string;
  detection_score: number;

  th_expire: string;
  th_init: string;
  th_issue: string;

  en_expire: string;
  en_init: string;
  en_issue: string;

  th_name: string;
  th_fname: string;
  th_lname: string;
  th_dob: string;

  en_name: string;
  en_fname: string;
  en_lname: string;
  en_dob: string;

  face: string; // Base64 image
  gender: string;

  id_number: string;
  id_number_status: number;

  lane: string;
  address: string;
  home_address: string;
  house_no: string;
  village: string;
  village_no: string;
  road: string;
  privinece: string;
  district: string;
  subDistrict: string;
  postal_code: string;

  request_id: string;
  process_time: number;
  error_message: string;
}

