import React, { Component } from "react";
import Week from "./Week";
import DayNames from "./DayNames";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: this.props.selected.clone()
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
          selected={this.state.month}
        />
      );
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  };

  onMonthChange = (event) => {
    event.persist();
    let currentMonth = this.state.month;
    let diff = +event.target.value - currentMonth.month()
    currentMonth.add(diff, "M");
    this.setState({ month: currentMonth });
  }

  onYearChange = (event) => {
    event.persist();
    let currentMonth = this.state.month;
    let diff = +event.target.value - currentMonth.year()
    currentMonth.add(diff, "Y");
    this.setState({ month: currentMonth });
  }

  renderMonthLabel = () => {
    // return <span>{this.state.month.format("MMMM, YYYY")}</span>;
   const months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];

    let currentMonth = this.state.month;
    return (<span><select value={currentMonth.month()} onChange={this.onMonthChange}>
      {months.map((value, index) => {
        return(<option key={index} value={index}>{value}</option>);
      })}
    </select></span>);
  };

  renderYearsLabel = () => {
    let currentMonth = this.state.month;
    let years = [];
    let pivot = 1980;
    while (pivot < 2050) {
      years.push(pivot);
      pivot++;
    }

    return (<span><select value={currentMonth.year()} onChange={this.onYearChange}>
      {years.map((year, index) => {
        return (<option key={index} value={year}>{year}</option>);
      })}
    </select></span>);
  };

  render() {
    return (
      <div>
        <div className="header">
          <i className="fa fa-angle-left" onClick={this.previous} />
          {this.renderMonthLabel()}
          {this.renderYearsLabel()}
          <i className="fa fa-angle-right" onClick={this.next} />
        </div>
        <DayNames />
        {this.renderWeeks()}
      </div>
    );
  }
}
export default Calendar;
