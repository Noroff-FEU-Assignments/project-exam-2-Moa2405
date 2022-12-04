import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/system";

const Tags = ({ tags }) => {

  const theme = useTheme()
  const filteredTags = tags.filter((tag) => tag !== "");

  const tagsWithHash = filteredTags.map((tag) => {
    if (tag.charAt(0) !== "#") {
      return "#" + tag;
    }
    return tag;
  });

  const color = theme.palette.mode === "dark" ? "primary" : "contrastText";

  return (
    <Stack spacing={1} direction="row">
      {tagsWithHash.map((tag, index) => (
        <Typography key={index} color={color} variant="body2">
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