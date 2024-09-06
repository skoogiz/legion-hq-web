import {Typography} from "@mui/material";
import {KeywordChip} from "./KeywordChip";

type Props = {
  keywords: string[];
  size?: "small" | "medium";
};

export function KeywordChips({keywords, size = "medium"}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
      }}
    >
      <Typography variant="body2" color="textSecondary" style={{marginRight: 4}}>
        Keywords
      </Typography>
      <div style={{flexGrow: 1}} />
      {keywords.map((keyword) => (
        <div key={keyword} style={{marginRight: 2, marginBottom: 2}}>
          <KeywordChip keyword={keyword} size={size} />
        </div>
      ))}
    </div>
  );
}
