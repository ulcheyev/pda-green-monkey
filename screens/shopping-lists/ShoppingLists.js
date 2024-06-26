import { Button, FAB, Text, TextInput, useTheme } from "react-native-paper";
import ListCard from "../../components/ListCard";
import * as React from "react";
import { useState, useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import useDataManager from "../../services/DataManager";
import MonkeyModal from "../../components/MonkeyModal";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";
import ShoppingList from "./ShoppingList";
import useUtils from "../../utils/Utils";
import Register from "../user-related/Register";
import Login from "../user-related/Login";
import UserInfo from "../user-related/UserInfo";
import CheckmarkSpinner from "../../components/CheckmarkSpinner";
import { useChanges } from "../../services/ChangesProvider";
import { useFocusEffect } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSettings } from "../../services/SettingsContext";
import * as Notifications from "expo-notifications";

const ShoppingListsContent = (props) => {
  const [addListModalVisible, setAddListModalVisible] = useState(false);

  const [visible, setVisible] = useState(false);
  const [templateVisible, setTemplateVisible] = useState(false);

  const dataManager = useDataManager();
  const changesProvider = useChanges();
  const { settings } = useSettings();
  const utils = useUtils();
  const [lists, setLists] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isTemplateError, setIsTemplateError] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [creationListName, setCreationListName] = React.useState("");
  const [templateListName, setTemplateListName] = React.useState("");

  const [loading, setLoading] = useState(false);
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

    emptyListContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
    templateButtonTitleStyle: {
      color: "#565555",
    },
    rowBack: {
      alignItems: "center",
      backgroundColor: "red",
      margin: 7,
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingLeft: 15,
      borderRadius: 7,
    },
    backRightBtn: {
      alignItems: "center",
      bottom: 0,
      justifyContent: "flex-end",
      top: 0,
      width: 75,
      borderBottomRightRadius: 7,
      borderTopRightRadius: 7,
    },
    backRightBtnRight: {
      backgroundColor: "red",
      flex: 1,
      height: "100%",
      flexDirection: "column",
      justifyContent: "center",
      right: 0,
    },
    backTextWhite: {
      color: "#FFF",
    },
  });

  const fabOnPress = () => {
    setAddListModalVisible(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    utils.checkAuth().then((user) => {
      if (user) {
        dataManager.getAllLists().then((res) => {
          setLists(res);
          setRefreshing(false);
        });
      } else {
        dataManager.getListsLocal().then((r) => setLists(r));
        setRefreshing(false);
      }
    });
  };

  async function registerForPushNotificationsAsync() {
    console.log("Asking for permission");
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      return;
    }
  }

  async function scheduleNotification() {
    const notificaionTitle = "Hello please return to our application",
      notificationBody =
        "My developer  is starving, i need to generate money for him";

    await Notifications.scheduleNotificationAsync({
      content: {
        title: notificaionTitle,
        body: notificationBody,
      },
      trigger: {
        seconds: 3600, // 5 minutes in seconds
      },
    }).then(
      dataManager.saveNotificationLocal(notificaionTitle, notificationBody),
    );
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
    scheduleNotification();
  }, []);

  const hideAddItemModal = () => {
    setAddListModalVisible(false);
    setCreationListName("");
    setIsError(false);
  };
  const hideTemplateModal = () => {
    setTemplateVisible(false);
    setTemplateListName("");
    setIsTempateError(false);
  };

  const saveTemplate = () => {
    if (!templateListName) {
      setIsTemplateError(true);
      return;
    }
  };

  const createList = () => {
    if (!creationListName) {
      setIsError(true);
      return;
    }

    utils.checkAuth().then((user) => {
      if (user) {
        const newList = {
          name: creationListName,
          isTemplate: false,
          progress: 0,
          shops: [],
          uid: dataManager.getCurrentUser().uid,
        };
        dataManager
          .saveList(newList)
          .then((r) => {
            newList.id = r;
            setLists([...lists, newList]);
          })
          .finally(() => {
            setVisible(false);
            setCreationListName("");
            setIsError(false);
          });
      } else {
        console.log("Creating list");
        dataManager
          .saveListLocal(creationListName)
          .then(() => handleRefresh())
          //.then(() => dataManager.saveShopLocal("shop1", 1))
          .finally(() => {
            setVisible(false);
            setCreationListName("");
            setIsError(false);
          });

        //dataManager.saveShopLocal("gorillaz", 1);
      }
    });
    setAddListModalVisible(false);
  };

  const onChangeCreationListName = (text) => setCreationListName(text);
  const onChangeTemplateListName = (text) => setTemplateListName(text);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      utils.checkAuth().then((user) => {
        if (user) {
          dataManager.getAllLists().then((res) => {
            setLists(res);
            setLoading(false);
          });
        } else {
          dataManager
            .getListsLocal()
            .then((r) => {
              console.log("Got result");
              setLists(r);
            })
            .catch((e) => console.error(e));

          setLoading(false);
          console.log("User is not authenticated");
        }
      }, []);
    }, []),
  );

  const handleDelete = (item) => {
    dataManager.deleteList(item).then((r) => handleRefresh());
  };

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleDelete(data.item)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return loading ? (
    <CheckmarkSpinner loading={loading} />
  ) : (
    <View style={styles.listsContainer}>
      {lists && lists.length > 0 ? (
        <SwipeListView
          data={lists}
          disableRightSwipe={true}
          disableLeftSwipe={!settings?.swipeToDelete}
          renderItem={(lizt) => (
            <ListCard
              handleRefresh={handleRefresh}
              list={lizt.item}
              progress={{
                value: utils.getListItemsCheckedSize(lizt.item.shops),
                overall: utils.getListItemsSize(lizt.item),
              }}
              navigation={props.navigation}
            />
          )}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          alwaysBounceVertical={false}
        />
      ) : (
        <View style={styles.emptyListContainer}>
          <Text variant={"bodyLarge"}>Try to create a list :)</Text>
        </View>
      )}
      <FAB
        icon="pencil"
        color={theme.colors.tertiary}
        style={styles.fab}
        onPress={fabOnPress}
      />
      <MonkeyModal
        visible={addListModalVisible}
        hideModal={hideAddItemModal}
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
      <MonkeyModal
        visible={templateVisible}
        hideModal={hideTemplateModal}
        modalContentStyle={styles.modalContentStyle}
        modalContainerStyle={styles.modalContainer}
        title={"Add modal"}
      >
        <View>
          <TextInput
            label="Template name"
            value={templateListName}
            onChangeText={onChangeTemplateListName}
            style={styles.listNameInput}
            error={isTemplateError && "red"}
          />
        </View>
        <Button
          style={styles.button}
          onPress={saveTemplate}
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
      <Stack.Screen name={"Register"} component={Register} />
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"UserInfo"} component={UserInfo} />
    </Stack.Navigator>
  );
};

export default ShoppingLists;
