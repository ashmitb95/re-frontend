import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Users from "./routes/users";
import { useState, useEffect } from "react";
import Products from "./routes/products";

export default function App() {
  const [currentUser, setCurrentUser] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/products/:userID"
          element={<Products currentUser={currentUser} />}
        />
        <Route
          path="/"
          element={<Users setCurrentUser={setCurrentUser} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
