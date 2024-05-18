import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";

const PhotoPreview = ({ photo, hideModal, visible }) => {
  const styles = StyleSheet.create({
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      ...StyleSheet.absoluteFillObject,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View>
      <Modal
        visible={visible}
        animationType={"fade"}
        statusBarTranslucent={true}
        transparent={true}
        style={{
          backgroundColor: "transparent",
          flex: 1,
          width: "100%",
          height: "100%",
          position: "absolute",
          justifyContent: "center",
          top: 0,
          left: 0,
        }}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={hideModal}>
            <View style={styles.backdrop}>
              <ImageBackground
                source={{ uri: photo }}
                style={{
                  flex: 1,
                  height: "70%",
                  width: "80%",
                  marginTop: 150,
                  marginLeft: 60,
                }}
              ></ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

export default PhotoPreview;
