import { View, Text } from "react-native";
import Header from "../../components/Header";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme, Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { Button } from "react-native-paper";
import { useState, useCallback, useEffect } from "react";
import { DatePickerModal } from "react-native-paper-dates";
import useDataManager from "../../services/DataManager";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const StatisticsContent = (props) => {
  const theme = useTheme();
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);
  const [shopsDivided, setShopsDivided] = useState([]);
  const dataManager = useDataManager();

  const data = {
    items: [
      { price: 902, date: "01-02-2023", shop: "Tesco" },
      { price: 907, date: "22-02-2023", shop: "Lidl" },
      { price: 939, date: "25-02-2023", shop: "Kaufland" },
      { price: 997, date: "12-02-2023", shop: "Vecerka" },
      { price: 1019, date: "13-02-2023", shop: "Kaufland" },
      { price: 1079, date: "27-02-2023", shop: "Vecerka" },
      { price: 1249, date: "17-02-2023", shop: "Vecerka" },
      { price: 1357, date: "12-02-2023", shop: "Tesco" },
      { price: 1103, date: "24-02-2023", shop: "Albert" },
      { price: 1481, date: "27-02-2023", shop: "Kaufland" },
      { price: 724, date: "22-02-2023", shop: "Albert" },
      { price: 500, date: "19-02-2023", shop: "Lidl" },
      { price: 697, date: "23-02-2023", shop: "Lidl" },
      { price: 1296, date: "05-02-2023", shop: "Vecerka" },
      { price: 575, date: "26-02-2023", shop: "Kaufland" },
      { price: 1202, date: "19-02-2023", shop: "Tesco" },
      { price: 624, date: "22-02-2023", shop: "Kaufland" },
      { price: 875, date: "25-02-2023", shop: "Tesco" },
      { price: 1483, date: "24-02-2023", shop: "Tesco" },
      { price: 1402, date: "19-02-2023", shop: "Globus" },
    ],
  };

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const formatDate = (date) => {
    // Get month, day, and year
    var month = date.getMonth() + 1; // Months are zero based
    var day = date.getDate();
    var year = date.getFullYear();

    // Add leading zeros if necessary
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // Return formatted date
    return month + "-" + day + "-" + year;
  };

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
      let startDateText, endDateText;
      if (!startDate) {
        startDateText = "01-01-2024";
      }
      if (!endDate) {
        endDateText = "12-31-2024";
      } else {
        startDateText = formatDate(startDate);
        endDateText = formatDate(startDate);
      }
      console.log(startDate);
      console.log(endDate);
      getShopHist(startDateText, endDateText);
    },
    [setOpen, setRange],
  );

  const getShopHist = (dateFrom, dateTo) => {
    console.log("getitgn");
    dataManager.getPurchasesGroupedByShopLocal(dateFrom, dateTo).then((r) => {
      setShopsDivided(r);
      console.log("Shops divided are");
      console.log(shopsDivided);
    });
  };

  useEffect(() => {
    mapp = new Map();
    const ob = [];
    data.items.map((purchase) => {
      if (mapp.has(purchase["shop"])) {
        mapp.set(
          purchase["shop"],
          mapp.get(purchase["shop"]) + purchase["price"],
        );
      } else {
        mapp.set(purchase["shop"], purchase["price"]);
      }
    });
    const arr = [...mapp.keys()];
    arr.map((key) => ob.push({ value: mapp.get(key), label: key }));

    setShopsDivided(ob);
  }, []);

  useEffect(() => {
    getShopHist("01-01-2024", "12-31-2024");
  }, []);

  const style = StyleSheet.create({
    mainFrame: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.colors.tertiary,
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    upperStats: {
      margin: "5%",
    },

    bottomCard: {
      margin: 40,
      marginBottom: 80,
      padding: 10,
      backgroundColor: theme.colors.tertiary,
    },

    rangeButton: {
      backgroundColor: theme.colors.primary,
      margin: 15,
    },
  });

  return (
    <View style={style.mainFrame}>
      <View style={style.upperStats}>
        <LineChart
          data={data.values}
          height={150}
          noOfSections={5}
          label="labell"
        />
      </View>
      <View style={{ width: "100%" }}>
        <Card style={style.bottomCard}>
          <Button
            onPress={() => setOpen(true)}
            style={style.rangeButton}
            textColor={theme.colors.tertiary}
            uppercase={false}
            mode="outlined"
          >
            Pick range
          </Button>
          <DatePickerModal
            locale="en"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onConfirm}
          />
          <BarChart
            showFractionalValue
            showYAxisIndices
            noOfSections={4}
            data={shopsDivided}
          />
        </Card>
      </View>
    </View>
  );
};

const StatisticsPage = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={"Statistics"}
      screenOptions={{
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <Stack.Screen name={"Statistics content"} component={StatisticsContent} />
    </Stack.Navigator>
  );
};

export default StatisticsPage;
