import { TableRow } from './TableRow.js';
export const TableHead = (props) => {
    return (
        <thead>
            <tr>
                <TableRow row={props.head} isHead="1" />
            </tr>
        </thead>
    )
}