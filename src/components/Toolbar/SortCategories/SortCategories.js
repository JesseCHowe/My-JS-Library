import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Button from "../../UI/Button/Button";

class SortCategories extends Component {
  onSortHandler = method => {
    this.props.onSort(method);
  };

  render() {
    const sort = ["Alphabetical", "completion", "length"];

    return (
      <div>
        <p>SORT BY</p>
        {sort.map(item => {
          return (
            <Button btnType="Sort" clicked={() => this.onSortHandler(item)}>
              {item}
            </Button>
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSort: method => dispatch(actions.chooseSortMethod(method))
  };
};

export default connect(null, mapDispatchToProps)(SortCategories);
