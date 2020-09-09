import * as React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { IFilter } from "../../FilterBar";
import style from "./PriorityDropdown.module.scss";
import { useFormikContext } from "formik";

export enum Priority {
  low = "Low",
  normal = "Normal",
  high = "High",
}

interface IPriorityDropdownProps {
  includeAll?: boolean;
  className?: string;
}

const PriorityDropdown: React.FunctionComponent<IPriorityDropdownProps> = ({
  includeAll, className
}) => {
  const { values, setFieldValue } = useFormikContext<IFilter>();
  return (
    <DropdownButton
      title={values.priority ?? "All Priorities"}
      className={[style.dropdown, className ?? ''].join(" ")}
      onSelect={(priority) => setFieldValue("priority", priority)}
    >
      {Object.values(Priority).map((priorityKey) => (
        <Dropdown.Item eventKey={priorityKey} key={priorityKey}>
          {priorityKey}
        </Dropdown.Item>
      ))}
      {includeAll && (
        <Dropdown.Item
          key="all"
          onClick={(e) => {
            e.stopPropagation();
            setFieldValue("priority", undefined);
          }}
        >
          All
        </Dropdown.Item>
      )}
    </DropdownButton>
  );
};

export default PriorityDropdown;
