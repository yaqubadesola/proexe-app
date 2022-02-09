import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUser } from '../redux/userActions';
import validator from 'validator'
const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right',
        marginRight: theme.spacing(2),
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
}));

const useHeaderStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        textAlign: "left",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const EditUser = () => {
    const headerclasses = useHeaderStyles()
    const buttonClasses = useButtonStyles()
    let { id } = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const user = useSelector(state => state.users.user)

    const classes = useStyles();
    const [state, setState] = useState({
        name: "", username: "", email: "", city: "", nameErr: "", emailErr: "", usernameErr: "",
        cityErr: "",
    })
    const { name, username, email, city } = state

    const handleInput = (e) => {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    function getSingleUser(id) {
        return dispatch(getUser(id))
    }

    useEffect(() => {
        getSingleUser(id)
    })

    useEffect(() => {
        if (user) {
            console.log("new user", user)
            setState({
                ...user
            });
        }
    }, [user])

    const handleFormSubmit = (e) => {

        e.preventDefault()

        let nameErr = '';
        let emailErr = '';
        let usernameErr = '';
        let cityErr = '';
        let saveFlag = true;
        if (!name) {
            nameErr = 'Enter your name';
        }

        if (!username) {
            usernameErr = 'Enter your username';
        }


        if (!email) {
            emailErr = 'Enter your email';
        } else if (!validator.isEmail(email)) {
            emailErr = 'Enter valid email';
        } else {
            emailErr = ""
        }



        if (!city) {
            cityErr = 'Enter your city';
        }


        if (nameErr || emailErr || usernameErr || cityErr) {
            setState({ ...state, nameErr, emailErr, cityErr, usernameErr });
            return false;
        }
        console.log("State data ", state)

        if (saveFlag) {
            dispatch(editUser(state, id))
            navigate("/")
        }

    }
    return (

        <React.Fragment>
            <CssBaseline />
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={headerclasses.title} variant="h6" noWrap>
                            <h3>EDITING FORM</h3>
                        </Typography>
                        <div className={headerclasses.search}>
                            {/* <div className={classes.searchIcon}> */}

                        </div>
                        <div className={buttonClasses.root}>
                            <Button variant="contained"
                                onClick={() => navigate("/")} ><b>GO TO DASHBOARD</b>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </Container>
            <CssBaseline />
            <Container>
                <div style={{ width: '100%' }}>
                    <form className={classes.root} onSubmit={handleFormSubmit} noValidate autoComplete="on">
                        <TextField
                            id="standard-basic"
                            label="Name"
                            value={name || ""}
                            type="text"
                            name="name"
                            onChange={handleInput}
                        />  <br /> <br />
                        <b style={{ color: 'red' }}>{state.nameErr}</b>
                        <br /> <br />
                        <TextField
                            id="standard-basic"
                            label="Username"
                            value={username || ""}
                            type="text"
                            name="username"
                            onChange={handleInput}
                        />  <br /> <br />
                        <b style={{ color: 'red' }}>{state.usernameErr}</b>
                        <br /> <br />
                        <TextField
                            id="standard-basic"
                            label="Email"
                            value={email || ""}
                            name="email"
                            type="email"
                            onChange={handleInput}
                        />  <br /> <br />
                        <b style={{ color: 'red' }}>{state.emailErr}</b><br />
                        <br />
                        <TextField
                            id="standard-basic"
                            label="City"
                            value={city || ""}
                            name="city"
                            type="text"
                            onChange={handleInput}
                        />
                        <br /> <br />
                        <b style={{ color: 'red' }}>{state.cityErr}</b><br />
                        <Button style={{ width: "200px", textAlign: "center" }} variant="contained" color="primary" type="submit" ><b>UPDATE</b></Button>

                    </form>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default EditUser