import * as React from "react";
import { IInterval } from "./IntervalItem";
import moment from "moment";
import { Button } from "react-bootstrap";
import {FaPlusSquare} from "react-icons/fa";

interface IIntervalListProps {
}

const IntervalList: React.FunctionComponent<IIntervalListProps> = ({children}) => {
  return (
    <>
      <ol>
        { children}
      </ol>
    </>
  );
};

export default IntervalList;
