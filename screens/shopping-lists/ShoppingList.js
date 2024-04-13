import ShopCard from "../../components/ShopCard";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, FAB, TextInput, useTheme } from "react-native-paper";
import ProgressBar from "../../components/ProgressBar";
import useUtils from "../../utils/Utils";
import * as React from "react";
import { useState } from "react";
import MonkeyModal from "../../components/MonkeyModal";

const ShoppingList = (props) => {
  const [visible, setVisible] = useState(false);
  const [addShopName, setAddShopName] = React.useState("");
  const [isError, setIsError] = useState(false);
  const [shops, setShops] = useState(props.route.params.list.shops);
  const utils = useUtils();
  const theme = useTheme();
  const styles = StyleSheet.create({
    shopCardContainer: {
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
    flatList: {
      width: "100%",
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
    button: {
      marginTop: 30,
      marginBottom: 25,
      backgroundColor: "#85AF9D",
    },
    buttonTitleStyle: {
      color: theme.colors.tertiary,
    },
    shopNameInput: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      backgroundColor: theme.colors.tertiary,
    },
  });

  const fabOnPress = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setAddShopName("");
    setIsError(false);
  };

  const addShop = () => {
    if (!addShopName) {
      setIsError(true);
      return;
    }
    const newShop = {
      name: addShopName,
      items: [],
    };
    setAddShopName("");
    setIsError(false);
    setShops([...shops, newShop]);
    setVisible(false);
  };

  return (
    <>
      <ProgressBar
        progress={props.route.params.list.progress}
        total={utils.getListItemsSize(props.route.params.list)}
        backGroundStyles={{
          backgroundColor: "#caaae7",
        }}
        progressStyles={{
          backgroundColor: "#9785da",
        }}
        textStyles={{
          color: "black",
          fontSize: 17,
          fontWeight: "bold",
        }}
        height={28}
      />
      <View style={styles.shopCardContainer}>
        <FlatList
          alwaysBounceVertical={false}
          data={shops}
          style={styles.flatList}
          renderItem={(shop) => {
            return (
              <ShopCard
                shop={shop.item}
                listProgress={props.route.params.list.progress}
              />
            );
          }}
        ></FlatList>
        <FAB
          icon="plus"
          color={theme.colors.tertiary}
          style={styles.fab}
          onPress={fabOnPress}
        />
        <MonkeyModal
          visible={visible}
          hideModal={hideModal}
          modalContentStyle={styles.modalContentStyle}
          modalContainerStyle={styles.modalContainer}
          title={"Add a shop"}
        >
          <View>
            <TextInput
              label="Shop name"
              style={styles.shopNameInput}
              onChangeText={setAddShopName}
              error={isError && "red"}
            />
          </View>
          <Button
            style={styles.button}
            onPress={addShop}
            labelStyle={styles.buttonTitleStyle}
          >
            Add
          </Button>
        </MonkeyModal>
      </View>
    </>
  );
};

export default ShoppingList;
