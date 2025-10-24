// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Home from "./pages/Home";
// // import Menu from "./pages/Menu";
// // import { LogIn } from "lucide-react";
// import Login from "./pages/Login";
// import Payment from "./pages/Payment";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//           <Route path="/payment" element={<Payment />} /> 
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import{ createRoot} from "react-dom/client"
import { StrictMode } from "react"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import './index.css'
createRoot(document.getElementById('root')).render(

      <BrowserRouter>
        <StrictMode>
          <App />

        </StrictMode>
      </BrowserRouter>
)
