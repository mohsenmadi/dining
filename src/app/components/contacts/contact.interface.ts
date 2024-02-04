export interface ContactInterface {
  id?: number;
  name: string;
  phone: string;
  email: string;
}

export const emptyContact: ContactInterface = {
  name: '',
  phone: '',
  email: ''
}
