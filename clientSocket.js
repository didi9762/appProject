
// const url = 'https://app-server-socket.onrender.com'

import TemporaryUrl from "./temperuryUrl.js";

// const ip = process.env.BASE_URL
// const ip = TemporaryUrl
// console.log(ip);
// const url = `http://${ip}:8888/client/`
// console.log('b:',url);
// // console.log('url:');

const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlck5hbWUiOiJyeWFuX21pbGxlciIsImlhdCI6MTUxNjIzOTAyMn0.bUWcin4Uf6CG4mBQlAlo46bcbuHm7WxeOzQcKQhYmrI' 
 class DeliveryGuy {
  constructor(userName,updateData,alertFunc,refreshFunc,goOfline,baseurl) {
    // When the URL is not absolute
    const url = baseurl.replace('12345', '8888');
    this.isConnect = 0
    this.serverAddress = `${url}?token=${token}`; 
    this.userId = userName;
    this.getMessages =  true;
    this.sendMessage  = false;
    this.online = false;
    this.socket = new WebSocket(this.serverAddress);

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    // this.socket.addEventListener('open', () => { 
    //   console.log(`${this.userId} Connected to the server`);
    //   this.initiateCommunication();
    //   this.online = true
    // });
    
    this.socket.addEventListener('message', (event) => {
      const parsedObject = JSON.parse(event.data);
      if (parsedObject.type) {
          if(parsedObject.type==='close'){
            alertFunc('success','sender confirm, you on a mission')
            refreshFunc();return}
            else if(parsedObject.type==='privet'||parsedObject.type==='public'){
              updateData(parsedObject);}
            else{
          alertFunc(parsedObject.type,parsedObject.message);
          }
        }
    });

    this.socket.addEventListener('close', (event) => {
      this.online = false
if(event.reason===''){
      if(this.isConnect){
        alertFunc('success', 'disconnected successfully')
      }
      if(!this.isConnect){
      alertFunc('error','cant reach server try again')}}
      else{
        alertFunc('error', 'WebSocket connection error. Please try go online again.');
      }
      goOfline(true)
      console.log('Connection closed');
    });
  }


  initiateCommunication() {
    this.socket.send(JSON.stringify({get:this.getMessages,send:this.sendMessages,id:this.userId}))
    this.isConnect=1
  }
  isOnline() {
    return this.online;
  }
 
}



export default function newDeliverySocket(userId,updateData,alertFunc,refreshFunc,goOfline,url){
return new DeliveryGuy(userId,updateData,alertFunc,refreshFunc,goOfline,url);
}


