import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeLayout from "./layout/HomeLayout/HomeLayout";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Homepage from "./pages/Homepage/Homepage";
import LoginLayout from "./layout/LoginLayout/LoginLayout";
import Dashboard from "./pages/AuthenticatedPages/Dashboard/Dashboard";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "./pages/AuthenticatedPages/Home/Home";
import Users from "./pages/AuthenticatedPages/Users/Users";
import Group from "./pages/AuthenticatedPages/Group/Group";
import Folder from "./pages/AuthenticatedPages/Folder/Folder";
import Process from "./pages/AuthenticatedPages/Process/Process";
import GroupFolderProcess from "./pages/AuthenticatedPages/GroupFolderProcess/GroupFolderProcess";
const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <Route
              path="/"
              element={
                <LoginLayout
                  onLogout={handleLogout}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="home" element={<Home />} />
              <Route path="users" element={<Users />} />
              <Route path="group/:groupId" element={<Group />} />
              <Route path="folder/:folderId" element={<Folder />} />
              <Route
                path="group/:groupId/folder/:folderId"
                element={<GroupFolderProcess />}
              />
              <Route path="process/:id" element={<Process />} />

              <Route path="*" element={<Dashboard />} />
            </Route>
          ) : (
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Homepage />} />
              <Route
                path="login"
                element={
                  <Login onLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />
                }
              />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<Homepage />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
