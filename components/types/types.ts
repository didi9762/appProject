export type Requests = {
    userId:string,
    time:Date
  };
  
  export type User = {
    userName:string,
    id: string;
    name: string;
    lastName: string;
    phone: string;
    group: Array<string>;
    online:boolean;
    requests:Array<Requests>
  }
  
 export type Task = {
  type:'privet'|'public',
  id:string;
  sender:string;
  open:boolean;
  save:boolean|string;
  close:boolean;
  address:string;
  senderAddress:string;
  price:number;
  username?:string;
  notes:string;
  targetPhone?:string;
  wehicleType?:'motor'|'car'|'station';
  } |null


  export type Filters = {
minPrice:number;
wehicleType:'motor'|'car'|'station'|'';
  }|null

  export const defaultFilters:Filters = {
wehicleType:'',
minPrice:0
  }
  