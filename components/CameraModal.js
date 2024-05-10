import { Button, FAB, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { View, Modal, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { TouchableOpacity, ImageBackground } from "react-native";

const CameraModal = (props) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      ...(props.modalContainerStyle ?? {}),
    },
    fab: {
      position: "absolute",
      margin: 15,
      padding: 4,
      left: 30,
      top: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 18,
    },
    camera: {
      flex: 1,
      margin: 50,
      width: 500,
      height: 500,
    },
  });
  const closeModal = () => {
    props.hideModal();
  };

  const takePicture = async () => {
    console.log("Taking picture");
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    //setStartCamera(false)
    setCapturedImage(photo);
  };

  const savePhoto = () => {
    props.setPicture(capturedImage.uri);
    setPreviewVisible(false);
    //setStartCamera(false)
    props.hideModal();
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    //setStartCamera(true)
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View>
      <Modal
        transparent={true}
        animationType={"fade"}
        visible={props.visible}
        onRequestClose={closeModal}
        statusBarTranslucent={true}
      >
        <View style={styles.container}>
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={savePhoto}
              retakePicture={retakePicture}
            />
          ) : (
            <Camera
              type={CameraType.back}
              style={styles.camera}
              ref={(r) => {
                camera = r;
              }}
              ratio="1:1"
            >
              <FAB
                style={styles.fab}
                onPress={props.hideModal}
                icon="arrow-left"
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  flexDirection: "row",
                  flex: 1,
                  width: "100%",
                  padding: 20,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    alignSelf: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={takePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: "#fff",
                    }}
                  />
                </View>
              </View>
            </Camera>
          )}
        </View>
      </Modal>
    </View>
  );
};

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  console.log("sdsfds", photo);
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraModal;
