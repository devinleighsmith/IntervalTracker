import { IInterval } from "../IntervalItem";
import axios from "axios";
import moment from "moment";
import { useQuery, useMutation, queryCache } from "react-query";

export enum apiOps {
  CREATE_INTERVAL,
  DELETE_INTERVAL,
  GET_INTERVALS,
}

const useApi = () => {
  const invalidateOnSuccess = {
    onSuccess: () => {
      queryCache.invalidateQueries(apiOps.GET_INTERVALS);
    },
  };

  const addIntervalFn = (interval: IInterval) => {
    return axios.post(
      "https://intervaltracker.firebaseio.com/intervals.json",
      interval
    );
  };
  const addInterval = useMutation(addIntervalFn, invalidateOnSuccess);

  const updateIntervalFn = (interval: IInterval) => {
    return axios.put(
      `https://intervaltracker.firebaseio.com/intervals/${interval.id}.json`,
      interval
    );
  };
  const updateInterval = useMutation(updateIntervalFn, invalidateOnSuccess);

  const deleteIntervalFn = (interval: IInterval) => {
    return axios.delete(
      `https://intervaltracker.firebaseio.com/intervals/${interval.id}.json`
    );
  };
  const deleteInterval = useMutation(deleteIntervalFn, invalidateOnSuccess);

  const getIntervalsFn = () => {
    return axios
      .get("https://intervaltracker.firebaseio.com/intervals.json")
      .then((response) => {
        if (!response.data) {
          return [];
        }
        return Promise.resolve(
          Object.keys(response.data).map(
            (key): IInterval => {
              const interval: IInterval = response.data[key];
              return {
                ...interval,
                id: key,
                lastUpdate: moment(interval.lastUpdate),
              };
            }
          )
        );
      });
  };
  const getIntervals = useQuery(apiOps.GET_INTERVALS, getIntervalsFn, {
    staleTime: 60000,
  });

  return { addInterval, deleteInterval, getIntervals, updateInterval };
};

export default useApi;
