import * as React from "react";
import { Card, Button, ButtonGroup, Form as BSForm } from "react-bootstrap";
import { Moment } from "moment";
import useClock from "./hooks/useClock";
import styles from "./IntervalItem.module.scss";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import FormikDatePicker from "./components/fields/FormikDatePicker";
import { FaTrash, FaCheck } from "react-icons/fa";
import moment from "moment";
import PriorityDropdown from "./components/fields/PriorityDropdown";
import Input from "./components/fields/Input";

export interface IInterval {
  lastUpdate: Moment;
  name: string;
  id?: string;
  duration?: number;
  priority?: string;
}

interface IListItemProps {
  interval: IInterval;
  onRemove: (interval: IInterval) => void;
  onSave: (interval: IInterval) => void;
  onClick: (interval: IInterval) => void;
  editing: boolean;
}

const ListItem: React.FunctionComponent<IListItemProps> = ({
  interval,
  onRemove,
  onSave,
  onClick,
  editing,
}) => {
  const clock = useClock();
  const ref = React.useRef<any>();
  React.useEffect(() => {
    ref?.current?.focus();
  }, [editing]);

  return (
    <Formik
      initialValues={interval}
      enableReinitialize={true}
      onSubmit={(values) => {
        onSave(values);
      }}
    >
      {(formikProps: any) => (
        <Card
          key={interval.name}
          className={styles.IntervalItem}
          onClick={(e: any) => onClick(interval)}
        >
          <Card.Title>
            <Field
              className="form-control"
              id={`name-${interval.id}`}
              name="name"
              disabled={!editing}
              placeholder="Enter a name"
              innerRef={ref}
              style={{fontWeight: 700}}
            />
            <ButtonGroup className={styles.btnGroup}>
              {editing ? (
                <Button
                  variant="warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    formikProps.submitForm();
                  }}
                >
                  Save
                </Button>
              ) : (
                <>
                  <Button
                    variant="success"
                    onClick={(e) => {
                      e.stopPropagation();
                      formikProps.setFieldValue("lastUpdate", moment());
                      formikProps.submitForm();
                    }}
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(interval);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Card.Title>
          {editing ? (
            <BSForm.Group className={styles.DateGroup}>
              <BSForm.Row>
                <BSForm.Label
                  htmlFor={`lastUpdate-${interval.id}`}
                  className="col-md-4"
                >
                  Start Date
                </BSForm.Label>
                <FormikDatePicker
                  id={`lastUpdate-${interval.id}`}
                  field="lastUpdate"
                  formikProps={formikProps}
                  className="form-control col-md-8"
                />
              </BSForm.Row>
              <Input
                interval={interval}
                className="col-md-4"
                field="duration"
                label="Interval (in Days)"
              />
              <BSForm.Row>
                <BSForm.Label
                  htmlFor={`priority-${interval.id}`}
                  className="col-md-4"
                >
                  Task Priority
                </BSForm.Label>
                <PriorityDropdown className="col-md-8" />
              </BSForm.Row>
            </BSForm.Group>
          ) : (
            <>
              <div className={styles.times}>
                <Card.Text>
                  <strong>Last Updated:&nbsp;</strong>{interval.lastUpdate.from(clock)}
                </Card.Text>
                {interval.duration !== undefined ? (
                  <Card.Text>
                    <strong>Due:&nbsp;</strong>
                    {moment(interval.lastUpdate)
                      .add(+interval.duration, "days")
                      .from(clock)}
                  </Card.Text>
                ) : null}
              </div>
                    {interval?.priority !== undefined && <Card.Text><strong>Priority:&nbsp;</strong> {interval.priority}</Card.Text>}
            </>
          )}
        </Card>
      )}
    </Formik>
  );
};

export default ListItem;
