import React, { useState, useEffect } from "react";
import "./App.css";
import IntervalList from "./IntervalList";
import IntervalItem, { IInterval } from "./IntervalItem";
import { Moment } from "moment";
import _ from "lodash";
import useApi from "./hooks/useApi";
import "react-datepicker/dist/react-datepicker.css";
import { Spinner, Button } from "react-bootstrap";
import moment from "moment";
import { FaPlusSquare } from "react-icons/fa";
import FilterBar, { IFilter, filterFn, initialFilter } from "./FilterBar";

function App() {
  const {
    addInterval,
    deleteInterval,
    getIntervals,
    updateInterval,
  } = useApi();
  const [mAddInterval] = addInterval;
  const [mDeleteInterval] = deleteInterval;
  const [mUpdateInterval] = updateInterval;
  const { data, isLoading } = getIntervals;
  const [filter, setFilter] = useState<IFilter>(initialFilter );
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const onAdd = (interval: IInterval) => {
    mAddInterval(interval).then((response) => {
      setEditId(response?.data.name);
    });
  };

  const onRemove = (interval: IInterval) => {
    mDeleteInterval(interval);
  };

  const onSave = (interval: IInterval) => {
    mUpdateInterval(interval).then(() => setEditId(undefined));
  };

  const onClick = (interval: IInterval) => {
    setEditId(interval.id);
  };

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="App">
      <IntervalList>
      <FilterBar onAdd={onAdd} setFilter={setFilter}/>
        {data ? (
          filterFn(data, filter).map((i: IInterval) => {
            return <IntervalItem
              key={i.id}
              onRemove={onRemove}
              onSave={onSave}
              interval={i}
              onClick={onClick}
              editing={i.id === editId}
            />;
          })
        ) : (
          <p>Add an Interval to get started!</p>
        )}
      </IntervalList>
    </div>
  );
}

export default App;
