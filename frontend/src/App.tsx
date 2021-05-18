import Page from "./components/Page";
import ApiProvider from "./providers/Api";
import Currency from "./views/Currency";

function App() {
  return (
    <ApiProvider>
      <Page>
        <Currency />
      </Page>
    </ApiProvider>
  );
}

export default App;
