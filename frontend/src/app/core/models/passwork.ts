import { Association } from './association';
import { Company } from './company';

export interface Passwork {
  _id: string;
  title: string;
  company: Company;
  associations: Association[];
  module: string;
  nbr_beneficiaries: string;
  start_date: Date;
  end_date: Date;
  status : string,
  training_center: TrainingCenter;
  training_modules: string;
  training_planning: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface TrainingCenter {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface PassworkResult {
  _id: string;
  totalCount: number;
  jobs: Passwork[];
}
