import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { popOffClimateStack, pushOntoClimateStack } from "../../state/actions/classroom-climate";
import FirebaseContext from "../../components/Firebase/context";
import { VictoryPie } from "victory-pie";
import Grid from "@material-ui/core/Grid";

const styles = ({

});

class BehaviorCounterResults extends React.Component {
    constructor(props){
      super(props);
  }

    handlePushFire = entry => {

    };



  CustomUI = (props) => {
   console.log("percentage: " + this.props.percentage)
    if (!this.props.percentage){
    return (
    <div class="behavior">
        <div class='disapprovals' style={{display: 'inline-block', marginTop:"15%", marginRight:'17%'}}>
          <div style={{width: '23vw', height: '8vh', fontSize: '1.75em', color: '#e17055', textAlign:'center'}} >TOTAL BEHAVIOR DISAPPROVALS</div>
          <div style={{width: '23vw', height: '10vh', fontSize: '4em', color: '#e17055', textAlign:'center'}}> {this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount} </div>
          <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor:'#d63031', color:"#ffffff", fontWeight:'bold'}}>{this.props.disapprovalBehaviorCount} DISAPPROVAL</div>
          <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor: '#e17055', color:"#ffffff", fontWeight:'bold'}}>{this.props.redirectionsBehaviorCount} REDIRECTION</div>
        </div>
        <div class='approvals' style={{display: 'inline-block'}}>
          <div style={{width: '23vw', height: '8vh', fontSize: '1.75em', color: '#55efc4', display:'inline-block', textAlign:'center'}}>TOTAL BEHAVIOR APPROVALS</div>
            <div style={{width: '23vw', height: '10vh', fontSize: '4em', color: '#55efc4', textAlign:'center'}}> {this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount}</div>
            <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor: '#55efc4', color:"#ffffff", fontWeight:'bold'}}>{this.props.nonspecificBehaviorCount} NON SPECIFIC</div>
            <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor: "#00b894", color:"#ffffff", fontWeight:'bold'}}>{this.props.specificBehaviorCount} SPECIFIC</div>
        </div>
      </div>
    )
    }

    else {
    return (
      <div style= {{ height: "60vh", position: "relative", top:"-3vh"}}>
      <VictoryPie
          data={[
              {

                  x: "Non Specific \n" + (((this.props.nonspecificBehaviorCount/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()) +"%",
                  y: this.props.nonspecificBehaviorCount
              },
              {
                  x: "Specific\n" + (((this.props.specificBehaviorCount/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()) +"%",
                  y: this.props.specificBehaviorCount
              },
              {
                  x: "Disapproval\n" + (((this.props.disapprovalBehaviorCount/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()) + "%",
                  y: this.props.disapprovalBehaviorCount
              },
              {
                  x: "Redirect\n" + (((this.props.redirectionsBehaviorCount/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()) + "%",
                  y: this.props.redirectionsBehaviorCount
              }
          ]}
          colorScale={[
              "#55efc4",
              "#00b894",
              "#d63031",
              "#e17055"
          ]}
          labelRadius={60}
          radius={140}
          style={{
              labels: {
                  fill: "white",
                  fontSize: 16
              }
          }}/>
      <Grid>
      <div class="behavior" style={{marginRight:"10%", marginLeft:"5%", marginTop:"-12%"}}>
        <div class='disapprovals' style={{display: 'inline-block', marginRight:"10%", marginLeft:'5%'}}>
          <div style={{width: '20vw', height: '6vh', fontSize: '1.25em', color: "#d63031", textAlign:'center'}} >BEHAVIOR DISAPPROVALS</div>
          <div style={{width: '20vw', height: '7vh', fontSize: '2em', color: "#d63031", textAlign:'center'}}> {this.props.disapprovalBehaviorCount+this.props.redirectionsBehaviorCount}
           ({(((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()}%)</div>
          <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: "#d63031", color:"#ffffff", fontWeight:'bold'}}>{this.props.disapprovalBehaviorCount} DISAPPROVALS
          ({((this.props.disapprovalBehaviorCount/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()}%)</div>
          <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: "#e17055", color:"#ffffff", fontWeight:'bold'}}>{this.props.redirectionsBehaviorCount} REDIRECTIONS
          ({((this.props.redirectionsBehaviorCount/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()}%)</div>
        </div>
        <div class='approvals' style={{display: 'inline-block'}}>
          <div style={{width: '20vw', height: '6vh', fontSize: '1.25em', color:  '#55efc4', display:'inline-block', textAlign:'center'}}>BEHAVIOR APPROVALS</div>
            <div style={{width: '20vw', height: '7vh', fontSize: '2em', color: '#55efc4', textAlign:'center'}}> {this.props.specificBehaviorCount+this.props.nonspecificBehaviorCount}
            ({(((this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount)/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()}%) </div>
            <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: '#55efc4', color:"#ffffff", fontWeight:'bold'}}>{this.props.nonspecificBehaviorCount} NON SPECIFIC
            ({((this.props.nonspecificBehaviorCount/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()}%)</div>
            <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: '#00b894', color:"#ffffff", fontWeight:'bold'}}>{this.props.specificBehaviorCount} SPECIFIC
            ({((this.props.specificBehaviorCount/((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)+ (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) *100).toFixed()}%)</div>
        </div>
      </div>
      </Grid>
      </div>
    )
    }
  };


  render() {
    return (
      <>
        {this.CustomUI(this.props)}
      </>
        );
    }
}

BehaviorCounterResults.propTypes = {

};
BehaviorCounterResults.contextType = FirebaseContext;
export default withStyles(styles)(BehaviorCounterResults);
