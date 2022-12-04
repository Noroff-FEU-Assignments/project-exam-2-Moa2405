import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system"

const Logo = () => {

  const theme = useTheme();

  return (
    <Stack spacing={1} direction="row" alignItems="center" width="100%" justifyContent="center" height="50px">
      <Box>
        <img src="/logo-primary.svg" alt="logo" height="50px" width="50px" />
      </Box>
      <Stack direction="column" justifyContent="space-between">
        <Stack sx={{ mt: "-5px" }} direction="row">
          <Typography variant="h4" component="span" color={theme.palette.primary.main}>
            Mega
          </Typography>
          <Typography variant="h4" component="span" color={theme.palette.grey[500]}>
            Phone
          </Typography>
        </Stack>
        <Typography sx={{ mt: "-5px" }} component="span" variant="body2" color={theme.palette.grey[500]}>
          Social media app
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Logo;