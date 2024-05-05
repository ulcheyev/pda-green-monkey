import ShopCard from "../../components/ShopCard";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  FAB,
  Icon,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import ProgressBar from "../../components/ProgressBar";
import useUtils from "../../utils/Utils";
import * as React from "react";
import { useState, useEffect } from "react";
import MonkeyModal from "../../components/MonkeyModal";
import useDataManager from "../../services/DataManager";

const ShoppingList = (props) => {
  const [visible, setVisible] = useState(false);
  const [addShopName, setAddShopName] = React.useState("");
  const [isError, setIsError] = useState(false);
  const [shops, setShops] = useState(props.route.params.list.shops);
  const [shopToAddItem, setShopToAddItem] = useState("");
  const [addItemName, setAddItemName] = useState("");
  const [addItemPrice, setAddItemPrice] = useState("");
  const [addItemQuantity, setAddItemQuantity] = useState("1");
  const [addItemUnit, setAddItemUnit] = useState("pts");
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);
  const [itemNameError, setItemNameError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [unitError, setUnitError] = useState(false);
  const utils = useUtils();
  const theme = useTheme();
  const dataManager = useDataManager();

  const units = ["g", "kg", "ml", "L", "pts"];

  useEffect(() => {
    utils.checkAuth().then((user) => {
      if (user) {
        console.log("User is online");
      } else {
        console.log("Getting shops local");
        dataManager.getShopsLocal(props.route.params.list.id).then((res) => {
          console.log("Got shops");
          setShops(res);
        });
      }
    });
  }, [props.route]);

  const styles = StyleSheet.create({
    shopCardContainer: {
      flex: 1,
      alignItems: "flex-start",
      paddingTop: 4,
      backgroundColor: theme.colors.tertiary,
    },
    verticalContainer: {
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
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
    addPhotoButton: {
      backgroundColor: theme.colors.tertiary,
      marginBottom: 15,
      borderRadius: 20,
      width: "85%",
    },
    horizontalContainer: {
      //marginTop: -5,

      flex: 1,
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
    },
    thirdInput: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      backgroundColor: theme.colors.tertiary,
      width: "30%",
    },
    unitButton: {
      height: 35,
      backgroundColor: theme.colors.tertiary,
      color: theme.colors.primary,
      padding: 0,
    },
    unitButtonLabel: {
      color: theme.colors.primary,
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

  const hideAddItemModal = () => {
    setAddItemModalVisible(false);
    setShopToAddItem("");
    setAddItemUnit("pts"), setAddItemQuantity("1");
    setAddItemPrice("");
    setAddItemName("");
    setItemNameError(false);
    setPriceError(false);
    setQuantityError(false);
    setUnitError(false);
  };

  const openAddItemModal = (shop) => {
    setAddItemModalVisible(true);
    setShopToAddItem(shop.name);
    //console.log(`Adding item to shop ${shop.name}`);
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
    utils.checkAuth().then((user) => {
      if (!user) {
        console.log("Adding shop local");
        dataManager
          .saveShopLocal(newShop.name, props.route.params.list.id)
          .then(() => console.log("aaaa"))
          .catch((e) => console.error(e))
          .finally(() => console.log("Help me"));
      }
    });
    setAddShopName("");
    setIsError(false);
    setShops([...shops, newShop]);
    setVisible(false);
  };

  const validateNumeric = (text) => {
    return /^\d+$/.test(text);
  };

  const validateEmpty = (text) => {
    return text.trim().length === 0;
  };

  const addItem = () => {
    /**
     * Validate name, quantity, price, unit */
    let error = false;
    if (validateEmpty(addItemName)) {
      error = true;
      setItemNameError(true);
    } else {
      setItemNameError(false);
    }
    if (validateEmpty(addItemQuantity) || !validateNumeric(addItemQuantity)) {
      error = true;
      setQuantityError(true);
    } else {
      setQuantityError(false);
    }
    if (validateEmpty(addItemPrice) || !validateNumeric(addItemPrice)) {
      error = true;
      setPriceError(true);
    } else {
      setPriceError(false);
    }
    if (validateEmpty(addItemUnit)) {
      error = true;
      setUnitError(true);
    } else {
      setUnitError(false);
    }
    if (!error) {
      console.log("Added item");
      console.log(addItemName);
      hideAddItemModal();
      //{ id: 1, name: "Item 1", measure: "kg", checked: true, quantity: 2 }
      dataManager.addItemToShopInListId(
        shopToAddItem,
        props.route.params.list.id,
        {
          id: 12312,
          name: addItemName,
          measure: addItemUnit,
          checked: false,
          quantity: addItemQuantity,
        },
      );
    }
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
                addItem={openAddItemModal}
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
        <MonkeyModal
          visible={addItemModalVisible}
          hideModal={hideAddItemModal}
          modalContentStyle={styles.modalContentStyle}
          modalContainerStyle={styles.modalContainer}
          title={`Add item to ${shopToAddItem}`}
          leftSideHeaderItems={
            <Button style={styles.addPhotoButton}>
              <Icon source="camera" size={17}></Icon>
            </Button>
          }
        >
          <View>
            <View
              style={{
                width: "40%",
                alignContent: "space-between",
                display: "flex",
                flexDirection: "column",
              }}
            ></View>
            <TextInput
              label="Item name"
              style={styles.shopNameInput}
              onChangeText={setAddItemName}
              error={itemNameError && "red"}
            />
          </View>
          <View style={styles.horizontalContainer} marginTop={15}>
            <TextInput
              label="Quantity"
              style={styles.thirdInput}
              onChangeText={setAddItemQuantity}
              error={quantityError && "red"}
              defaultValue={addItemQuantity.toString()}
            />
            <TextInput
              label="Price"
              style={styles.thirdInput}
              onChangeText={setAddItemPrice}
              error={priceError && "red"}
            />
            <TextInput
              label="Unit"
              style={styles.thirdInput}
              onChangeText={setAddItemUnit}
              value={addItemUnit}
              error={unitError && "red"}
            />
          </View>
          <View style={styles.horizontalContainer} marginTop={15}>
            <Text style={styles.buttonTitleStyle} variant="bodyMedium">
              {" "}
              Choose unit
            </Text>
          </View>

          <View style={styles.horizontalContainer}>
            {units.map((item) => (
              <Button
                style={styles.unitButton}
                labelStyle={styles.unitButtonLabel}
                onPress={() => setAddItemUnit(item)}
                key={`button/${item}`}
              >
                {item}
              </Button>
            ))}
          </View>
          <Button
            style={styles.button}
            onPress={addItem}
            labelStyle={styles.buttonTitleStyle}
          >
            Done
          </Button>
        </MonkeyModal>
      </View>
    </>
  );
};

export default ShoppingList;
