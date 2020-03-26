import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { connect } from "react-redux";
import { deleteAllCenters } from "../../../state/actions/math-instruction";
import CenterMenu from '../../../components/CentersComponents/CenterMenu';
import {
  addNewCenter,
  incrementCenterCount
} from "../../../state/actions/math-instruction.js";


const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 0
  }
};

interface Style {
  root: string,
  grow: string
}

interface Props {
  classes: Style,
  location: { state: { teacher: { id: string }}},
  addNewCenter(): void,
  incrementCenterCount(): void,
  centers: Array<{
    name: string,
    count: number
  }>,
}

/**
 * @class MathInstructionPage
 */
class MathInstructionPage extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({ state: PropTypes.exact({ teacher: PropTypes.exact({ id: PropTypes.string})})}).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => (
            <AppBar
              firebase={firebase}
              className={classes.grow}
            />
          )}
        </FirebaseContext.Consumer>
        <main style={{ flex: 1 }}>
          <FirebaseContext.Consumer>
            {(firebase: object): React.ReactNode => (
              <CenterMenu
                teacherId={this.props.location.state.teacher.id}
                firebase={firebase}
                addNewCenter={this.props.addNewCenter}
                incrementCenterCount={this.props.incrementCenterCount}
                type="MI"
                centers={this.props.centers}
              />
            )}
          </FirebaseContext.Consumer>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    centers: state.mathCentersState.mathCenters
  };
};

export default connect(mapStateToProps, { deleteAllCenters, addNewCenter, incrementCenterCount })(
  withStyles(styles)(MathInstructionPage)
);
