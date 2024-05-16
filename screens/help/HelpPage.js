import { Card, Text, useTheme } from "react-native-paper";
import Header from "../../components/Header";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

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
  const theme = useTheme();
  const Stack = createStackNavigator();
  const style = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.tertiary,
    },
  });
  return (
    <Stack.Navigator
      initialRouteName={"Help"}
      screenOptions={{
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <Stack.Screen
        name={"Help"}
        component={HelpPageContent}
        style={style.card}
      />
    </Stack.Navigator>
  );
};

export default HelpPage;
