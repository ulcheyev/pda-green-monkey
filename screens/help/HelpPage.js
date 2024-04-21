import { Card } from "react-native-paper";
import { Text } from "react-native-paper";
import Header from "../../components/Header";
import { createStackNavigator } from "@react-navigation/stack";

const HelpPageContent = () => {
  return (
    <Card marginHorizontal={10} marginTop={8}>
      <Card.Cover
        source={{
          uri: "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg",
        }}
      />
      <Card.Content>
        <Text variant="bodyMedium">
          {" "}
          Hello! How are you? I am under the water! Please, help me! Here too
          much raining uuuu
        </Text>
      </Card.Content>
    </Card>
  );
};

const HelpPage = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={"Help"}
      screenOptions={{
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <Stack.Screen name={"Help"} component={HelpPageContent} />
    </Stack.Navigator>
  );
};

export default HelpPage;
