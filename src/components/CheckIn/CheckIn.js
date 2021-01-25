import React, {Component} from "react";

import flightData from "../../data/flightData";

class CheckIn extends Component {
    constructor(){
        super()
        this.state = {
            flights: flightData,
            isFlightSelected: false,
            selectedFlight: "",
            showSeatDetails: false
        }
        this.changeSelectedFlight = this.changeSelectedFlight.bind(this);
        this.displaySeatDetails = this.displaySeatDetails.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    changeSelectedFlight(event){
        const {name, value} = event.target;
        if(value==="selected"){
            return;
        }
        let currentFlight;
        for(var i=0; i<this.state.flights.length;i++){
            if(this.state.flights[i].flightId===value){
                currentFlight=this.state.flights[i];
            }
        }

        this.setState({
            isFlightSelected: true,
            selectedFlight: currentFlight,
            showSeatDetails: false
        })
    }

    renderFlightTable(){
        return(
            <div>
                <table id="flights">
                    <tbody>
                        {this.renderFlightTableHeader()}
                        {this.renderFlightDataTable()}
                    </tbody>
                </table>
                <br />
                <button onClick={this.displaySeatDetails}>Show Seat Details</button>
            </div>
        )
    }

    renderFlightTableHeader(){
        return(
            <tr>
                <th>Flight ID</th>
                <th>Scheduled Time</th>
            </tr>
        )
    }

    renderFlightDataTable(){
        return(
            <tr key={this.state.selectedFlight.flightId}>
                <td>{this.state.selectedFlight.flightId}</td>
                <td>{this.state.selectedFlight.scheduledTime}</td>
            </tr>
        )
    }

    displaySeatDetails(){
        this.setState({
            showSeatDetails: true
        })
    }

    renderSeatDetails(){
        return(
            <div>
                <label>Sort Table: </label>
                <select onChange={this.handleSort}>
                    <option value="All">Show All</option>
                    <option value="Checked-In">Show Checked-In Passengers</option>
                    <option value="Checked-Out">Show Checked-Out Passengers</option>
                    <option value="Wheelchair">Show Wheelchair Passengers</option>
                    <option value="Infant">Show Infant Passengers</option>
                </select>
                <br />
                <br />
                <table id="flights">
                    {this.renderSeatTableHeader()}
                    {this.renderSeatDataTable()}
                </table>
                <br />
                <br />
                <h3>Legend: </h3>
                <p style={{color: "grey"}}>Wheelchair Required</p>
                <p style={{color: "pink"}}>Wheelchair Required</p>
                <p style={{color: "green"}}>Passenger Checked</p>
            </div>
        )
    }

    handleSort(event){
        const {name, value} = event.target
        this.displayAllData();

        if(value==="All"){
            this.displayAllData();
        }else if(value==='Checked-In'){
            this.displayCheckedIn();
        }else if(value==='Checked-Out'){
            this.displayCheckedOut();
        }else if(value==='WheelChair'){
            this.displayWheelChair();
        }else if(value==='Infant'){
            this.displayInfant();
    }
}

displayAllData(){
    var flight=this.state.selectedFlight;
    for(var i=0; i<flight.seatData.length; i++){
        flight.seatData[i].isDisplayed=true;
    }
    this.setState({
        selectedFlight: flight
    })
}

displayCheckedIn(){
    var flight=this.state.selectedFlight;
    const seatData=this.state.selectedFlight.seatData;
    var index=0;
    for(var i=0; i<seatData.length; i++){
        if(seatData[i].passengerData[0].isCheckedIn==="no"){
            flight.seatData[i].isDisplayed=false;
        }
    }
    this.setState({
        selectedFlight: flight
    })
}

displayCheckedOut(){
    var flight=this.state.selectedFlight;
    const seatData=this.state.selectedFlight.seatData;
    var index=0;
    for(var i=0; i<seatData.length; i++){
        if(seatData[i].passengerData[0].isCheckedIn==="yes"){
            flight.seatData[i].isDisplayed=false;
        }
    }
    this.setState({
        selectedFlight:flight
    })
}

displayWheelChair(){
    var flight=this.state.selectedFlight;
    const seatData=this.state.selectedFlight.seatData;
    var index=0;
    for(var i=0; i<seatData.length; i++){
        if(seatData[i].passengerData[0].wheelChairRequired==="no"){
            flight.seatData[i].isDisplayed=false;
        }
    }
    this.setState({
        selectedFlight:flight
    })
}

displayInfant(){
    var flight=this.state.selectedFlight;
    const seatData=this.state.selectedFlight.seatData;
    var index=0;
    for(var i=0; i<seatData.length; i++){
        if(seatData[i].passengerData[0].isInfant==="no"){
            flight.seatData[i].isDisplayed=false;
        }
    }
    this.setState({
        selectedFlight:flight
    })
}

renderSeatTableHeader(){
    return(
        <div>
        <div className="container">       
          <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th>Seat Number</th>
                    <th>Is Booked</th>
                    <th>Passenger Name</th>
                    <th>Gender</th>
                    <th>Requires Wheelchair?</th>
                    <th>Is Infant?</th>
                    <th>Ancillary Services</th>
                    <th>Checked In?</th>
                    <th>Action</th>
                </tr>
            </thead>
            </table>
            </div>
        </div>
    )
}

renderSeatDataTable(){
    return(
        <tbody>
            {this.state.selectedFlight.seatData.map((seat, index) =>(
                <tr key={index} style={{backgroundColor: seat.passengerData[0].wheelChairRequired==="yes" ? "grey":
                seat.passengerData[0].isInfant==="yes"?"pink":
                seat.passengerData[0].isCheckedIn==="yes"?"green":"white",
                alignItems: "center",
                display: !seat.isDisplayed?"none":""
            }}>

<div className="container">
          
  <table className="table table-dark table-hover">
    <tr><td>{seat.seatNum}</td>
              <td>{seat.isAvailable}</td>
              <td>{seat.passengerData[0].name}</td>
              <td>{seat.passengerData[0].gender}</td>
              <td>{seat.passengerData[0].wheelChairRequired}</td>
              <td>{seat.passengerData[0].isInfant}</td>
              <td>{seat.passengerData[0].ancillaryServices}</td>
              <td>{seat.passengerData[0].isCheckedIn}</td></tr></table></div>
              
              <button style={{display: seat.isAvailable==="no"?"hidden":"none", width: "100px"}}
              value={seat.seatNum}
              onClick={this.handleClick}>
                  {seat.passengerData[0].isCheckedIn==="yes"?"Check-Out":"Check-In"}
              </button>

            </tr>
            ))}
        </tbody>
    )
}

handleClick(event){
    const {name, value} = event.target
    const currentFlight=this.state.selectedFlight;

    console.log(currentFlight.seatData[0]);


    if(currentFlight.seatData[0].passengerData[0].isCheckedIn==="Yes"){
        currentFlight.seatData[0].passengerData[0].isCheckedIn="No";
    }
    else if(currentFlight.seatData[0].passengerData[0].isCheckedIn==="No"){
        currentFlight.seatData[0].passengerData[0].isCheckedIn="Yes";
    }
    this.setState({
       selectedFlight: currentFlight
    }
    )
}

render(){
    return(
        <div className="new-tab">
            <select onChange={this.changeSelectedFlight}>
    {this.state.flights.map(flight => <option key ={flight.flightId}>{flight.flightId}</option>)}
            </select>
            <br />
            <br />
    {this.state.isFlightSelected && <div>{this.renderFlightTable()}</div>}
    <br />
    <br />
    {this.state.showSeatDetails && <div>{this.renderSeatDetails()}</div>}
        </div>
    )
}

}

export default CheckIn