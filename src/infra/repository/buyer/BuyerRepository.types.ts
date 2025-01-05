import Buyer from "../../../domain/buyer/Buyer";

export interface IBuyerRepository {
  create(buyer: Buyer): Promise<any>;
  existingInRepository(field: string | null): Promise<boolean>;
  findByPhone(phone: string): Promise<any>;
}
