import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  // const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  
const [scanned,setScanned] =useState(false)
  const [text, setText] = useState('Not yet scanned')
  

  // useEffect(() => {
  //   if (scannedData) {
  //     console.log('Scanned data:', scannedData);
  //     console.log("hii in scan");
  //   }
  // }, [scannedData]);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>);
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // function toggleCameraFacing() {
  //   setFacing(current => (current === 'back' ? 'front' : 'back'));
  // }

  function handleBarCodeScanned({ type,data }) {
    setScanned(true)
    setText(data);
    console.log('Barcode scanned:', data ,' type:',type);
    
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.barcodebox}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['upc_e'  , 'upc_a'],
        }}
      />
      <Text style={styles.maintext}>{text}</Text>

{scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
      
      {/* <View style={styles.buttonContainer}>
        <Button title="Flip Camera" onPress={toggleCameraFacing} />
      </View> */}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    width: 300,
    height: 300,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
