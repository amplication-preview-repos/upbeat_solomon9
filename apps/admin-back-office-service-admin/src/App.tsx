import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { TopUpCardRequestList } from "./topUpCardRequest/TopUpCardRequestList";
import { TopUpCardRequestCreate } from "./topUpCardRequest/TopUpCardRequestCreate";
import { TopUpCardRequestEdit } from "./topUpCardRequest/TopUpCardRequestEdit";
import { TopUpCardRequestShow } from "./topUpCardRequest/TopUpCardRequestShow";
import { CardIssueRequestList } from "./cardIssueRequest/CardIssueRequestList";
import { CardIssueRequestCreate } from "./cardIssueRequest/CardIssueRequestCreate";
import { CardIssueRequestEdit } from "./cardIssueRequest/CardIssueRequestEdit";
import { CardIssueRequestShow } from "./cardIssueRequest/CardIssueRequestShow";
import { jwtAuthProvider } from "./auth-provider/ra-auth-jwt";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"AdminBackOfficeService"}
        dataProvider={dataProvider}
        authProvider={jwtAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="TopUpCardRequest"
          list={TopUpCardRequestList}
          edit={TopUpCardRequestEdit}
          create={TopUpCardRequestCreate}
          show={TopUpCardRequestShow}
        />
        <Resource
          name="CardIssueRequest"
          list={CardIssueRequestList}
          edit={CardIssueRequestEdit}
          create={CardIssueRequestCreate}
          show={CardIssueRequestShow}
        />
      </Admin>
    </div>
  );
};

export default App;
