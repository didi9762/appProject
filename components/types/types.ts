export type Requests = {
    userId:string,
    time:Date
  };
  
  export type alertType = {
    type:string,
    info1:string,
    info2:string,
    info3?:string
  }
  

  export type User = {
    userName:string,
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    group: Array<string>;
    online:boolean;
    requests:Array<Requests>;
    tasksInProgress:Array<string>;
    tasksHistory:Array<string>;
  }
  
 export type Task = {
  type:'privet'|'public',
  id:string;
  sender:string;
  open:boolean;
  saved:boolean|string;
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
  