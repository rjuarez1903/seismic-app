import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// mui imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// assets
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CommentIcon from '@mui/icons-material/Comment';
import LinkIcon from '@mui/icons-material/Link';

// third party
import axios from 'axios';

const SeismicDataTable = ({ onCommentClick, title }) => {
    const [page, setPage] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [magTypeFilter, setMagTypeFilter] = useState('');
    const [data, setData] = useState({ rows: [], pagination: { total: 0 } });

    const columns = [
        { id: 'title', label: 'Title', minWidth: 200, align: 'right' },
        { id: 'magnitude', label: 'Magnitude', minWidth: 100, align: 'right' },
        { id: 'place', label: 'Place', minWidth: 170, align: 'right' },
        { id: 'mag_type', label: 'Type', minWidth: 100, align: 'right' },
        {
            id: 'tsunami',
            label: 'Tsunami',
            minWidth: 100,
            align: 'center',
            format: (value) => {
                return value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />;
            }
        },
        {
            id: 'coordinates',
            label: 'Coordinates',
            minWidth: 170,
            align: 'right',
            format: (_, row) => `Lat: ${row.coordinates.latitude}, Lon: ${row.coordinates.longitude}`
        },
        {
            id: 'external_url',
            label: 'External URL',
            minWidth: 130,
            align: 'center',
            format: (value) => (
                <IconButton component="a" href={value} target="_blank" rel="noopener noreferrer">
                    <LinkIcon color='secondary'/>
                </IconButton>
            )
        },
        {
            id: 'external_id',
            label: 'Comment',
            minWidth: 100,
            align: 'center',
            format: (value) => (
                <IconButton onClick={() => onCommentClick(value)}>
                    <CommentIcon />
                </IconButton>
            )
        }
    ];

    const magTypes = ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg'];

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage, magTypeFilter]);

    const fetchData = async () => {

        try {
            let url = `http://localhost:3000/api/features?page=${page + 1}&per_page=${rowsPerPage}`;
            if (magTypeFilter) {
                url += `&mag_type=${magTypeFilter}`;
            }
            const response = await axios.get(url);
            const result = response.data;
            setData({ rows: result.data, pagination: result.pagination });
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to fetch data');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Card sx={{ borderRadius: '0.5rem' }}>
            <CardHeader
                title={
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                }
            />
            <Divider />
            <Box sx={{ p: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="mag-type-select-label">Magnitude Type</InputLabel>
                    <Select
                        labelId="mag-type-select-label"
                        id="mag-type-select"
                        value={magTypeFilter}
                        label="Magnitude Type"
                        onChange={(e) => setMagTypeFilter(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {magTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type.toUpperCase()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.rows.map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id] !== undefined ? row[column.id] : row.links && row.links[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format ? column.format(value, row) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {data.rows.length === 0 ? (
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" align="center">
                        {errorMessage || 'No data matches the selected criteria'}
                    </Typography>
                </Box>
            ) : (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.pagination.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Card>
    );
};

SeismicDataTable.propTypes = {
    title: PropTypes.string,
    onCommentClick: PropTypes.func
};

export default SeismicDataTable;
