import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadDataAction } from "../redux/actions/loadDataAction";
import FilterBlock from "./FilterBlock/FilterBlock";
import TicketList from "./TicketsList/TicketList";
import Logo from "../assets/img/logo.png";
import "./App.css";
import AirlineStaff from "./AirlineStaff";


class App extends Component {
  componentDidMount() {
    const { loadData } = this.props;
    loadData();
  }

  render() {
    return (
      <div className="App">
        <img src={Logo} alt="" className="logo" />
        <div className="container">
          <AirlineStaff />
          
          <TicketList />
          <FilterBlock />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  loadData: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  loadData: loadDataAction
};

export default connect(null, mapDispatchToProps)(App);
