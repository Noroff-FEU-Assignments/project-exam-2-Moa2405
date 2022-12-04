import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/system";
import { stringAvatar } from "../../utils/avatarPlaceHolder";

const ProfileMedia = ({ media, name }) => {

  const [banner, setBanner] = useState();
  const [avatar, setAvatar] = useState()

  const theme = useTheme();

  const checkIfMediaIsImage = (media) => {
    if (media.banner) {
      const isImage = media.banner.match(/^(http|https):\/\/[^ "]+$/);
      if (isImage) {
        setBanner(true);
      } else {
        setBanner(false);
      }
    }

    if (media.avatar) {
      const isImage = media.avatar.match(/^(http|https):\/\/[^ "]+$/);
      if (isImage) {
        setAvatar(true);
      } else {
        setAvatar(false);
      }
    }
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      checkIfMediaIsImage(media);
    }

    return () => mounted = false

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media]);

  const avatarBorder = theme.palette.mode === "dark" ? "2px solid #000000" : "2px solid #FFFFFF";

  return (
    <>
      <div style={{ width: "100%", maxHeight: "300px", position: "relative", aspectRatio: "3/1" }}>
        {banner ? <div style={{ height: "100%", width: "100%" }}>
          <img src={media.banner} alt="Profile banner" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        </div>
          : <div style={{ height: "100%", width: "100%" }}>
            <img src="/placeholder.png" alt="Placeholder banner" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
        }
        <div style={{ position: "absolute", bottom: "-30px", left: "30px", width: "20%", aspectRatio: "1/1" }}>
          {avatar ? <Avatar alt="profile" src={media.avatar} sx={{ width: "100%", height: "100%", border: avatarBorder }} />
            : <Avatar {...stringAvatar(name)} sx={{ width: "100%", height: "100%", fontSize: "34px", fontWeight: "bold", border: avatarBorder }} />
          }
        </div>
      </div>
    </>
  );
}

export default ProfileMedia;