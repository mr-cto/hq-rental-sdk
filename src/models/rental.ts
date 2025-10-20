export interface Rental {
  id: string;
  customerId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
}

export class RentalModel {
  constructor(
    public id: string,
    public customerId: string,
    public vehicleId: string,
    public startDate: Date,
    public endDate: Date,
    public totalAmount: number,
  ) {}

  validate(): boolean {
    // Add validation logic here
    return true;
  }
}
