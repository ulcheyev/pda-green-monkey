import { StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import useDataManager from "../../services/DataManager";
import { useEffect, useState } from "react";
import CheckmarkSpinner from "../../components/CheckmarkSpinner";

const Register = (props) => {
  const theme = useTheme();
  const dataManager = useDataManager();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [serverError, setServerError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  const validateUsername = (value) => {
    if (!value) {
      return "Username is required";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email format";
    }
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "Please confirm password";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleRegister = () => {
    setServerError("");

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword,
    );

    if (usernameError || emailError || passwordError || confirmPasswordError) {
      setUsernameError(usernameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      setConfirmPasswordError(confirmPasswordError);
      return;
    }

    setLoading(true);

    dataManager
      .register({ email: email, password: password })
      .then((userCredential) => {
        const user = userCredential.user;
        dataManager.updateProfile(user, { displayName: username }).then(() => {
          setShowCheckmark(true);
          setTimeout(() => {
            setLoading(false);
            setShowCheckmark(false);
            props.navigation.pop();
            props.navigation.navigate("Lists");
          }, 1500);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setShowErrormark(true);
        setTimeout(() => {
          setLoading(false);
          setShowCheckmark(false);
        }, 1000);
        setServerError(errorMessage);
      })
      .finally(() => {
        clearValues();
      });
  };

  const clearValues = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setServerError("");
  };

  const handleChangeUsername = (val) => {
    setUsernameError("");
    setUsername(val);
  };

  const handleChangeEmail = (val) => {
    setEmailError("");
    setEmail(val);
  };

  const handleChangePassword = (val) => {
    setPasswordError("");
    setPassword(val);
  };

  const handleChangeConfirmPassword = (val) => {
    setConfirmPasswordError("");
    setConfirmPassword(val);
  };

  const handleHaveAccount = () => {
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    clearValues();
    clearErrors();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title} variant="displaySmall">
        Create your account
      </Text>
      {serverError && (
        <Text style={styles.serverError} variant="bodyMedium">
          {serverError}
        </Text>
      )}
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <HelperText type="error" visible={usernameError}>
            {usernameError}
          </HelperText>
          <TextInput
            error={usernameError}
            label="Username"
            value={username}
            onChangeText={handleChangeUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <HelperText type="error" visible={emailError}>
            {emailError}
          </HelperText>
          <TextInput
            error={emailError}
            label="Email"
            value={email}
            onChangeText={handleChangeEmail}
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
            onChangeText={handleChangePassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <HelperText type="error" visible={confirmPasswordError}>
            {confirmPasswordError}
          </HelperText>
          <TextInput
            error={confirmPasswordError}
            secureTextEntry={true}
            label="Confirm password"
            value={confirmPassword}
            onChangeText={handleChangeConfirmPassword}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="contained" onPress={handleRegister}>
          Register
        </Button>
        <Text style={styles.additionalText} variant="bodyMedium">
          Have an account?{" "}
          <Text
            onPress={handleHaveAccount}
            style={styles.additionalTextReference}
          >
            SIGN IN
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

export default Register;
