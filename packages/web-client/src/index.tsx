import * as React from 'react';
import {render} from 'react-dom';
import './index.css';
import {Shell} from "./shell/components/Shell";

render(
  <React.StrictMode>
    <Shell />
  </React.StrictMode>,
  document.getElementById('root')
);
