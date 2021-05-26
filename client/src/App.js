import './App.css';
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import {LineDataTable} from './dataTable/LineDataTable'
import dataProvider from './dataProvider/dataprovider'
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';


const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru', {allowMissing: "true", onMissingKey: (key, _, __) => key });

function App() {
  return (
      <Admin
          title="система"
          dataProvider={dataProvider}
          i18nProvider={i18nProvider}
          // layout={Layout}
      >
          <Resource
              name="lines"
              list={LineDataTable}
              options={{ label: 'Список ', icon: <ListAltRoundedIcon />}}
          />

      </Admin>
  );
}

export default App;
