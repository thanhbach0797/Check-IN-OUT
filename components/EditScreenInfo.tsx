import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Camera, FaceDetectionResult } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as faceapi from 'face-api.js';
import { Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';


const { width, height } = Dimensions.get('window');

export default function EditScreenInfo({ path }: { path: string }) {
  const [propsFaceDetector, setPropsFaceDetector] = useState({});
  const [type, setType] = useState('back');

  useEffect(() => {

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log('useEffect status ', status)
      // setHasPermission(status === 'granted');
    })();

  }, [type]);

  const cameraRef = useRef(null);
  const faceSvgRef = useRef(null);
  const handleFacesDetected = async (faces: any) => {
    setFaces(faces);

    // Xử lý kết quả nhận diện khuôn mặt tại đây
    // console.log("diện khuôn mặt tại đây"+faces);
    console.log(faces);
    if (camera.current) {
      //   const photo = await (camera.current as any).takePictureAsync();
      //   const options = {
      //     detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
      //     minDetectionInterval: 0,
      //     mode: FaceDetector.FaceDetectorMode.fast,
      //     runClassifications: FaceDetector.FaceDetectorClassifications.all,
      //     tracking: false
      //   }
      //   const faces = await FaceDetector.detectFacesAsync(photo.uri, options);

      // for (let i = 0; i < faces.faces.length; i++) {
      //   // face.bounds là hình chữ nhật bao quanh khuôn mặt
      //   // face.landmarks chứa các điểm trên khuôn mặt, chẳng hạn như mắt, mũi, miệng, vv.
      //   console.log('Khuôn mặt được phát hiện:', (faces.faces[i] as any).LEFT_EYE.x);

      //   // Ví dụ: Vẽ một điểm ở trung tâm mắt trái
      //   const leftEyeCenterX = (faces.faces[i] as any).LEFT_EYE.x;
      //   const leftEyeCenterY = (faces.faces[i] as any).LEFT_EYE.y;
      //   const radius = 2; // Độ lớn của điểm

      //   // Vẽ điểm lên camera
        
      //       (camera.current as Camera).getCamera().addDrawCallback(() => {
      //         const ctx = camera.getDrawingContext();
      //         ctx.fillStyle = 'red'; // Màu của điểm
      //         ctx.beginPath();
      //         ctx.arc(leftEyeCenterX, leftEyeCenterY, radius, 0, 2 * Math.PI);
      //         ctx.fill();
      //       });
      //   }

      if (faceSvgRef.current) {
        const svg = faceSvgRef.current;
  
        // Clear the previous drawings
        // (svg as any).clear();
  
        for (let i = 0; i < faces.faces.length; i++) {
          // Vẽ một điểm ở trung tâm mắt trái
          const leftEyeCenterX = (faces.faces[i] as any).LEFT_EYE.x;
          const leftEyeCenterY = (faces.faces[i] as any).LEFT_EYE.y;
          const radius = 2; // Độ lớn của điểm
          const color = 'red'; // Màu của điểm
  
          (svg as any).circle(leftEyeCenterX, leftEyeCenterY, radius).fill(color);
        }
      }
    }
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
      // setFaces(faces as any);
      console.log(faces)
      console.log("---------------------------")
      console.log(JSON.stringify(faces).toString())

      // Sử dụng face-api.js để xử lý khuôn mặt
      // Ví dụ: nhận dạng khuôn mặt
      console.log("2---------------------------" + photo.uri)
      const image = await faceapi.fetchImage(photo.uri);
      console.log(image)
      const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
      console.log(JSON.stringify(detections).toString())
    }
  };

  const [faces, setFaces] = useState([]);

  const handleFaceDetected = (faces: any) => {
    setFaces(faces);
  };

  const faceData = {
    "smilingProbability": 0.009467480704188347,
    "BOTTOM_MOUTH": {
      "y": 1201.5367431640625,
      "x": 609.0150146484375
    },
    "RIGHT_EYE": {
      "y": 1008.9952392578125,
      "x": 693.0792236328125
    },
    "leftEyeOpenProbability": 0.9938164353370667,
    "yawAngle": 1.0458520650863647,
    "RIGHT_CHEEK": {
      "y": 1120.9515380859375,
      "x": 717.6363525390625
    },
    "LEFT_MOUTH": {
      "y": 1174.7535400390625,
      "x": 552.8836059570312
    },
    "LEFT_CHEEK": {
      "y": 1110.604248046875,
      "x": 507.4426574707031
    },
    "NOSE_BASE": {
      "y": 1070.049072265625,
      "x": 616.664306640625
    },
    "rightEyeOpenProbability": 0.9932752251625061,
    "RIGHT_EAR": {
      "y": 1110.1650390625,
      "x": 770.2550659179688
    },
    "bounds": {
      "size": {
        "width": 447,
        "height": 446
      },
      "origin": {
        "y": 837,
        "x": 394
      }
    },
    "RIGHT_MOUTH": {
      "y": 1180.7015380859375,
      "x": 666.8380737304688
    },
    "LEFT_EYE": {
      "y": 1001.9029541015625,
      "x": 543.7259521484375
    },
    "rollAngle": 2.6758410930633545,
    "LEFT_EAR": {
      "y": 1089.8116455078125,
      "x": 445.0231628417969
    }
  };

  const imageUri = 'URL_CUA_ANH_CUA_BAN';

  const leftEye = {
    left: (faceData.LEFT_EYE.x / faceData.bounds.size.width) * width,
    top: (faceData.LEFT_EYE.y / faceData.bounds.size.height) * height,
  };
  console.log(leftEye)

  const rightEye = {
    left: (faceData.RIGHT_EYE.x / faceData.bounds.size.width) * width,
    top: (faceData.RIGHT_EYE.y / faceData.bounds.size.height) * height,
  };


  return (
    <View style={styles.container}>
      <Camera
          style={styles.camera}
          type={type}
          ref={camera}
          {...propsFaceDetector}
          onCameraReady={() => {
            setPropsFaceDetector({
              onFacesDetected: handleFacesDetected,
              faceDetectorSettings: {
                mode: FaceDetector.FaceDetectorMode.fast,
                minDetectionInterval: 100,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                runClassifications: FaceDetector.FaceDetectorClassifications.all,
                tracking: false,
              },
            })
          }
          }
        />
          <View style={styles.overlay}>
        {(faces as any).faces && (faces as any).faces.map((face: any, index: any) => (
          <View key={index}>
            <View
              key={index}
              style={{
                position: 'absolute',
                borderColor: 'red',
                borderWidth: 2,
                borderRadius: 10,
                left: face.bounds.origin.x,
                top: face.bounds.origin.y,
                width: face.bounds.size.width,
                height: face.bounds.size.height,
              }}
            >
              <Text style={styles.text}> Bạch đẹp trai </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  canvas: {
    flex: 1,
  },
  text: { color: 'white', marginTop: -20, marginLeft: 'auto', marginRight: 'auto' },
});
