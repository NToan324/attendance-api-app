import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import Form from "./views/form";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </Router>
  );
}

export default App;
