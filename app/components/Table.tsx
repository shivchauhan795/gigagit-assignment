"use client"
import React, { useState } from 'react';
import { Pagination, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { set } from 'zod/v4';

interface Column {
    id: string;
    label: string;
    minWidth: number;
    align: 'left' | 'center' | 'right';
}

interface Row {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}
type props = {
    rowData: Row[],
    setnewUserDialogOpen: any,
    setUser: any,
    setIsEditing: any
}

const TableComponent: React.FC<props> = ({ rowData, setnewUserDialogOpen, setUser, setIsEditing }) => {
    const columns: Column[] = [
        { id: 'id', label: 'Id', minWidth: 170, align: 'left' },
        { id: 'first_name', label: 'First Name', minWidth: 100, align: 'center' },
        { id: 'last_name', label: 'Last Name', minWidth: 100, align: 'center' },
        { id: 'email', label: 'Email', minWidth: 100, align: 'center' },
        { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
    ];

    const rows: Row[] = rowData;

    const [rowCountPerPage, setRowCountPerPage] = useState(5);
    let pageNumbers = [];
    const totalPages = Math.ceil(rows.length / rowCountPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        const pageNo = Number(page);
        if (page >= 1 && pageNo <= totalPages) {
            setCurrentPage(page);
        }
    }
    const paginatedRows = rows.slice(
        (currentPage - 1) * rowCountPerPage,
        currentPage * rowCountPerPage,
    );

    return (
        // <div className='flex justify-center w-full'>
        <>
            <TableContainer sx={{ maxHeight: '90%', width: '100%', border: '1px solid black', justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Table sx={{ width: '50%' }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row) => (
                            <TableRow hover key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id as keyof Row];
                                    return (
                                        <TableCell className={`${column.id === 'actions' && 'cursor-pointer'}`} onClick={() => {
                                            column.id === 'actions' &&
                                                setnewUserDialogOpen(true)
                                                setUser(row)
                                                setIsEditing(true)

                                        }} key={column.id} align={column.align}>
                                            {value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Table sx={{ width: '50%' }}>


                    <TableFooter >
                        <TableRow>

                            <TableCell sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                Row Per Page
                                <select value={rowCountPerPage} onChange={(e) => setRowCountPerPage(Number(e.target.value))}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>

                                <Pagination count={totalPages} page={currentPage} color="primary" onChange={(e, page) => handlePageChange(page)} />
                            </TableCell>
                        </TableRow>

                    </TableFooter>

                </Table>
            </TableContainer>
        </>
        // </div>
    );
};

export default TableComponent;
