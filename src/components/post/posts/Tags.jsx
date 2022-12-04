import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Tags = ({ tags }) => {

  const filteredTags = tags.filter((tag) => tag !== "");

  return (
    <Stack spacing={1} direction="row">
      {filteredTags.map((tag, index) => (
        <Typography key={index} color="primary" variant="body2">
          {tag}
        </Typography>
      ))}
    </Stack>
  );
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired
};

export default Tags;