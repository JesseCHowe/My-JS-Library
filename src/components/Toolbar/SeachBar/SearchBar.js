import React, { Component } from "react";
import Input from "../../UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class SearchBar extends Component {
  onSeachHandler = e => {
    this.props.onEnterSearch(e.target.value);
  };

  render() {
    return (
      <Input
        label="Search"
        inputType="Search"
        changed={e => this.onSeachHandler(e)}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEnterSearch: searchField =>
      dispatch(actions.enterSearchField(searchField))
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
