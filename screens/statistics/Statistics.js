import { View, Text } from "react-native";
import Header from "../../components/Header";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme, Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";

const StatisticsContent = () => {
  const theme = useTheme();

  const data = {
    values: [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }],
  };

  const style = StyleSheet.create({
    mainFrame: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.colors.tertiary,
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
    },
  });

  return (
    <View style={style.mainFrame}>
      <View>
        <LineChart
          data={data.values}
          height={100}
          width={100}
          stepValue={20}
          maxValue={100}
        />
      </View>
      <View>
        <Card>
          <BarChart data={data.values} />
        </Card>
      </View>
    </View>
  );
};

const StatisticsPage = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={"Help"}
      screenOptions={{
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <Stack.Screen name={"Statistics"} component={StatisticsContent} />
    </Stack.Navigator>
  );
};

export default StatisticsPage;
