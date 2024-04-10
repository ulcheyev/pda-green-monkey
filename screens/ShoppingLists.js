import {
  Button,
  FAB,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import ListCard from "../components/ListCard";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DataManager from "../services/DataManager";
import MonkeyModal from "../components/MonkeyModal";
import * as React from "react";
import { text } from "ionicons/icons";

const ShoppingLists = () => {
  const MAX_LIST_NAME_LENGTH = 30;
  const [visible, setVisible] = useState(false);
  const dataManager = new DataManager();
  const [lists, setLists] = useState(dataManager.getTestData()); //todo make this dynamic
  const [creationListName, setCreationListName] = React.useState("");
  const theme = useTheme();
  const styles = StyleSheet.create({
    listsContainer: {
      flex: 1,
      alignItems: "flex-start",
      marginTop: 4,
    },
    fab: {
      position: "absolute",
      margin: 15,
      padding: 4,
      right: 10,
      bottom: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 18,
    },
    button: {
      marginBottom: 15,
      backgroundColor: "#85AF9D",
    },
    buttonTitleStyle: {
      color: theme.colors.tertiary,
    },
    modalContainer: {
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    modalContentStyle: {
      padding: 15,
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.colors.primary,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    listNameInput: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      backgroundColor: theme.colors.tertiary,
    },

    templateContainer: {
      flex: 1,
      flexDirection: "row",
      width: "100%",
      gap: 20,
      alignItems: "center",
      marginBottom: 25,
    },

    templateLabel: {
      color: theme.colors.tertiary,
      fontSize: 17,
    },

    templateButton: {
      flexGrow: 1,
      backgroundColor: theme.colors.tertiary,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginTop: 10,
    },

    templateButtonTitleStyle: {
      color: "#565555",
    },
  });

  const fabOnPress = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setCreationListName("");
  };

  const createList = (list) => {
    const newList = {
      id: lists.length + 1,
      name: creationListName,
      isTemplate: false,
      progress: 0,
      items: [],
    };
    setLists([...lists, newList]);
    setVisible(false);
    setCreationListName("");
  };

  const onChangeCreationListName = (text) => setCreationListName(text);

  return (
    <View style={styles.listsContainer}>
      <FlatList
        alwaysBounceVertical={false}
        data={lists}
        renderItem={(list) => {
          return (
            <ListCard
              title={list.item.name}
              progress={{
                value: list.item.progress,
                overall: list.item.items.length,
              }}
            />
          );
        }}
      ></FlatList>
      <FAB
        icon="pencil"
        color={theme.colors.tertiary}
        style={styles.fab}
        onPress={fabOnPress}
      />
      <MonkeyModal
        visible={visible}
        hideModal={hideModal}
        modalContentStyle={styles.modalContentStyle}
        modalContainerStyle={styles.modalContainer}
        title={"Create a list"}
      >
        <View>
          <TextInput
            label="List name"
            value={creationListName}
            onChangeText={onChangeCreationListName}
            style={styles.listNameInput}
          />
        </View>
        <View style={styles.templateContainer}>
          <Text style={styles.templateLabel}>Template</Text>
          <Button
            style={styles.templateButton}
            onPress={createList}
            labelStyle={styles.templateButtonTitleStyle}
          >
            Choose template...
          </Button>
        </View>
        <Button
          style={styles.button}
          onPress={createList}
          labelStyle={styles.buttonTitleStyle}
        >
          Create
        </Button>
      </MonkeyModal>
    </View>
  );
};

export default ShoppingLists;
