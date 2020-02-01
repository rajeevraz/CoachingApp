import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowLeft from "@material-ui/core/es/internal/svg-icons/KeyboardArrowLeft";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../Dashboard";
import Countdown from "../Countdown";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arimo"
  },
  grow: {
    flexGrow: 1
  }
};

const TeacherChildEnum = {
  NO_TEACHER:1,
  TEACHER_PRESENT:2
};

const RATING_INTERVAL = 60000;
const TEN_PERCENT = 0.1 * RATING_INTERVAL;

class CenterRatingChecklistMath extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    ratings: [],
    checked: [0],
    people: undefined,
    time: RATING_INTERVAL,
    timeUpOpen: false,
    peopleWarning: false,
    mathType: ""
  };

  tick = () => {
    if (this.state.time <= 0) {
      this.handleTimeUpNotification();
      this.setState({ time: RATING_INTERVAL });
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState({ time: 0 });
      } else {
        this.setState({ time: this.state.time - 1000 });
      }
    }
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleTimeUpNotification = () => {
    this.setState({ timeUpOpen: true });
  };

  handleTimeUpClose = () => {
    this.setState({ timeUpOpen: false });
  };

  handlePeopleWarningClose = () => {
    this.setState({ peopleWarning: false });
  };

  handleClickAway = () => {
    this.setState({ help: false });
  };

  handleBackButton = () => {
    this.props.toggleScreen();
  };

  handleSubmit = () => {
    if (this.state.people === undefined) {
      this.setState({ peopleWarning: true });
    } else {
      const mEntry = {
        checked: this.state.checked,
        people: this.state.people
        // acType: this.state.acType
      };
      // <<<<<<< HEAD
      // =======
      this.props.firebase.handlePushMath(mEntry);
      // >>>>>>> 7416dfe9eba94b55b62425799cbd308062bc27b4
      this.props.finishVisit(this.props.currentCenter);
      this.props.toggleScreen();
    }
  };

  handleToggle = value => () => {
    // Prevents updating state of checkbox when disabled
    if (
      (value <= 5 && this.childDisabled()) ||
      (value >= 6 && this.teacherDisabled())
    ) {
      return;
    }
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  childDisabled = () => {
    return (
      this.state.people === undefined
    );
  };

  teacherDisabled = () => {
    return (
      this.state.people === TeacherChildEnum.NO_TEACHER ||
      this.state.people === undefined
    );
  };

  handleTeacherClick = () => {
    if (this.state.people !== TeacherChildEnum.TEACHER_PRESENT) {
      this.setState({ people: TeacherChildEnum.TEACHER_PRESENT });

      const { checked } = this.state;
      const newChecked = [...checked];
      for (let i = 5; i <= 8; i++) {
        // If there are teacher ratings checked, remove them
        if (checked.includes(i)) {
          const currentIndex = checked.indexOf(i);
          newChecked.splice(currentIndex);
        }
      }
      this.setState({ checked: newChecked });
    }
  };

  handleNoTeacherClick = () => {
    if (this.state.people !== TeacherChildEnum.NO_TEACHER) {
      this.setState({ people: TeacherChildEnum.NO_TEACHER });

      const { checked } = this.state;
      const newChecked = [...checked];
      for (let i = 5; i <= 8; i++) {
        // If there are teacher ratings checked, remove them
        if (checked.includes(i)) {
          const currentIndex = checked.indexOf(i);
          newChecked.splice(currentIndex);
        }
      }
      this.setState({ checked: newChecked });
    }
  };
 
  render() {
    return (
      <div className={this.props.classes.root}>
        <Dialog
          open={this.state.timeUpOpen}
          onClose={this.handleTimeUpClose}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="simple-dialog-title" style={{fontFamily: 'Arimo'}}>
            Don't forget to circulate!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Arimo'}}>
              You've been at the {this.props.currentCenter} center for 1 minute.
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.peopleWarning}
          onClose={this.handlePeopleWarningClose}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="simple-dialog-title"  style={{fontFamily: 'Arimo'}}>Wait!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"  style={{fontFamily: 'Arimo'}}>
              Please select if the teachers is present at the center or not
              before submitting your rating.
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <main>
          <Grid
            container
            alignItems={"center"}
            direction={"row"}
            justify={"center"}
          >
            <Grid item xs={3}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                {/* <div style={{ margin: 20 }} /> */}
                <Dashboard
                  magic8="Math Instruction"
                  color="#E55529"
                  infoDisplay={<Countdown color="#E55529" timerTime={60000} />}
                  infoPlacement="center"
                  completeObservation={false}
                />
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Grid>
                <div style={{ margin: 10 }} />
                <Button size={"small"} onClick={this.handleBackButton}  style={{fontFamily: 'Arimo'}}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              </Grid>
              <Grid container alignItems="center" direction="column" xs={12}>
                <Typography variant="h4" gutterBottom  style={{fontFamily: 'Arimo'}}>
                  {this.props.currentCenter[0].toUpperCase() +
                    this.props.currentCenter.substr(1)}
                </Typography>
                <div style={{ height: 20 }} />
                <Typography variant={"subtitle2"} gutterBottom  style={{fontFamily: 'Arimo'}}>
                  Please select if teacher is present or not at the
                  center:
                </Typography>
                <Grid
                  container
                  direction={"row"}
                  justify={"space-around"}
                  xs={12}
                >
                  
                  <Grid item>
                    <Button
                      onClick={this.handleNoTeacherClick} 
                      size="small"
                      variant={
                        this.state.people === TeacherChildEnum.NO_TEACHER
                          ? "contained"
                          : "outlined"
                      }
                      style={{fontFamily: 'Arimo'}}
                    >
                      no teacher
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={this.handleTeacherClick}
                      size="small"
                      variant={
                        this.state.people === TeacherChildEnum.TEACHER_PRESENT
                          ? "contained"
                          : "outlined"
                      }
                      style={{fontFamily: 'Arimo'}}
                    >
                     teacher present
                    </Button>
                  </Grid>
                  </Grid> 
                <div style={{ height: 20 }} />
                <Grid container direction={"row"} spacing={16} xs={12}>
                  <Grid item
                   xs={6}>
                    <Card>
                      <Typography variant="h6" align={"center"}>
                        Child Behaviors
                      </Typography>
                      <List>
                        <ListItem
                          onClick={this.handleToggle(1)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.checked.includes(1)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText>
                             <b>Counting and Numbers</b> 
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleToggle(2)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.checked.includes(2)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText>
                             <b>Shapes and Spatial reasoning</b>  
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleToggle(3)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.checked.includes(3)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText>
                          <b>Patterns</b>  
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleToggle(4)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.checked.includes(4)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText>
                            <b>Measurement and Data</b>
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleToggle(5)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.checked.includes(5)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText>None</ListItemText>
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <Typography variant="h6" align={"center"}>
                        Teacher Behaviors
                      </Typography>
                      <List>
                        <ListItem
                          onClick={this.handleToggle(6)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.teacherDisabled() &&
                              this.state.checked.includes(6)
                            }
                            disabled={this.teacherDisabled()}
                          />
                          <ListItemText>
                         Using <b>math vocabulary</b> 
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleToggle(7)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.teacherDisabled() &&
                              this.state.checked.includes(7)
                            }
                            disabled={this.teacherDisabled()}
                          />
                          <ListItemText>
                          <b> Asking questions {" "}</b> about math concepts
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleToggle(8)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.teacherDisabled() &&
                              this.state.checked.includes(8)
                            }
                            disabled={this.teacherDisabled()}
                          />
                      
                          <ListItemText>
    
                            <b>Demonstrating</b> math concepts
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleToggle(9)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.checked.includes(9)
                            }
                            disabled={this.teacherDisabled()}
                          />
                          <ListItemText>None</ListItemText>
                        </ListItem>
                      </List>
                      
                    </Card>
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems={"center"}
                  justify={"center"}
                  direction={"row"}
                >
                  <Button
                    variant="contained"
                    color={"secondary"}
                    onClick={this.handleSubmit}
                    style={{ marginTop: 20, fontFamily: 'Arimo' }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

CenterRatingChecklistMath.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenterRatingChecklistMath);
