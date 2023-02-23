import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./layouts/login";
import ProtectedRoute from "./components/common/protectedRoute";
import Home from "./layouts/Home";
import LogOut from "./layouts/logOut";
import Main from "./layouts/Main";
import Info from "./layouts/Info";
import UserPage from "./components/page/users/userPage";
import EditUserPage from "./components/page/users/editUserPage";
import Users from "./components/page/users/users";
import Error from "./layouts/Error";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./store/users";

function App() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="error" element={<ProtectedRoute><Error /></ProtectedRoute>}
        />
        <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>}>
          <Route index element={<ProtectedRoute><Info /></ProtectedRoute>}/>
          <Route path="users/*" element={<ProtectedRoute><Users /></ProtectedRoute> }>
            <Route path=":userId"element={<ProtectedRoute><UserPage /></ProtectedRoute>}>
              <Route index path={":edit"} element={<ProtectedRoute><EditUserPage /></ProtectedRoute>}/>
            </Route>
          </Route>
          <Route path="main/*" element={<ProtectedRoute><Main /></ProtectedRoute>}
          />
          <Route path="logout" element={<ProtectedRoute><LogOut /></ProtectedRoute>}
          />
        </Route>
        <Route
          path="*" element={!isLoggedIn ? <Navigate to="/" /> : <Navigate to="/error" />}/>
      </Routes>
    </>
  );
}

export default App;
