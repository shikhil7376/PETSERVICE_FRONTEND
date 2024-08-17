export interface AdminData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

export interface AuthData extends AdminData {
}

export interface KennelData extends AdminData{
}

export interface ownersCageData{
  _id:string,
  kennelname:string,
  location:string,
  maxcount:number,
  phone:string,
  pricepernight:number,
  image:string[],
  type:string,
  description:string,
  ownerId:string,
}

 export interface Booking {
  bookingid: string;
  fromdate: string;
  todate: string;
  userid: string;
  _id: string;
  totalamount: number;
  totaldays: number;
  transactionId: string;
  status: string;
  ownerid: string;
  cageImage: string;
  kennelname: string;
  cageid: string;
}

export interface CageData{
  _id?:string,
  description?:string,
  image?:string[],
  kennelname?:string,
  location?:string,
  maxcount?:number,
  ownerId?:string,
  phone?:string,
  pricepernight?:number,
  type?:string,
  currentBookings?: Booking[];
}