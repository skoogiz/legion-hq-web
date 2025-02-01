import {Typography, Box, styled} from "@mui/material";
import {useNews} from "@legion-hq/data-access/hooks/useNews";
import {NewsPost} from "@legion-hq/types/news";

const Pill = styled("span")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.68rem",
  fontWeight: 700,
  backgroundColor: theme.palette.info.main,
  padding: "0 0.36rem",
  letterSpacing: "0.06em",
  lineHeight: 1.0,
  borderRadius: "4px",
  height: "1rem",
}));

function Post({post: {title}}: {post: NewsPost}) {
  return (
    <div style={{display: "flex", columnGap: "0.5rem", alignItems: "center"}}>
      <Pill>NEW</Pill>
      <Typography variant="subtitle2">{title}</Typography>
    </div>
  );
}

export function LatestNews() {
  const {newsPosts} = useNews();
  return (
    <Box display="flex" flexDirection="column" rowGap={1} alignItems="center" py={1}>
      {(newsPosts.length > 3 ? newsPosts.slice(0, 3) : newsPosts).map(
        (newsPost, index) => (
          <Post key={`news_${index}`} post={newsPost} />
        ),
      )}
    </Box>
  );
}
