import {PageColumn} from "@legion-hq/components/PageLayout";
import {Box, Container, Paper, Typography} from "@mui/material";

function Info() {
  return (
    <Container maxWidth="sm">
      <PageColumn>
        <Paper
          elevation={3}
          square={false}
          sx={{alignSelf: "stretch", px: 1, py: 3, textAlign: "center"}}
        >
          <Typography>
            Questions, comments, or concerns can be sent to{" "}
            <a
              href="mailto:contact@legion-hq.com"
              style={{textDecoration: "none", color: "lightblue"}}
            >
              contact@legion-hq.com
            </a>
            .
          </Typography>
          <Typography>
            All game images, character names, and game pieces are © FFG & © Disney.
          </Typography>
        </Paper>
        <Paper elevation={3} square={false} sx={{alignSelf: "stretch", px: 1, py: 3}}>
          <Box
            display="flex"
            flexDirection="column"
            rowGap={2}
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Want to Donate?</Typography>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Cookie"
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="bmc-button"
              href="https://www.buymeacoffee.com/TY5SLhK"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                alt="Buy me a coffee"
              />
              <span style={{marginLeft: "5px", fontSize: "28px !important"}}>
                Buy me a coffee
              </span>
            </a>
          </Box>
        </Paper>
      </PageColumn>
    </Container>
  );
}

export default Info;
