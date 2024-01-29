export type Group = {
    type: string;
    name: string;
    groupId: string;
  };
  
  export type User = {
    userName:string,
    id: string;
    name: string;
    lastName: string;
    phone: string;
    listGroups: Group[];
  }|any;
  
 export type Task = {
    id:string;
    sender:string;
    open:boolean;
    save:boolean;
    close:boolean;
    address:string;
    price:number;
    username?:string;
  } |null