import React, { Component } from 'react';
import { useTable } from 'react-table';

const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} style={{ border: '1px solid #ddd', padding: '8px' }}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} style={{ border: '1px solid #ddd', padding: '8px' }}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

class MainWindow extends Component {
    render() {
        const { excelEntries = [], csvEntries = [[], [], [], []] } = this.props;

        const columns = [
            {
                Header: 'Last Name',
                accessor: 'lastname'
            },
            {
                Header: 'First Name',
                accessor: 'firstname'
            }
        ];

        return (
            <div style={{ padding: '20px' }}>
                <h2>Main Content</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <h3>Excel Entries</h3>
                        <Table columns={columns} data={excelEntries} />
                    </div>
                    {csvEntries.map((csvData, index) => (
                        <div key={index}>
                            <h3>CSV Field {index + 1}</h3>
                            <Table columns={columns} data={csvData} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default MainWindow;
