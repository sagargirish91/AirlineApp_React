import React, {Component} from "react";

import flightData from "../../data/flightData";

class InFlight extends Component {
    constructor(){
        super()
        this.state = {
            flights: flightData,
            isFlightSelected: false,
            selectedFlight: "",
            showSeatDetails: false
        }
        this.changeSelectedFlight = this.changeSelectedFlight.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    renderSeatDetails(){
        return(
            <div>
                <table id="flights">
                    {this.renderSeatTableHeader()}
                    {this.renderSeatDataTable()}
                </table>
                <br />
                <br />
                <h3>Legend: </h3>
                <p style={{color: "green"}}>Special Meals</p>
            </div>
        )
    }


renderSeatTableHeader(){
    return(
        <div>
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

              <td>{seat.seatNum}</td>
              <td>{seat.isAvailable}</td>
              <td>{seat.passengerData[0].name}</td>
              <td>{seat.passengerData[0].gender}</td>
              <td>{seat.passengerData[0].wheelChairRequired}</td>
              <td>{seat.passengerData[0].isInfant}</td>
              <td>{seat.passengerData[0].ancillaryServices}</td>
              <td>{seat.passengerData[0].isCheckedIn}</td>
              
              <button style={{display: seat.isAvailable==="no"?"hidden":"none", width: "100px"}}
              value={seat.seatNum}
              onClick={this.handleClick}>
                  Change Meals Preference
              </button>

            </tr>
            ))}
        </tbody>
    )
}

handleClick(event){
    const {name, value} = event.target
    const currentFlight=this.state.selectedFlight;

    if(currentFlight.seatData[value-1].passengerData[0].meals==="Normal Meals"){
        currentFlight.seatData[value-1].passengerData[0].meals="Special Meals";
    }
    else if(currentFlight.seatData[value-1].passengerData[0].meals==="Special Meals"){
        currentFlight.seatData[value-1].passengerData[0].meals="Normal Meals";
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
    {this.state.showSeatDetails && <div>{this.renderSeatDetails()}</div>}
        </div>
    )
}

}

export default InFlight