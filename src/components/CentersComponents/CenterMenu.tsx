import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CenterChecklist from './CenterChecklist';
import NewCenterDialog from './NewCenterDialog';
import CenterRatingChecklist from './CenterRatingChecklist';
import Dashboard from '../Dashboard.js';
import TotalVisitCount from '../TotalVisitCount';
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";

const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  }
};

interface VisitCenterProps {
  centerName: string,
  visitCount: number,
  onClick(): void 
  type: string
}

/**
 * @param {VisitCenterProps} props
 * @return {ReactElement}
 */
const VisitCenterButton = (props: VisitCenterProps): React.ReactElement => {
  let hsl = 0;
  props.type === "AC" ? 
    hsl = Math.max(82 - 4 * props.visitCount, 49.6)
    : props.type === "MI" ?
    hsl = Math.max(70 - 4 * props.visitCount, 30)
    : hsl = Math.max(82 - 4 * props.visitCount, 50);
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        minHeight: 150,
        maxHeight: 150,
        minWidth: 150,
        maxWidth: 150,
        whiteSpace: "normal",
        wordWrap: "break-word",
        backgroundColor: props.type === "AC" ?
          `hsl(263.3, 54.9%, ${hsl}%`
          : props.type === "MI" ?
          `hsl(214.2, 88.4%, ${hsl}%`
          : `hsl(49.6, 100%, ${hsl}%`
        ,
        fontFamily: 'Arimo'
      }}
      onClick={props.onClick}
    >
      {props.centerName}
      <br />
      <br />
      {props.visitCount}
    </Button>
  );
};


const CENTER_CHECKLIST = 0;
const CENTER_MENU = 1;
const RATING_SCREEN = 2;

interface Props {
  teacherId: string,
  firebase: {
    auth: {
      currentUser: {
        uid: string
      }
    },
    handleSession(mEntry: {teacher: string, observedBy: string, type: string}): void,
    handlePushCentersData(mEntry: {checked: Array<number>, people: number}): void
  },
  type: string,
  addNewCenter(centerName: string): void,
  incrementCenterCount(centerName: string): void,
  centers: Array<{
    name: string,
    count: number
  }>,
}

interface State{
  addDialog: boolean,
  status: number,
  currentCenter: string,
  totalVisitCount: number
}

/**
 * Center Menu
 * @class CenterMenu
 */
class CenterMenu extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
    const mEntry = {
      teacher: this.props.teacherId,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: this.props.type === 'MI' ? 'math'
        : this.props.type === 'SA' ? 'sequential'
        : 'AC'
    };
    this.props.firebase.handleSession(mEntry);

    this.state = {
      addDialog: false,
      status: CENTER_CHECKLIST,
      currentCenter: null,
      totalVisitCount: 0
    }
  }

  handleClickOpen = (): void => {
    this.setState({ addDialog: true });
  };

  handleClose = (): void => {
    this.setState({ addDialog: false });
  };

  switchToCenterChecklist = (): void => {
    this.setState({ status: CENTER_CHECKLIST });
  };

  switchToCenterMenu = (): void => {
    this.setState({ status: CENTER_MENU });
  };

  switchToRatingScreen = (): void => {
    this.setState({ status: RATING_SCREEN });
  };

  /**
   * @param {string} centerName
   */
  handleAddCenter = (centerName: string): void => {
    this.props.addNewCenter(centerName);
    this.handleClose();
  };

  /**
   * @param {string} centerName
   */
  handleCenterVisit = (centerName: string): void => {
    this.switchToRatingScreen();
    this.setState({ currentCenter: centerName });
  };

  /**
   * @param {string} centerName
   */
  finishCenterVisit = (centerName: string): void => {
    if (centerName !== undefined) {
      this.props.incrementCenterCount(centerName);
      this.setState({ totalVisitCount: this.state.totalVisitCount + 1 });
    }
  };

  static propTypes = {
    teacherId: PropTypes.string,
    firebase: PropTypes.object.isRequired,
    addNewCenter: PropTypes.func.isRequired,
    incrementCenterCount: PropTypes.func.isRequired,
    centers: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    switch (this.state.status) {
      case CENTER_CHECKLIST:
        return (
          <CenterChecklist
            switchToCenterMenu={this.switchToCenterMenu}
            addCenter={this.props.addNewCenter}
          />
        );
      case CENTER_MENU:
        return (
          <div>
            <Grid
              justify="center"
              alignItems="stretch"
              direction="row"
              style={{ margin: 10 }}
            >
              <Grid justify="flex-start" alignItems="center" direction="row">
                <Grid container spacing={0} direction="row" alignItems="center">
                  <NewCenterDialog
                    open={this.state.addDialog}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleAddCenter}
                  />
                  <Grid item xs={3}>
                    <Grid
                      container
                      alignItems={"center"}
                      justify={"center"}
                      direction={"column"}
                    >
                      {/* <div style={{ margin: 20 }} /> */}
                      <Dashboard
                        type={this.props.type}
                        infoDisplay={
                          <TotalVisitCount count={this.state.totalVisitCount} />
                        }
                        infoPlacement="flex-start"
                        completeObservation={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={9}>
                    {this.props.centers.map((center, index) => (
                      <Grid
                        key={index}
                        item
                        xs={4}
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        <VisitCenterButton
                          centerName={center.name}
                          visitCount={center.count}
                          onClick={() => this.handleCenterVisit(center.name)}
                          type={this.props.type}
                        />
                      </Grid>
                    ))}
                    <Grid
                      item
                      xs={4}
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          minHeight: 150,
                          maxHeight: 150,
                          minWidth: 150,
                          maxWidth: 150,
                          backgroundColor: grey[400],
                          fontFamily: 'Arimo'
                        }}
                        onClick={this.handleClickOpen}
                      >
                        Add Center <br /> <br /> +
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      case RATING_SCREEN:
        return (
          <CenterRatingChecklist
            currentCenter={this.state.currentCenter}
            toggleScreen={this.switchToCenterMenu}
            finishVisit={centerName => this.finishCenterVisit(centerName)}
            firebase={this.props.firebase}
            type={this.props.type}
          />
        );
      default:
        return <div>Unknown status value!!!</div>;
    }
  }
}



export default withStyles(styles)(CenterMenu);