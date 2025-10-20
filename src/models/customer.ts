export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;

  validateEmail(): boolean;
  validatePhone(): boolean;
}

export class CustomerModel implements Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;

  constructor(id: string, name: string, email: string, phone?: string, address?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    if (phone !== undefined) {
      this.phone = phone;
    }
    if (address !== undefined) {
      this.address = address;
    }
  }

  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  validatePhone(): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return this.phone ? phoneRegex.test(this.phone) : true;
  }
}
