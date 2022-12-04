import { Typography, Stack, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "../../../utils/formatData";

const PostAuthor = ({ author, created }) => {

  const [avatar, setAvatar] = useState(null)
  const postCreated = formatDistance(created);

  useEffect(() => {
    let mounted = true
    if (mounted && author.avatar === "") {
      setAvatar(false);
    } else {
      setAvatar(true);
    }

    return () => {
      mounted = false;
    }
  }, [author]);


  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {avatar && <Avatar src={author.avatar} />}
      <Link to={`/user/${author.name}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography fontWeight="bold">{author.name.replace("_", " ")}</Typography>
      </Link>
      <Typography color="textSecondary" variant="body2">{postCreated}</Typography>
    </Stack>
  );
}

export default PostAuthor;