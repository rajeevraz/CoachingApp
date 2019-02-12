import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Select from '@material-ui/core/Select';
import {ReactComponent as GenerateReportSVG} from '../../../assets/icons/generateReport.svg'

import {
    withStyles
} from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import {VictoryPie} from 'victory-pie';
import ListDetailTableClassroomClimateResults from "../../../components/ResultsComponents/ListDetailTableClassroomClimateResults.js";


const styles = {
    root: {
        flexGrow: 1,
        display: "flex",
        height: "100%",
        flexDirection: "column"
    },
    main: {
        flex: 1,
        height: '90%',
        marginTop: '10vh'
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    viewButtons: {
        minWidth: 150,
        textAlign: "center"
    },
    buttonsList: {
        position: 'relative',
        left: '40%',
        top: '13%'
    },
    title: {
        position: 'relative',
        left: '33%',
        top: '10%'
    },
    secondTitle: {
        position: 'relative',
        left: '40%',
        top: '10%'
    },
    chart: {
        position: 'relative',
        left: '7%',
        top: '5%'
    },
    generateReport: {
        position: 'relative',
        right: '10%',
        top: '76%'
    }

};

// dummy data for classroom cliamte list detail table, when we read in from DB we can use custom id
let id = 0;
function createData(time, notes) {
  id += 1;
  return {time, notes};
}

const classroomClimateData = [
  createData('08:32', 'Kiss your brain'),
  createData('08:44', 'Great super friend'),
  createData('09:01', 'Lots of good jobs'),
  createData('09:37', 'BD frown'),
  createData('09:56', 'Close down center conflict'),
];
// end of list detail table data

class ClassroomClimateResults extends React.Component {
    constructor(props) {
        super(props);
        this.handleAppend = this.handleAppend.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    state = {
        auth: true,
        anchorEl: null,
        help: false,
        type: null,
        hex: "#FFFFFF",
        entries: [],
        dbCounter: 0, // @Hack @Temporary !!!
        onSummary: true,
        onList: false,
        onTrends: false,
        onNotes: false,
        onNextSteps: false,
    };

    componentDidMount() {
        console.log(this.props.location.state);
    }

    handleAppend(entry) {
        let newEntries = this.state.entries;
        entry.type = this.state.type;
        newEntries.push(entry);
        this.setState({ entries: newEntries });

        this.handleSpreadsheetAppend(entry);

        this.handleDBinsert(entry);
    }

    handleTypeChange(newType) {
        this.setState({ type: newType });
        this.changeHex(newType);
    }

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleHelpModal = () => {
        this.setState({ help: true });
    };

    handleClickAway = () => {
        this.setState({ help: false });
    };

    handleDBinsert = async entry => {
        // Once we integrate users, the user + some index will be the key for the DB.
        await ImmortalDB.set(
            JSON.stringify(this.state.dbCounter),
            JSON.stringify(entry)
        );

        this.setState({ dbCounter: this.state.dbCounter + 1 });
    };

    handleSpreadsheetAppend = entry => {
        let url = new URL(spreadsheetData.scriptLink),
            params = {
                sheet: "ClassroomClimateTime",
                del: "false",
                TrnDur: entry.time,
            };
        Object.keys(params).forEach(key =>
            url.searchParams.append(key, params[key])
        );
        fetch(url, {
            method: "POST",
            credentials: "include",
            mode: "no-cors",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => console.log("Success"))
            .catch(error => console.error("Error:", error));
    };

    summaryClick = () => {
        if (this.state.onSummary === false){
            this.setState({ onSummary: true });
            this.setState({ onList: false });
            this.setState({ onTrends: false });
            this.setState({ onNotes: false });
            this.setState({ onNextSteps: false });
        }
    };

    listClick = () => {
        if (this.state.onList === false){
            this.setState({ onSummary: false });
            this.setState({ onList: true });
            this.setState({ onTrends: false });
            this.setState({ onNotes: false });
            this.setState({ onNextSteps: false });
        }
    };

    trendsClick = () => {
        if (this.state.onTrends === false){
            this.setState({ onSummary: false });
            this.setState({ onList: false });
            this.setState({ onTrends: true });
            this.setState({ onNotes: false });
            this.setState({ onNextSteps: false })
        }
    };

    notesClick = () => {
        if (this.state.onNotes === false){
            this.setState({ onSummary: false });
            this.setState({ onList: false });
            this.setState({ onTrends: false });
            this.setState({ onNotes: true });
            this.setState({ onNextSteps: false })
        }
    };

    nextStepsClick = () => {
        if (this.state.onNextSteps === false){
            this.setState({ onSummary: false });
            this.setState({ onList: false });
            this.setState({ onTrends: false });
            this.setState({ onNotes: false });
            this.setState({ onNextSteps: true });
        }
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <FirebaseContext.Consumer>
                    {firebase => <AppBar firebase={firebase} />}
                </FirebaseContext.Consumer>
                <main className={classes.main}>
                    <Grid container spacing={32} justify="center" direction={'row'}>
                        <Grid item xs={3}>
                          <List className={classes.buttonsList}>
                            <ListItem>
                                <form>
                                    <FormControl variant="filled" className={classes.viewButtons}>
                                        <InputLabel htmlFor="filled-age-simple">Date</InputLabel>
                                        <Select
                                            input={<FilledInput name="age" id="filled-age-simple" />}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Mon, Oct 22, 2018</MenuItem>
                                            <MenuItem value={20}>Tue, Nov 6, 2018</MenuItem>
                                            <MenuItem value={30}>Thurs, Nov 29, 2018</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>
                            </ListItem>
                            <ListItem>
                              <Button size= "large"
                                      color= {"secondary"}
                                      variant = {this.state.onSummary ? "contained" : "outlined"}
                                      className={classes.viewButtons}
                                      onClick={this.summaryClick}>
                              Summary
                              </Button>
                            </ListItem>
                            <ListItem>
                              <Button size= "large"
                                      color= {"primary"}
                                      variant = {this.state.onList ? "contained" : "outlined"}
                                      className={classes.viewButtons}
                                      onClick={this.listClick}>
                              List Detail
                              </Button>
                            </ListItem>
                            <ListItem>
                              <Button size= "large"
                                      color= {"secondary"}
                                      variant = {this.state.onTrends ? "contained" : "outlined"}
                                      className={classes.viewButtons}
                                      onClick={this.trendsClick}>
                              Trends
                              </Button>
                            </ListItem>
                            <ListItem>
                              <Button size= "large"
                                      color= {"inherit"}
                                      variant = {this.state.onNotes ? "contained" : "outlined"}
                                      className={classes.viewButtons}
                                      onClick={this.notesClick}>
                              Notes
                              </Button>
                            </ListItem>
                              <ListItem>
                                  <Button size= "large"
                                          color= {"inherit"}
                                          variant = {this.state.onNextSteps ? "contained" : "outlined"}
                                          className={classes.viewButtons}
                                          onClick={this.nextStepsClick}>
                                      Next Steps
                                  </Button>
                              </ListItem>
                          </List>
                        </Grid>
                        <Grid container item xs={7}>
                            <Grid container direction={'row'}>
                                <Grid item xs={12}>
                                    <Typography variant={'h5'} className={classes.title}>Classroom Climate Results</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>

                                    </div>
                                    <div>
                                    {this.state.onList
                                        ? <div style={{height: '60vh', position:'relative', top:'8vh', left:'25%'}}>
                                            <ListDetailTableClassroomClimateResults data={classroomClimateData}/>
                                        </div>
                                        : null
                                    }
                                    </div>
                                    <div>
                                    {this.state.onTrends
                                        ? <div style={{height: '60vh'}}/>// replace this null with trends graph
                                        : null
                                    }
                                    </div>
                                    <div>
                                        {this.state.onNotes
                                            ? <div style={{height: '60vh'}}/>// replace this null with trends graph
                                            : null
                                        }
                                    </div>
                                    <div>
                                    {this.state.onNextSteps
                                        ? <div style={{height: '60vh'}}/>// replace this null with next steps content
                                        : null
                                    }
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item xs={2}>
                            <Grid item xs={12}>
                                <IconButton className={classes.generateReport}>
                                    <GenerateReportSVG style={{height: '88px', width: '88px'}}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

ClassroomClimateResults.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClassroomClimateResults);