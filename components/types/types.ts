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
  