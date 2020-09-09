import * as React from "react";
import { Formik, Form } from "formik";
import {
  Form as BSForm,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { IInterval } from "./IntervalItem";
import { FaPlusSquare } from "react-icons/fa";
import moment from "moment";
import style from "./FilterBar.module.scss";
import { Dispatch } from "react";
import _ from "lodash";
import PriorityDropdown, { Priority } from "./components/fields/PriorityDropdown";

interface IFilterBarProps {
  onAdd: (interval: IInterval) => void;
  setFilter: Dispatch<React.SetStateAction<IFilter>>;
}

export interface IFilter {
  toggleButton?: string;
  priority?: Priority;
}

export const initialFilter: IFilter = {
  toggleButton: "dueDate",
  priority: undefined,
};

export const filterFn = (intervals: IInterval[], filter?: IFilter) => {
  let filteredIntervals: IInterval[] = [...intervals];
  if (filter?.priority) {
    filteredIntervals = _.filter(intervals, {
      priority: filter.priority,
    }) as IInterval[];
  }

  switch (filter?.toggleButton) {
    case "dueDate":
      return _.orderBy(
        filteredIntervals,
        (interval) => {
          return moment(interval.lastUpdate)
            .add(interval.duration, "days")
            .valueOf();
        }
      );
    case "lastUpdated":
      return _.orderBy(
        filteredIntervals,
        (interval) => {
          return moment(interval.lastUpdate).valueOf();
        }, "desc"
      );
    case "name":
      return _.orderBy(filteredIntervals, "name");
    default:
      return filteredIntervals;
  }
};

const FilterBar: React.FunctionComponent<IFilterBarProps> = ({
  onAdd,
  setFilter,
}) => {
  return (
    <Formik
      initialValues={initialFilter}
      onSubmit={() => {}}
      validate={(values: IFilter) => {
        setFilter(values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className={style.FilterBar}>
          <div className={style.orders}>
            <BSForm.Label>Sort By</BSForm.Label>
            <ButtonGroup className={style.buttons}>
              <Button
                variant="secondary"
                onClick={() => setFieldValue("toggleButton", "dueDate")}
                active={values.toggleButton === "dueDate"}
              >
                Due Date
              </Button>
              <Button
                variant="secondary"
                onClick={() => setFieldValue("toggleButton", "lastUpdated")}
                active={values.toggleButton === "lastUpdated"}
              >
                Last Updated
              </Button>
              <Button
                variant="secondary"
                onClick={() => setFieldValue("toggleButton", "name")}
                active={values.toggleButton === "name"}
              >
                Name
              </Button>
            </ButtonGroup>
          </div>
          <div className={style.filters}>
            <BSForm.Label>Filter By</BSForm.Label>
            <PriorityDropdown includeAll={true} />
          </div>
          <Button onClick={() => onAdd({ name: "", lastUpdate: moment() })}>
            <FaPlusSquare size={24} />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterBar;
