import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';


export default function EditScreenInfo({ path }: { path: string }) {
  const [propsFaceDetector, setPropsFaceDetector] = useState({});
    const [type, setType] = useState('front');

    useEffect(() => {
       
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log('useEffect status ', status)
            // setHasPermission(status === 'granted');
        })();

    }, [type]);
    const handleFacesDetected = (faces: any) => {
      // Xử lý kết quả nhận diện khuôn mặt tại đây
      // console.log(faces);
    };

    const camera = useRef(null);

    const takePicture = async () => {
      if (camera.current) {
        const photo = await (camera.current as any).takePictureAsync();
        const options = {
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          minDetectionInterval: 0,
          mode: FaceDetector.FaceDetectorMode.fast,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          tracking: false
        }
        const faces = await FaceDetector.detectFacesAsync(photo.uri, options);
        console.log("---------------------------")
        console.log(JSON.stringify(faces).toString())
      }
    };
    return (
        <View style={{ flex: 1 }}>
            
                <View style={styles.container}>
                    <Camera 
                      style={styles.camera} 
                      type={type}
                      ref={camera}
                      ratio="1:1"
                      {...propsFaceDetector}
                      onCameraReady={() => {
                        setPropsFaceDetector({
                          onFacesDetected: handleFacesDetected,
                          faceDetectorSettings: {
                            mode: FaceDetector.FaceDetectorMode.fast,
                            minDetectionInterval: 500,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                            tracking: false,
                            },
                          })
                        }
                      }
                      >
                      <View style={styles.buttonContainer}>
                      <TouchableOpacity
                              style={styles.button}
                              onPressIn={() => {
                                  setType(
                                      type == 'back'
                                          ? 'front'
                                          : 'back'
                                  );
                              }}>
                              <Text style={styles.text}> Xoay </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={styles.button}
                              onPressIn={() => {
                                takePicture()}}>
                              <Text style={styles.text}> Nhận dạng khuôn mặt </Text>
                          </TouchableOpacity>
                      </View>
                    </Camera>
                </View>
                
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {width:400, height: 400},
    camera: {width:400, height: 600},
    buttonContainer: {width:400, height: 600},
    button: {width:100, height: 100},
    text: {color: 'white'},
    text2: {}
});
