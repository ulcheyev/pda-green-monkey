import { StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import CheckmarkSpinner from "../../components/CheckmarkSpinner";
import { useEffect, useState } from "react";
import useDataManager from "../../services/DataManager";

const Login = (props) => {
  const theme = useTheme();
  const dataManager = useDataManager();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [serverError, setServerError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showErrormark, setShowErrormark] = useState(false);

  const styles = StyleSheet.create({
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 25,
      margin: 20,
      marginTop: 50,
    },
    inputsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      textAlign: "center",
    },
    additionalText: {
      textAlign: "center",
    },
    button: {
      height: 45,
      display: "flex",
      justifyContent: "center",
      marginBottom: 10,
    },
    additionalTextReference: {
      color: theme.colors.primary,
      fontSize: 15.5,
    },
    spinnerContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      justifyContent: "center",
      alignItems: "center",
    },
    serverError: {
      color: "red",
      textAlign: "center",
    },
  });

  const handleEmailChange = (val) => {
    setEmailError("");
    setEmail(val);
  };

  const handlePasswordChange = (val) => {
    setPasswordError("");
    setPassword(val);
  };

  const clearValues = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setServerError("");
  };

  const validateEmail = (val) => {
    if (!val) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      return "Invalid email format";
    }
    return "";
  };

  const validatePassword = (val) => {
    if (!val) {
      return "Password is required";
    }
    return "";
  };

  const handleLogin = () => {
    setServerError("");

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }

    setLoading(true);
    dataManager
      .login({ email: email, password: password })
      .then((userCredential) => {
        const user = userCredential.user;
        setShowCheckmark(true);
        setTimeout(() => {
          setLoading(false);
          setShowCheckmark(false);
          props.navigation.navigate("Lists");
        }, 1500);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setShowErrormark(true);
        setTimeout(() => {
          setLoading(false);
          setShowErrormark(false);
        }, 1000);
        setServerError(errorMessage);
      })
      .finally(() => {
        clearValues();
      });
  };

  const handleDoNotHaveAccount = () => {
    props.navigation.navigate("Register");
  };

  useEffect(() => {
    clearValues();
    clearErrors();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title} variant="displaySmall">
        Sign in your account
      </Text>
      {serverError && (
        <Text style={styles.serverError} variant="bodyMedium">
          {serverError}
        </Text>
      )}
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <HelperText type="error" visible={emailError}>
            {emailError}
          </HelperText>
          <TextInput
            error={emailError}
            label="Email"
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <HelperText type="error" visible={passwordError}>
            {passwordError}
          </HelperText>
          <TextInput
            secureTextEntry={true}
            error={passwordError}
            label="Password"
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="contained" onPress={handleLogin}>
          Sign in
        </Button>
        <Text style={styles.additionalText} variant="bodyMedium">
          Do not have an account?{" "}
          <Text
            onPress={handleDoNotHaveAccount}
            style={styles.additionalTextReference}
          >
            SIGN UP
          </Text>
        </Text>
      </View>
      {loading && (
        <View style={styles.spinnerContainer}>
          <CheckmarkSpinner
            loading={loading}
            showErrormark={showErrormark}
            showCheckmark={showCheckmark}
            size={50}
            color="#007bff"
          />
        </View>
      )}
    </View>
  );
};

export default Login;
