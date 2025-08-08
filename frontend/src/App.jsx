import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import RedirectAuthenticatedUser from "./providers/RedirectAuthenticatedUser";
import LogIn from "./pages/Login";
import RedirectUnauthenticatedUser from "./providers/RedirectUnauthenticatedUser";
import AddBook from "./pages/AddBook";
import Bookpage from "./pages/Bookpage";
import UpdateBook from "./pages/UpdateBook";
import Searchpage from "./pages/Searchpage";
import Footer from "./components/Footer";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";


function App() {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUp />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LogIn />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/add-book"
          element={
            <RedirectUnauthenticatedUser>
              <AddBook />
            </RedirectUnauthenticatedUser>
          }
        />

        <Route path="/book/:id" element={<Bookpage />} />
        <Route
          path="/book/:id/update"
          element={
            <RedirectUnauthenticatedUser>
              <UpdateBook />
            </RedirectUnauthenticatedUser>
          }
        />
        <Route path="/search" element={<Searchpage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;