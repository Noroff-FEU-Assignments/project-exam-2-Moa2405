import { formatDistanceToNow, parseISO } from "date-fns";
import PropTypes from "prop-types";

export const formatDistance = (date) => {
  return formatDistanceToNow(parseISO(date));
}

formatDistance.propTypes = {
  date: PropTypes.string.isRequired,
};


