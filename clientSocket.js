
const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImRpZGkiLCJpYXQiOjE1MTYyMzkwMjJ9.QQtZFto9uXFKebk6QtHOmf8LzXQrbcXEQpIK8GlmAVo' 
 class DeliveryGuy {
  constructor(userId,updateData,alertFunc) {
    this.isConnect = 0
    this.serverAddress = `https://app-server-socket.onrender.com?token=${token}`; 
    this.userId = userId;
    this.getMessages =  true;
    this.sendMessage  = false;
    this.online = false;
    this.socket = new WebSocket(this.serverAddress);

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    this.socket.addEventListener('open', () => { 
      console.log(`${this.userId} Connected to the server`);
      this.initiateCommunication();
      this.online = true
    });
    
    this.socket.addEventListener('message', (event) => {
      console.log(`Received message: ${JSON.parse(event.data)}`);
      const parsedObject = JSON.parse(event.data);
      if (parsedObject.type) {
          console.log('massege:', parsedObject.message);
          alertFunc(parsedObject.type,parsedObject.message)
        }
      else {
    updateData(parsedObject);}

    });

    this.socket.addEventListener('close', () => {
      console.log(this.socket);
      this.online = false
      if(this.isConnect){
        alertFunc('success', 'disconnected successfully')
      }
      if(!this.isConnect){
      alertFunc('error','cant reach server try again')}
      updateData(null)
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



export default function newDeliverySocket(userId,updateData,alertFunc){
return new DeliveryGuy(userId,updateData,alertFunc);
}


