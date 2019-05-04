import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

import { styles } from './styles';
import { loginSuccess, loginRequesting } from "../../../store/actions/auth";

class viewForm extends Component {
    state = {
        step1_value: '',
        step2_value: '',
        step2_other: '',
        steps: 9,
        currentStep: 1,
        order_form: '',
        step4_value: '',
        request_date: '',
        order_date_min: '',
        order_date_max: '',
        valid_date: '',
        step9_value: '',
        requiredError: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.authenticated === -1 && nextProps.error.body !== undefined && this.state.loginFailure) {
            this.setState({
                loginFailure: false
            })
            this.props.enqueueSnackbar(nextProps.error.body, {
                variant: 'error',
            });
            return;
        }
    }
    handleNext = () => {
        const { step1_value, step2_value, step2_other, order_form, request_date, order_date_min, order_date_max, valid_date   } = this.state;

        switch (this.state.currentStep) {
            case 1:
                if ( step1_value === '') {
                    this.setState({
                        requiredError: true
                    });
                    return;
                }
                break;
            case 2:
                if ( step2_value === '' || (step2_value === 'other' && step2_other === '')) {
                    this.setState({
                        requiredError: true
                    });
                    return;
                }
                break;
            case 3:
                if ( order_form === '') {
                    this.setState({
                        requiredError: true
                    });
                    return;
                }
                break;
            case 5:
                if ( request_date === '') {
                    this.setState({
                        requiredError: true
                    });
                    return;
                }
                break;
            case 6:
                if ( order_date_min === '') {
                    this.setState({
                        requiredError: true
                    });
                    return;
                }
                break;
            case 7:
                if ( order_date_max === '') {
                    this.setState({
                        requiredError: true
                    });
                    return;
                }
                break;
            case 8:
                if ( valid_date === '') {
                    this.setState({
                        requiredError: true
                    });
                    return;
                }
                break;
            default:
                break;

        }

        if (this.state.currentStep === 9) {
            return
        }
        this.setState(state => ({
            currentStep: state.currentStep + 1
        }));
    };
    handleBack = () => {
        if (this.state.currentStep === 1) {
            return
        }
        this.setState(state => ({
            currentStep: state.currentStep - 1,
        }));
    };

    handleSubmit = () => {
        this.setState(state => ({
            currentStep: 0,
        }));
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            requiredError: false
        });
    };
    handleChangeInput = name => event => {
        this.setState({
            [name]: event.target.value,
            requiredError: false
        });
    };
    render() {
        const { classes } = this.props;
        const { steps, currentStep, requiredError } = this.state;

        if(currentStep === 1) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.require_title}>
                                    *Required
                                </div>
                                <div className={classes.title}>
                                    Um welche Art von Auftrag handelt es sich?<span className={classes.star_color}>*</span>
                                </div>
                                <div className={classes.option_group}>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            name="step1_value"
                                            className={classes.group}
                                            value={this.state.step1_value}
                                            onChange={this.handleChange}
                                        >
                                            <FormControlLabel value="clearing_out" control={<Radio color="default"/>} label="Entrümepelung" />
                                            <FormControlLabel value="move" control={<Radio  color="default"/>} label="Umzug" />
                                            <FormControlLabel value="transport" control={<Radio color="default" />} label="Transport" />
                                            <FormControlLabel value="disposal" control={<Radio color="default" />} label="Entsorgung" />
                                        </RadioGroup>
                                    </FormControl>
                                    {requiredError &&
                                    <div className={classes.requiredError}>This is a required question</div>
                                    }

                                </div>
                            </CardContent>
                            <CardActions className={classes.action_foot}>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleNext}>
                                    NEXT
                                </Button>

                                <div className={classes.stepperContainer}>
                                    <div className={classes.stepBar}>
                                        <ProgressBar percent={currentStep*100/9} />
                                    </div>
                                    <div className={classes.stepTxt}>{`${currentStep} of Page ${steps}`}</div>
                                </div>

                            </CardActions>
                        </Card>
                    </div>
                </div>
            );
        }
        if(currentStep === 2) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.require_title}>
                                    *Required
                                </div>
                                <div className={classes.title}>
                                    Was ist der Anlass für den Auftrag?<span className={classes.star_color}>*</span>
                                </div>
                                <div className={classes.option_group}>
                                    <div className={classes.option_div}>
                                        <Radio
                                            color="default"
                                            checked={this.state.step2_value === 'nursing_case'}
                                            onChange={this.handleChange}
                                            value="nursing_case"
                                            name="step2_value"
                                        />
                                        <span>Pflegefall</span>
                                    </div>
                                    <div className={classes.option_div}>
                                        <Radio
                                            color="default"
                                            checked={this.state.step2_value === 'death'}
                                            onChange={this.handleChange}
                                            value="death"
                                            name="step2_value"
                                        />
                                        <span>Sterbefall</span>
                                    </div>
                                    <div className={classes.otherInputContainer}>
                                        <div className={classes.option_div}>
                                            <Radio
                                                color="default"
                                                checked={this.state.step2_value === 'other'}
                                                onChange={this.handleChange}
                                                value="other"
                                                name="step2_value"
                                            />
                                            <span>Other</span>
                                        </div>
                                        {this.state.step2_value === 'other' &&
                                            <TextField
                                                id="standard-name"
                                                className={classes.textField}
                                                value={this.state.step2_other}
                                                onChange={this.handleChangeInput('step2_other')}
                                            />
                                        }

                                    </div>
                                    {requiredError &&
                                    <div className={classes.requiredError}>This is a required question</div>
                                    }
                                </div>
                            </CardContent>
                            <CardActions className={classes.action_foot}>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleBack}>
                                    BACK
                                </Button>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleNext}>
                                    NEXT
                                </Button>
                                <div className={classes.stepperContainer}>
                                    <div className={classes.stepBar}>
                                        <ProgressBar percent={currentStep*100/9} />
                                    </div>
                                    <div className={classes.stepTxt}>{`${currentStep} of Page ${steps}`}</div>
                                </div>

                            </CardActions>
                        </Card>
                    </div>
                </div>
            );
        }
        if(currentStep === 3) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.require_title}>
                                    *Required
                                </div>
                                <div className={classes.title}>
                                    Auftrageberform<span className={classes.star_color}>*</span>
                                </div>
                                <div className={classes.option_group}>
                                    <FormControl className={classes.orderFormContainer}>
                                        <Select
                                            value={this.state.order_form}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'order_form',
                                                id: 'order_form',
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Choose</em>
                                            </MenuItem>
                                            <MenuItem value='private'>Private</MenuItem>
                                            <MenuItem value='company'>Company</MenuItem>
                                            <MenuItem value='health_insurance'>Health Insurance</MenuItem>
                                            <MenuItem value='insurance'>Insurance</MenuItem>
                                            <MenuItem value='employer'>Employer</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {requiredError &&
                                    <div className={classes.requiredError}>This is a required question</div>
                                    }
                                </div>
                            </CardContent>
                            <CardActions className={classes.action_foot}>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleBack}>
                                    BACK
                                </Button>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleNext}>
                                    NEXT
                                </Button>

                                <div className={classes.stepperContainer}>
                                    <div className={classes.stepBar}>
                                        <ProgressBar percent={currentStep*100/9} />
                                    </div>
                                    <div className={classes.stepTxt}>{`${currentStep} of Page ${steps}`}</div>
                                </div>

                            </CardActions>
                        </Card>
                    </div>
                </div>
            );
        }
        if(currentStep === 4) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.title}>
                                    Wer übernimmt die Kosten für den Auftrag?
                                </div>
                                <div className={classes.option_group}>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            name="step4_value"
                                            className={classes.group}
                                            value={this.state.step4_value}
                                            onChange={this.handleChange}
                                        >
                                            <FormControlLabel value="self_pay" control={<Radio color="default"/>} label="Selbstzahler" />
                                            <FormControlLabel value="employer" control={<Radio  color="default"/>} label="Arbeitgeber" />
                                            <FormControlLabel value="public_institution" control={<Radio color="default" />} label="Öffentliche Einrichtung" />
                                            <FormControlLabel value="company" control={<Radio color="default" />} label="Firma" />
                                            <FormControlLabel value="health_insurance" control={<Radio color="default" />} label="Krankenkasse" />
                                            <FormControlLabel value="insurance" control={<Radio color="default" />} label="Versicherung" />
                                        </RadioGroup>
                                    </FormControl>
                                    {requiredError &&
                                    <div className={classes.requiredError}>This is a required question</div>
                                    }
                                </div>
                            </CardContent>
                            <CardActions className={classes.action_foot}>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleBack}>
                                    BACK
                                </Button>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleNext}>
                                    NEXT
                                </Button>

                                <div className={classes.stepperContainer}>
                                    <div className={classes.stepBar}>
                                        <ProgressBar percent={currentStep*100/9} />
                                    </div>
                                    <div className={classes.stepTxt}>{`${currentStep} of Page ${steps}`}</div>
                                </div>

                            </CardActions>
                        </Card>
                    </div>
                </div>
            );
        }
        if(currentStep === 5) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.require_title}>
                                    *Required
                                </div>
                                <div className={classes.title}>
                                    Wann wurde die Anfrage gestellt?<span className={classes.star_color}>*</span>
                                </div>
                                <div className={classes.option_group}>
                                    <TextField
                                        id="request_date"
                                        label="Date"
                                        type="date"
                                        defaultValue="yyyy/mm/dd"
                                        value={this.state.request_date}
                                        className={classes.dateTextField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeInput('request_date')}
                                    />
                                    {requiredError &&
                                    <div className={classes.requiredError}>This is a required question</div>
                                    }
                                </div>
                            </CardContent>
                            <CardActions className={classes.action_foot}>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleBack}>
                                    BACK
                                </Button>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleNext}>
                                    NEXT
                                </Button>

                                <div className={classes.stepperContainer}>
                                    <div className={classes.stepBar}>
                                        <ProgressBar percent={currentStep*100/9} />
                                    </div>
                                    <div className={classes.stepTxt}>{`${currentStep} of Page ${steps}`}</div>
                                </div>

                            </CardActions>
                        </Card>
                    </div>
                </div>
            );
        }
        if(currentStep === 6) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.require_title}>
                                    *Required
                                </div>
                                <div className={classes.title}>
                                    Wann ist der Auftrag frühestens ausführbar?<span className={classes.star_color}>*</span>
                                </div>
                                <div className={classes.option_group}>
                                    <TextField
                                        id="order_date_min"
                                        label="Date"
                                        type="date"
                                        defaultValue="yyyy/mm/dd"
                                        value={this.state.order_date_min}
                                        className={classes.dateTextField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeInput('order_date_min')}
                                    />
                                    {requiredError &&
                                    <div className={classes.requiredError}>This is a required question</div>
                                    }
                                </div>
                            </CardContent>
                            <CardActions className={classes.action_foot}>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleBack}>
                                    BACK
                                </Button>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleNext}>
                                    NEXT
                                </Button>

                                <div className={classes.stepperContainer}>
                                    <div className={classes.stepBar}>
                                        <ProgressBar percent={currentStep*100/9} />
                                    </div>
                                    <div className={classes.stepTxt}>{`${currentStep} of Page ${steps}`}</div>
                                </div>

                            </CardActions>
                        </Card>
                    </div>
                </div>
            );
        }
        if(currentStep === 7) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.require_title}>
                                    *Required
                                </div>
                                <div className={classes.title}>
                                    Wann ist der Auftrag spätestens ausführbar?<span className={classes.star_color}>*</span>
                                </div>
                                <div className={classes.option_group}>
                                    <TextField
                                        id="order_date_max"
                                        label="Date"
                                        type="date"
                                        defaultValue="yyyy/mm/dd"
                                        value={this.state.order_date_max}
                                        className={classes.dateTextField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeInput('order_date_max')}
                                    />
                                    {requiredError &&
                                    <div className={classes.requiredError}>This is a required question</div>
                                    }
                                </div>
                            </CardContent>
                            <CardActions className={classes.action_foot}>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleBack}>
                                    BACK
                                </Button>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleNext}>
                                    NEXT
                                </Button>

                                <div className={classes.stepperContainer}>
                                    <div className={classes.stepBar}>
                                        <ProgressBar percent={currentStep*100/9} />
                                    </div>
                                    <div className={classes.stepTxt}>{`${currentStep} of Page ${steps}`}</div>
                                </div>

                            </CardActions>
                        </Card>
                    </div>
                </div>
            );
        }
        if(currentStep === 8) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.require_title}>
                                    *Required
                                </div>
                                <div className={classes.title}>
                                    Bis wann ist das Angebot gültig?<span className={classes.star_color}>*</span>
                                </div>
                                <div className={classes.option_group}>
                                    <TextField
                                        id="valid_date"
                                        label="Date"
                                        type="date"
                                        defaultValue="yyyy/mm/dd"
                                        value={this.state.valid_date}
                                        className={classes.dateTextField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeInput('valid_date')}
                                    />
                                    {requiredError &&
                                    <div className={classes.requiredError}>This is a required question</div>
                                    }
                                </div>
                            </CardContent>
                            <CardActions className={classes.action_foot}>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleBack}>
                                    BACK
                                </Button>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleNext}>
                                    NEXT
                                </Button>

                                <div className={classes.stepperContainer}>
                                    <div className={classes.stepBar}>
                                        <ProgressBar percent={currentStep*100/9} />
                                    </div>
                                    <div className={classes.stepTxt}>{`${currentStep} of Page ${steps}`}</div>
                                </div>

                            </CardActions>
                        </Card>
                    </div>
                </div>
            );
        }
        if(currentStep === 9) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.title}>
                                    Untitled section
                                </div>
                                <div className={classes.option_group}>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            name="step9_value"
                                            className={classes.group}
                                            value={this.state.step9_value}
                                            onChange={this.handleChange}
                                        >
                                            <FormControlLabel value="option1" control={<Radio color="default"/>} label="Option 1" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </CardContent>
                            <CardActions className={classes.action_foot}>
                                <Button variant="contained" className={classes.button_next} onClick={this.handleBack}>
                                    BACK
                                </Button>
                                <Button variant="contained" className={classes.button_next} color="primary" onClick={this.handleSubmit}>
                                    SUBMIT
                                </Button>

                                <div className={classes.stepperContainer}>
                                    <div className={classes.stepBar}>
                                        <ProgressBar percent={currentStep*100/9} />
                                    </div>
                                    <div className={classes.stepTxt}>{`${currentStep} of Page ${steps}`}</div>
                                </div>

                            </CardActions>
                        </Card>
                    </div>
                </div>
            );
        }
        if(currentStep === 0) {
            return (
                <div className={classes.gridContainer}>
                    <div className={classes.gridItem}>
                        <Card className={classes.cardContainer}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.submitDescription}>
                                    Thank you for your submission.
                                </div>
                                <div className={classes.submitDescription}>
                                    If you passed you will receive a printable certificate shortly.
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            );
        }
    }
}

viewForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        requesting: state.auth.requesting,
        authenticated: state.auth.authenticated,
        error: state.auth.error
    };
}

const mapDispatchToProps = dispatch => ({
    loginSuccess: bindActionCreators(loginSuccess, dispatch),
    loginRequesting: bindActionCreators(loginRequesting, dispatch),
})
export default withStyles(styles)(connect()(withSnackbar(viewForm)));