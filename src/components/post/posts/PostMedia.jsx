import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";


const PostMedia = ({ media }) => {

  //need to filter out the media that is not an image

  if (media) {
    const isImage = media.match(/^(http|https):\/\/[^ "]+$/);
    if (isImage) {
      return (
        <>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <LazyLoadImage alt="post" src={media} style={{ objectFit: "cover", maxWidth: "100%", maxHeight: "400px" }} />
          </Box>
        </>
      );
    }
    return
  }
}

PostMedia.propTypes = {
  media: PropTypes.string,
};

export default PostMedia;