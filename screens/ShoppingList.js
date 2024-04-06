import { PaperProvider } from "react-native-paper";
import ListCard from "../components/ListCard";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import DataManager from "../services/DataManager";

const ShoppingList = () => {
  const dataManager = new DataManager();
  const [lists, setLists] = useState(dataManager.getTestData); //todo make this dynamic

  return (
    <View>
      <ScrollView>
        {lists.map((list) => (
          <ListCard key={list.id} title={list.name}></ListCard>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShoppingList;
