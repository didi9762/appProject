import React, { useState } from 'react';
import {View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

const ModalComponent = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (<View>
        <Button onPress={()=>setIsVisible(!isVisible)}>jj</Button>
        <Modal isVisible={isVisible}
               swipeDirection='down'
               
               //swipeDirection={["up", "down", "left", "right"]}
               onSwipeComplete={(e) => { setIsVisible(false); }}
               style={{ justifyContent: 'flex-end', margin: 0,height:'100%', backgroundColor:'red'}} >
           
                <Text onPress={()=>setIsVisible(false)}>Hello Modal</Text>
        </Modal>
        </View>
    );
};

export default ModalComponent;