import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

export default function Registration({ setIsAuthenticated }) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="50vh">
        <Formik
          initialValues={{
            name: "",
            post: "",
            login: "",
            password: "",
          }}
          onSubmit={(values) => {
            fetch("http://localhost:8000/auth/singin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values, null, 2),
            }).then(
              fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values, null, 2),
              })
                .then(function (response) {
                  return response.json();
                })
                .then(function (response) {
                  if (response.status == "success") {
                    setIsAuthenticated(true);
                    cookies.set("name", response.data.name);
                    cookies.set("user_id", response.data.id);
                    cookies.set("role", response.data.role);
                    navigate("/organization_add");
                  }
                  if (response.status == "error") {
                    alert(response.data);
                    console.log(response.data);
                  }
                })
                .catch(function (error) {
                  alert(error);
                  console.log(error);
                })
            );
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="name">Имя</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="post">Должность</FormLabel>
                  <Field
                    as={Input}
                    id="post"
                    name="post"
                    type="text"
                    variant="filled"
                  />
                </FormControl>

                <FormControl paddingTop={10}>
                  <FormLabel htmlFor="login">Логин</FormLabel>
                  <Field
                    as={Input}
                    id="login"
                    name="login"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Пароль</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={(value) => {
                      let error;

                      if (value.length < 6) {
                        error = "Password must contain at least 6 characters";
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="teal" width="full">
                  Зарегистрироваться
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
