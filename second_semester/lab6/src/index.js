import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import buildings from './data.js';
import { Table } from './Table.js';
const root = ReactDOM.createRoot(document.getElementById('root'));

function Content() {
  return (
    <>
      <h3>Самые высокие здания и сооружения</h3>
      <Table data={buildings} amountRows="10" />
    </>
  )
}




root.render(<Content />)
