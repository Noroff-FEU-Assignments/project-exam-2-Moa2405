import PropTypes from "prop-types";
import { useState } from 'react';
import { useTheme } from "@mui/system";
import { useAuth } from '../../../context/authContext'
import { IconButton, Menu } from '@mui/material/';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Follow from '../../profile/FollowOnPost';
import UnFollow from '../../profile/UnFollowOnPost';
import EditPost from '../editPost/EditPost';
import DeletePost from '../deletePost/DeletePost';

const ITEM_HEIGHT = 48;

const PostOptionBtn = ({ post }) => {

  const { user } = useAuth();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [ownsThePost, setOwnsThePost] = useState(null);
  //see if to display follow or unfollow on button
  const [follows, setFollow] = useState(null);
  const handleSetFollows = (value) => {
    value === "following" ? setFollow(true) : setFollow(false);
  }

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);

    //if user owns the post, display edit post and delete post
    if (user.name === post.author.name) {
      return setOwnsThePost(true);
    }

    //if the user.following array includes the author.name
    //if it does, display unfollow
    //if it doesn't, display follow

    //check if post.author.name is in user.following.name array
    const isFollowing = user.following.find(following => following.name === post.author.name);
    isFollowing ? setFollow(true) : setFollow(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const OwnerOfPostOrNot = () => {
    if (ownsThePost) {
      return (
        <>
          <EditPost closeMenu={handleClose} post={post} />
          <DeletePost closeMenu={handleClose} post={post} />
        </>
      )
    }
    else {
      return (
        <>
          {!follows ?
            <Follow post={post} closeMenu={handleClose} setFollows={handleSetFollows} />
            :
            <UnFollow post={post} closeMenu={handleClose} setFollows={handleSetFollows} />
          }
        </>
      )
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHoriz sx={{ color: theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600] }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <OwnerOfPostOrNot />
      </Menu>
    </div>
  );
}

PostOptionBtn.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostOptionBtn;