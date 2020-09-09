import * as React from "react";
import { IInterval } from "../../IntervalItem";
import { Form } from "react-bootstrap";
import { Field } from "formik";


interface IInputProps {
  className?: string;
  interval: IInterval;
  field: string;
  label: string;
}

const Input: React.FunctionComponent<IInputProps> = ({className, interval, field, label}) => {
  return (
    <Form.Row>
      <Form.Label htmlFor={`${field}-${interval.id}`} className={className ?? ''}>
        {label}
      </Form.Label>
      <Field
        className="form-control col-md-8"
        id={`${field}-${interval.id}`}
        name={field}
      />
    </Form.Row>
  );
};

export default Input;
