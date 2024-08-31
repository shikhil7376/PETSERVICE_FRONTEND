export interface AdminData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

export interface AuthData extends AdminData {
  image:string
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
  currentBookings?: Booking[],
}

 export interface Errors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface profile extends Errors{
  _id?:string,
  image?:string
}

 export interface CageError extends CageData{
  images?: string | string[];
}

export interface AddCageError {
  kennelname?: string;
  location?: string;
  description?: string;
  maxCount?: string;
  phone?: string;
  PricePerNight?: string;
  type?: string;
  images?: string;
}

export interface EditCageError extends AddCageError {
}

export interface userData{
  _id?:string,
  name?:string,
  email?:string,
  password?:string,
  phone?:string,
  image?:string,
  isBlocked?:boolean,
  userimage?: File; 
}

export interface BookingDetails{
  details: CageData;
  userid: string | undefined;
  email: string | undefined;
  fromdate: string | undefined;
  todate: string | undefined;
  totalAmount: number;
  totalDays: number;
}


export interface PostError {
  description?:string,
  age?:string,
  images?:string
}


export type postdetails = {
  id: string;
  description: string;
  images?: string[];
  likeCount?: number;
  commentCount?: number;
  likes?: string[];
  user?: {
    name: string;
    email: string;
    image: string;
  };
};

export interface booking{
  kennelname:string,
  cageid:string,
  userid:string,
  fromdate:string,
  todate:string,
  totalamount:number,
  totaldays:number,
  transactionId:string,
  status:string,
  ownerid:string,
  cageImage: string,
  _id?:string,
  phone?:string,
  username?:string
}