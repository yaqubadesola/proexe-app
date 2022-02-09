import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MyHeader from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/userActions';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const Home = () => {
    const classes = useStyles();
    const buttonClasses = useButtonStyles()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const users = useSelector(state => state.users.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const handleUserDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
            dispatch(deleteUser(id))
        }

    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container>
                <MyHeader />
            </Container>
            <CssBaseline />
            <Container>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Username</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">City</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((user) => (
                                <StyledTableRow key={user.id}>
                                    <StyledTableCell component="th" scope="user">
                                        {user.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{user.name}</StyledTableCell>
                                    <StyledTableCell align="right">{user.username}</StyledTableCell>
                                    <StyledTableCell align="right">{user.email}</StyledTableCell>
                                    <StyledTableCell align="right">{user.address.city}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <div className={buttonClasses.root}>
                                            <ButtonGroup variant="contained" aria-label="contained primary button group">
                                                <Button onClick={() => navigate(`edituser/${user.id}`)}
                                                    style={{ margin: "2px" }}
                                                    color="primary">Edit</Button>
                                                <Button
                                                    onClick={() => handleUserDelete(user.id, user.name)}
                                                    style={{ margin: "2px" }}
                                                    color="secondary"
                                                >Delete</Button>
                                            </ButtonGroup>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>

    );

}

export default Home