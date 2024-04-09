import { FAB, Modal, Portal, Text, useTheme } from "react-native-paper";
import ListCard from "../components/ListCard";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DataManager from "../services/DataManager";
import ModalCreateList from "../components/ModalCreateList";

const ShoppingLists = () => {
  const [visible, setVisible] = useState(false);
  const dataManager = new DataManager();
  const [lists, setLists] = useState(dataManager.getTestData()); //todo make this dynamic

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
  });

  const fabOnPress = () => {
    const newList = {
      id: lists.length + 1,
      name: "My New Super Super Super List",
      isTemplate: false,
      progress: 0,
      items: [],
    };
    setVisible(true);
  };

  const createListHideModal = () => setVisible(false);

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
      <ModalCreateList
        visible={visible}
        hideModal={createListHideModal}
        setLists={setLists}
      />
    </View>
  );
};

export default ShoppingLists;
