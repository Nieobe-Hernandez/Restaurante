import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Input, Button, Icon, Image } from "@rneui/base";
import Logo from "../../../../../../assets/img/logo.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { isEmpty } from "lodash";
import Loading from "../../../../../kernel/components/Loading";

export default function CreateAccount(props) {
  const auth = getAuth();
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const [showErrorMessage, setShowErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!isEmpty(email) && !isEmpty(password)) {
      setShowErrorMessage("");
      setLoading(true);
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigation.navigate("UserLogged");
      } catch (error) {
        setShowErrorMessage("El correo ya esta registrado");
      } finally {
        setLoading(false);
      }
    } else {
      setShowErrorMessage("Campos obligatorios");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo}
        resizeMode="contain"
        containerStyle={{ marginBottom: 20 }} //Esta linea la añadi yo por que me dio TOC
      />
      <Input
        placeholder="leodorcas12@gmail.com"
        // onChangeText={element => setEmail(element)}
        onChange={({ nativeEvent: { text } }) => setEmail(text)}
        label="Correo electrónico *"
        labelStyle={styles.label}
        containerStyle={styles.input}
        keyboardType="email-address"
        rightIcon={
          <Icon color="#ef524a" type="material-community" name="email" />
        }
        errorMessage={showErrorMessage}
      />
      <Input
        placeholder="*********"
        // onChangeText={element => setPassword(element)}
        onChange={({ nativeEvent: { text } }) => setPassword(text)}
        label="Contraseña *"
        labelStyle={styles.label}
        containerStyle={styles.input}
        secureTextEntry={showPassword}
        rightIcon={
          <Icon
            type={"material-community"}
            name={showPassword ? "eye" : "eye-off"}
            color="#EB5249"
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
        errorMessage={showErrorMessage}
      />
      <Button
				title="Crear cuenta"
				onPress={register}
				containerStyle={styles.btnContainer}
				buttonStyle={styles.btnStyle}
			/>
      <Loading isShow={loading} title={"Creando cuenta"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    color: "#88BF40",
    fontSize: 16,
  },
  btnContainer: {
    width: "80%",
  },
  btnStyle: {
    backgroundColor: "#EB5149",
  },
});