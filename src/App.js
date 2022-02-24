import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./modules/Home";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { userContext } from "./context/userContext";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./modules/Login";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
  }, []);

  return (
    <ChakraProvider>
      <Flex
        className="App"
        fontFamily={""}
        w={"100vw"}
        h="100vh"
        justifyContent={"center"}
        alignItems={"center"}
      >
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <userContext.Provider value={{ user, setUser }}>
            <Routes>
              <Route path="/" element={user ? <Home /> : <Login />} />
            </Routes>
          </userContext.Provider>
        )}
      </Flex>
    </ChakraProvider>
  );
}

export default App;
