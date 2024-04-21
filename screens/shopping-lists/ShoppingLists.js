import { Button, FAB, Text, TextInput, useTheme } from "react-native-paper";
import ListCard from "../../components/ListCard";
import * as React from "react";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DataManager from "../../services/DataManager";
import MonkeyModal from "../../components/MonkeyModal";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";
import ShoppingList from "./ShoppingList";
import useUtils from "../../utils/Utils";

const ShoppingListsContent = (props) => {
  const [visible, setVisible] = useState(false);
  const dataManager = new DataManager();
  const utils = useUtils();
  const [lists, setLists] = useState(dataManager.getTestData());
  const [isError, setIsError] = useState(false);
  const [creationListName, setCreationListName] = React.useState("");
  const theme = useTheme();
  const styles = StyleSheet.create({
    listsContainer: {
      flex: 1,
      alignItems: "flex-start",
      paddingTop: 4,
      backgroundColor: theme.colors.tertiary,
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
    setIsError(false);
  };

  const createList = () => {
    if (!creationListName) {
      setIsError(true);
      return;
    }
    const newList = {
      id: lists.length + 1,
      name: creationListName,
      isTemplate: false,
      progress: 0,
      shops: [],
    };
    setLists([...lists, newList]);
    setVisible(false);
    setCreationListName("");
    setIsError(false);
  };

  const onChangeCreationListName = (text) => setCreationListName(text);

  return (
    <View style={styles.listsContainer}>
      <FlatList
        alwaysBounceVertical={false}
        data={lists}
        renderItem={(lizt) => {
          return (
            <ListCard
              list={lizt.item}
              progress={{
                value: lizt.item.progress,
                overall: utils.getListItemsSize(lizt.item),
              }}
              navigation={props.navigation}
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
            error={isError && "red"}
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

const ShoppingLists = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={"Shopping lists"}
      screenOptions={{
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <Stack.Screen name="Lists" component={ShoppingListsContent} />
      <Stack.Screen name={"ShoppingList"} component={ShoppingList} />
    </Stack.Navigator>
  );
};

export default ShoppingLists;
