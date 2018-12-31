import React, { Component } from "react";
import Week from "./Week";
import DayNames from "./DayNames";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: this.props.selected.clone(),
      selected: this.props.selected.clone()
    };
  }

  previous = () => {
    var month = this.state.month;
    month.add(-1, "M");
    this.setState({ month: month });
  };

  next = () => {
    var month = this.state.month;
    month.add(1, "M");
    this.setState({ month: month });
  };

  select = day => {
    console.log("DAY is **", day);
    this.setState({ month: day.date });
    this.forceUpdate();
  };

  renderWeeks = () => {
    var weeks = [],
      done = false,
      date = this.state.month
        .clone()
        .startOf("month")
        .add("w" - 1)
        .day("Sunday"),
      monthIndex = date.month(),
      count = 0;

    while (!done) {
      weeks.push(
        <Week
          key={date.toString()}
          date={date.clone()}
          month={this.state.month}
          select={this.select}
          selected={this.props.selected}
        />
      );
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  };

  renderMonthLabel = () => {
    return <span>{this.state.month.format("MMMM, YYYY")}</span>;
  };

  render() {
    return (
      <div>
        <div className="header">
          <i className="fa fa-angle-left" onClick={this.previous} />
          {this.renderMonthLabel()}
          <i className="fa fa-angle-right" onClick={this.next} />
        </div>
        <DayNames />
        {this.renderWeeks()}
      </div>
    );
  }
}
export default Calendar;
