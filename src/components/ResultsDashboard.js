import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, Grid } from '@material-ui/core';
import TransitionTimeIcon from "../assets/icons/TransitionTime.svg"
import ClassroomClimateIcon from "../assets/icons/ClassroomClimate.svg"
import MathIcon from "../assets/icons/MathInstruction.svg"
import EngagementIcon from "../assets/icons/StudentEngagement.svg"
import InstructionIcon from "../assets/icons/LevelofInstruction.svg"
import ListeningIcon from "../assets/icons/ListeningtoChildren.svg"
import SequentialIcon from "../assets/icons/SequentialActivities.svg"
import AssocCoopIcon from "../assets/icons/AssocCoopInteractions.svg"
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import moment from 'moment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#094492'
    }
  }
});

const styles = {
  card: {
    border: "3px solid #d9d9d9",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "100%",
    boxShadow: "5px",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justify: "space-evenly",
    display: "flex",
    flex: "1",
    flexWrap: "nowrap"
  },
  iconGrid: {
    marginTop:"10px",
    marginBottom:"5px"
  },
  icon: {
    width: "100px",
    height: "100px"
  },
  infoDisplayGrid: {
    height: "41vh",
    width:"90%",
    marginLeft:"5px",
    marginRight:"5px",
    marginTop:"5px",
    marginBottom:"5px",
    display: "flex",
    justifyItems: "center"
  },
  helpIcon: {
    width: "60px"
  },
  completeGrid: {
    marginTop: "5px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    alignContent: "flex-end",
    display: "flex"
  },
  completeButton: {
    color: "#d9d9d9",
    borderColor: "#d9d9d9",
    borderWidth: "2px",
    fontSize: "15px",
    alignSelf: "flex-end",
    marginTop: "auto"
  },
  gridTopMargin: {
    marginTop: "5px"
  },
  resultsButtons: {
    marginTop: "2vh"
  },
  viewButtons: {
    minWidth: 150,
    textAlign: "center",
    color: "#094492",
    borderColor: "#094492",
  },
  viewButtonsSelected: {
    minWidth: 150,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#094492"
  },
};



class ResultsDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      icon: null,
    }
  }

  componentDidMount = () => {
    if (this.props.magic8 === "Transition Time") {
      this.setState({ icon: TransitionTimeIcon });
    } else if (this.props.magic8 === "Classroom Climate") {
      this.setState({ icon: ClassroomClimateIcon })
    } else if (this.props.magic8 === "Math") {
      this.setState({ icon: MathIcon })
    } else if (this.props.magic8 === "Level of Engagement") {
      this.setState({ icon: EngagementIcon })
    } else if (this.props.magic8 === "Level of Instruction") {
      this.setState({ icon: InstructionIcon })
    } else if (this.props.magic8 === "Listening to Children") {
      this.setState({ icon: ListeningIcon })
    } else if (this.props.magic8 === "Sequential Activities") {
      this.setState({ icon: SequentialIcon })
    } else {
      this.setState({ icon: AssocCoopIcon })
    }
  };

  render(){
    const { classes } = this.props;
    return(
      <div>
        <Card className={classes.card}>
          <Grid
            container
            padding={12}
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{marginRight: 20, marginLeft: 20}}
          >
            <Grid item className={classes.iconGrid}>
              <img src={this.state.icon} alt="Magic 8 Icon" className={classes.icon}/>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <TextField
                select
                className={classes.viewButtons}
                label="Date"
                value={this.props.sessionId}
                onChange={this.props.changeSessionId}
                InputLabelProps={{ shrink: true }}
              >
                {this.props.sessionDates.map((date, index)=> 
                  {return <MenuItem key={index} id={date.id} value={date.id}>
                    <em>{moment(date.sessionStart.value).format("MMM Do YY")}</em>
                  </MenuItem>})}
              </TextField>
            </Grid>

            <Grid item className={classes.resultsButtons}>
              <MuiThemeProvider theme={theme}>
                <Button
                  size="large"
                  color="primary"
                  variant={
                    this.props.view === this.props.viewEnum.DATA
                      ? "contained"
                      : "outlined"
                  }
                  className={this.props.view === this.props.viewEnum.DATA ? classes.viewButtonsSelected : classes.viewButtons}
                  onClick={this.props.dataClick}
                >
                  Data
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <MuiThemeProvider theme={theme}>
                <Button
                  size="large"
                  color="primary"
                  variant={
                    this.props.view === this.props.viewEnum.QUESTIONS
                      ? "contained"
                      : "outlined"
                  }
                  className={this.props.view === this.props.viewEnum.QUESTIONS ? classes.viewButtonsSelected : classes.viewButtons}
                  onClick={this.props.questionsClick}
                >
                  Questions
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <MuiThemeProvider theme={theme}>
                <Button
                  size="large"
                  color="primary"
                  variant={
                    this.props.view === this.props.viewEnum.COACH_PREP
                      ? "contained"
                      : "outlined"
                  }
                  className={this.props.view === this.props.viewEnum.COACH_PREP ? classes.viewButtonsSelected : classes.viewButtons}
                  onClick={this.props.coachPrepClick}
                >
                  Coach Prep
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <MuiThemeProvider theme={theme}>
                <Button
                  size="large"
                  color="primary"
                  variant={
                    this.props.view === this.props.viewEnum.ACTION_PLAN
                      ? "contained"
                      : "outlined"
                  }
                  className={this.props.view === this.props.viewEnum.ACTION_PLAN ? classes.viewButtonsSelected : classes.viewButtons}
                  onClick={this.props.actionPlanClick}
                >
                  Action Plan
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item style={{marginTop: "7vh", marginBottom: "2vh"}}>
              <MuiThemeProvider theme={theme}>
                <Button
                  size="large"
                  color="primary"
                  variant={
                    this.props.view === this.props.viewEnum.NOTES
                      ? "contained"
                      : "outlined"
                  }
                  className={this.props.view === this.props.viewEnum.NOTES ? classes.viewButtonsSelected : classes.viewButtons}
                  onClick={this.props.notesClick}
                >
                  Notes
                </Button>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

ResultsDashboard.propTypes = {
  magic8: PropTypes.string.isRequired,
  dataClick: PropTypes.func.isRequired,
  questionsClick: PropTypes.func.isRequired,
  coachPrepClick: PropTypes.func.isRequired,
  actionPlanClick: PropTypes.func.isRequired,
  notesClick: PropTypes.func.isRequired,
  changeSessionId: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  sessionDates: PropTypes.array.isRequired,
  viewEnum: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultsDashboard);