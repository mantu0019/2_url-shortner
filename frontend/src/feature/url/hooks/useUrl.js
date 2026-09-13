import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnalyticsUser,
  getShortUrlUser,
  urlCreateUser,
} from "../state/urlAction";

const useUrl = () => {
  const { isLoading, urlData, error,analyticsData} = useSelector((state) => state.URL);
  const dispatch = useDispatch();

  const urlCreateByUser = useCallback(
    (data) => {
      return dispatch(urlCreateUser(data)).unwrap();
    },
    [dispatch],
  );

  const getShortUrlByUser = useCallback(
    (data) => {
      return dispatch(getShortUrlUser(data)).unwrap();
    },
    [dispatch],
  );

  const getAnalyticsUserByUser = useCallback(
    (data) => {
      return dispatch(getAnalyticsUser(data)).unwrap();
    },
    [dispatch],
  );

  return {
    isLoading,
    urlData,
    error,
    getAnalyticsUserByUser,
    getShortUrlByUser,
    urlCreateByUser,
    analyticsData
  };
};

export default useUrl;
