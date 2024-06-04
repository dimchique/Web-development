import { TableRow } from './TableRow.js';
export const TableBody = (props) => {
    const begRange = (props.numPage - 1) * props.amountRows;
    const endRange = begRange + Number(props.amountRows);
    const tbody = props.body.map((item, index) =>
        <tr key={index} className={
            (index >= begRange && index < endRange) ? "show" : "hide"
        }>
            <TableRow row={Object.values(item)} isHead="0" />
        </tr>
    );
    return (
        <tbody>
            {tbody}
        </tbody>
    )
}
