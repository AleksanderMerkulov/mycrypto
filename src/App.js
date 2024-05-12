import {Layout} from "antd";
import AppSider from "./components/AppSider";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import {CryptoContextProvider} from "./context/cryptoContext";

function App() {
  return (
      <CryptoContextProvider>

        <Layout>
          <AppSider/>
          <Layout>
            <AppHeader/>
            <AppContent/>
          </Layout>
        </Layout>
      </CryptoContextProvider>
  );
}

export default App;
