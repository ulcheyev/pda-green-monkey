import * as React from "react";
import {
  Portal,
  Text,
  Button,
  PaperProvider,
  useTheme,
  TextInput,
} from "react-native-paper";
import { Modal, StyleSheet, View } from "react-native";
import { useState } from "react";

const ModalCreateList = (props) => {
  const [text, setText] = useState("");

  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: 20,
      height: 500,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      width: "100%",
    },
    bottomButtonContainer: {
      position: "absolute",
      backgroundColor: "blue", // Цвет вашей навигационной панели
    },
  });

  const createList = (list) => {
    props.hideModal();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Содержимое вашего модального окна */}
            <Button
              title="Закрыть модальное окно"
              onPress={() => console.log("slavik")}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.bottomButtonContainer}>
        <Button
          title="Открыть модальное окно"
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
};

export default ModalCreateList;
