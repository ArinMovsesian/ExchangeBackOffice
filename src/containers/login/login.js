/* #region imports */

/* #region import react main dipendencies */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
/* #endregion */

/* #region import redux dependenies */
import { connect } from "react-redux";
import { setToken } from '../../store/actions';
/* #endregion */

/* #region import other services */
import toastr from 'toastr';
//import ReCAPTCHA from "react-google-recaptcha";
import AuthenticationService from './loginService';
/* #endregion */

/* #region import material-ui components */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FaIcon from '../../shared/components/Icon/Icon';
import CachedIcon from '@material-ui/icons/Cached';

/* #endregion */

/* #region import constants */
import errors from 'constants/errors'
import clientSettings from 'constants/loginSetting'
import Loading from '../../core/Loading';
/* #endregion */

/* #region import theme */
import styles from './loginTheme';
import "./login.css";
import Grid from '@material-ui/core/Grid';
import GetCaptchaService from '../../services/getCaptcha';
/* #endregion */

/* #endregion */
/* #region Component Body */
class Loginpage extends Component {

/* #region lifeCycle Methods */

    /*<-------------------constructor------------->*/
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            redirect: false,
            isLoading: false
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
        this.successLogin = this.successLogin.bind(this);
    }

    /*<-------------------componentDidMount------------->*/

    componentDidMount() {
        var auth = JSON.parse(localStorage.getItem("authentication"));
        if (auth && auth != '')
            this.setState({ redirect: true });

            this.getCaptcha();
    }

    /*<-------------------render------------->*/
    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
            return <Redirect to='/main' />;
        }
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            return (
                <div className="loginTheme">
                    <main className={classes.main}>
                        <CssBaseline />
                        <Grid container spacing={8} className="justify-content-center" style={{ marginLeft: "2% !important" }} >
                            {/* <Grid item md={9}>
                                <Grid container spacing={8}  >
                                    <Grid item md={3}>
                                        <b>111</b>
                                    </Grid>
                                    <Grid item md={9}>
                                        <Paper className={classes.paper}>
                                            <h3>
                                                <FaIcon color="gray" name="fa fa-trash" size={20} />
                                                <span style={{ marginRight: '5px' }}>جستجوی پیشرفته</span> */}
                            {/*<b>*/}
                            {/*حذف {this.props.deleteHeader}*/}
                            {/*</b>*/}
                            {/* </h3>
                                            <hr />
                                        </Paper>

                                    </Grid>
                                </Grid>
                            </Grid> */}
                            <Grid item md={3}>
                                <Paper className={classes.paper}>
                                    {/* <Avatar className={classes.avatar}>
                                        <LockIcon />

                                    </Avatar> */}
                                    <div class="icon-object border-slate-300 text-slate-300">
                                        <img src={require('utils/images/logo.png')} style={{maxHeight: "75px" , maxWidth: "75px"}} />


                                    </div>
                                    <Typography className={classes.rtl} component="h1" variant="h5">
                                      سامانه جامع مدیریت کارگزاری

                                 </Typography>

                                    {/* <img
                         
                            alt="user photo"
                            src={require('utils/images/Logo.png')}
                        /> */}
                                    <form className={classes.form}>
                                        <div>
                                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                                <InputLabel
                                                    ref={ref => {
                                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                                    }}
                                                    className={classes.inputLabelOutLine}

                                                    htmlFor="userName"
                                                >
                                                    نام کاربری
                                          </InputLabel>
                                                <OutlinedInput
                                                    id="userName"
                                                    className={classes.OutlineInput}
                                                    value={this.state.userName}
                                                    onChange={this.handleUserNameChange}
                                                    onKeyPress={this.login}
                                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                                />
                                            </FormControl>

                                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                                <InputLabel
                                                    ref={ref => {
                                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                                    }}
                                                    className={classes.inputLabelOutLine}
                                                    type="password"
                                                    htmlFor="userName"
                                                >
                                                    رمز عبور
                                         </InputLabel>
                                                <OutlinedInput
                                                    id="password"
                                                    className={classes.OutlineInput}
                                                    value={this.state.password}
                                                    onChange={this.handlePasswordChange}
                                                    onKeyPress={this.login}
                                                    label="Password"
                                                    type="password"
                                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                                />
                                            </FormControl>

                                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                                <InputLabel
                                                    ref={ref => {
                                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                                    }}
                                                    className={classes.inputLabelOutLine}
                                                    type="text"
                                                    htmlFor="captcha"
                                                >
                                                    کد امنیتی
                                                </InputLabel>
                                                <OutlinedInput
                                                    id="captcha"

                                                    dir='ltr'
                                                    style={{ direction: 'ltr' }}
                                                    value={this.state.captcha}
                                                    onChange={this.handleCaptchaChange}
                                                    onKeyPress={this.login}
                                                    label="captcha"
                                                    type="text"
                                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                                    startAdornment={
                                                        <React.Fragment>
                                                            <img src={`data:image/png;base64, ${this.state.captchaImage}`} className={'img-captcha'} />
                                                            <CachedIcon onClick={this.RefreshCaptcha} className="check-icon" />
                                                        </React.Fragment>
                                                    }
                                                />
                                                {/* <img src={'https://picsum.photos/200/300.jpg'} className={'sa-mask-captcha'}/> */}
                                            </FormControl>


                                            {/* <FormControl className={classes.formControl} variant="outlined" fullWidth>
        <InputLabel
            ref={ref => {
                this.labelRef = ReactDOM.findDOMNode(ref);
            }}
            className={classes.inputLabelOutLine}
            type="text"
            htmlFor="captcha"
        >
            کد امنیتی
             </InputLabel>
        <OutlinedInput
            id="captcha"
            className={classes.OutlineInput+" sa-mask-captcha"}
            dir='ltr'
            style={{direction:'ltr'}}
            value={this.state.password}
            onChange={this.handlePasswordChange}
            onKeyPress={this.login}
            label="captcha"
            type="text"
            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
        />
        <img src={'utils/images/Logo.png'} className={'sa-mask-captcha'}/>
    </FormControl> */}
                                            <span href="">فراموشی رمز عبور</span>
                                            <Button
                                                type="button"
                                                fullWidth
                                                onClick={() => this.login({ which: 1 })}
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}>
                                                کاربران  ورود
                                </Button>
                                        </div>
                                    </form>
                                </Paper>

                            </Grid>
                        </Grid>

                    </main>
                </div>
            );
        }
    }
    /* #endregion */
    /* #region EventHandler Methods */
    handleUserNameChange(event) {
        this.setState({ userName: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    /* #endregion */
    /*captcha */
    RefreshCaptcha = () => {
        this.getCaptcha();
    }
    handleCaptchaChange = (event) => {
        this.setState({ captcha: event.target.value });
    }
    getCaptcha = () => {
        GetCaptchaService((res) => {
            this.setState({
                captchaImage: res.data.image
            })
        })
    }
    /* #region Login Event Handler */
    login(event) {

        if (event.which === 1 || event.which === 13) {

            localStorage.removeItem("authentication");
            if (this.state.userName === '' || this.state.password === '') {
                toastr.error(errors.userPassEmpty);
                return;
            }
            this.setState({
                isLoading: true
            });
            let command = {
                Entity: {
                    UserName: this.state.userName.toString(),
                    Password: this.state.password.toString(),
                    ClientId: clientSettings.clientId,
                }
            };
            AuthenticationService.login(command, this.successLogin);
        }

    };

    successLogin = (response) => {
        if (response.success) {
            localStorage.setItem("authentication", JSON.stringify(response.result.accessToken));
            this.props.setToken(response.result.accessToken);
            this.setState({
                redirect: true
            });
            return <Redirect to='/main' />;
        }

        this.setState({
            isLoading: false
        })
    };
    /* #endregion */
}
/* #endregion */
/* #region redux methods */
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setToken: data => dispatch(setToken(data))
    };
};
/* #endregion */
/* #region connect & config pages */
const Login = connect(mapStateToProps, mapDispatchToProps)(Loginpage);
export default withStyles(styles)(Login);
/* #endregion */
