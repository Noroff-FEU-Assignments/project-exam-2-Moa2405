import { Typography, Stack, IconButton, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Logo from "../../components/Logo";
import { useTheme } from "@mui/system";

const FourOFour = () => {

  const navigate = useNavigate();
  const theme = useTheme();

  const mutedText = theme.palette.text.disabled;

  return (

    <Stack align="center" sx={{ px: "17px", margin: "4rem auto", height: "100vh", maxWidth: "700px" }} spacing={2} alignItems="center">
      <Logo />
      <Typography variant="h1" sx={{ color: mutedText }} fontWeight="bold" component="h1">
        404
      </Typography>
      <Typography variant="h5" fontWeight="bold" component="h2">
        Page not found
      </Typography>
      <Box sx={{ maxWidth: 450 }}>
        <Typography variant="body1" color="textSecondary" component="p">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
      </Box>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" color="textSecondary" component="p">
            Go home
          </Typography>
          <IconButton onClick={() => navigate("/")}>
            <HomeOutlinedIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" color="textSecondary" component="p">
            Or go back
          </Typography>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default FourOFour;