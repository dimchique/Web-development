import React from 'react';
import { TableHead } from './TableHead.js';
import { TableBody } from './TableBody.js';

export const Table = (props) => {
    const [activePage, setActivePage] = React.useState("1");
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };
    const n = Math.ceil(props.data.length / props.amountRows);
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    const pages = arr.map((item, index) =>
        <span onClick={changeActive}> {item}</span>
    );


    return (
        <>
            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody body={props.data} amountRows={props.amountRows}
                    numPage={activePage} />
            </table>
            <div>
                {pages}
            </div>
        </>
    )
}