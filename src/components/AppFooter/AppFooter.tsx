import {Box, Container} from "@mui/material";
import ftLogoLight from "@legion-hq/assets/ftLogoLight.png";
import ftLogoDark from "@legion-hq/assets/ftLogoDark.png";
import {useSettings} from "@legion-hq/hooks/app/useSettings";

export function AppFooter() {
  const {themeMode} = useSettings();

  return (
    <Container
      maxWidth="lg"
      sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
    >
      <Box>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://thefifthtrooper.com/"
          style={{
            width: 150,
            height: "auto",
          }}
        >
          <img
            alt="Fifth Trooper Logo"
            src={themeMode === "light" ? ftLogoLight : ftLogoDark}
            style={{width: "inherit", height: "inherit"}}
          />
        </a>
      </Box>
    </Container>
  );
}
