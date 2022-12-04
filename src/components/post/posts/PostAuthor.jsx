import { Link } from "react-router-dom";
import { useTheme } from "@mui/system";
import { formatDistance } from "../../../utils/formatData";
import { stringAvatar } from "../../../utils/avatarPlaceHolder";
import { Avatar, Stack, Typography } from "@mui/material";

const PostAuthor = ({ author, created }) => {

  const theme = useTheme();
  const formattedDate = formatDistance(created);
  const AuthorName = author.name.replaceAll("_", " ");

  return (
    <Link to={`/user/${author.name}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Stack direction="row" gap={1} alignItems="center">
        {author.avatar ? <Avatar src={author.avatar} alt={author.name} /> : <Avatar {...stringAvatar(author.name)} />}
        <Typography fontWeight="bold">{AuthorName}</Typography>
        <Typography variant="body2" fontWeight="bold" component="p"
          sx={{ color: theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600] }}>
          {formattedDate}
        </Typography>
      </Stack>
    </Link>
  )
}

export default PostAuthor;