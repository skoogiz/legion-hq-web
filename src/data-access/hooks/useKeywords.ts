import keywords from "@legion-hq/data/2.5.3/keywords.json";

type HookReturnValue = {
  getKeywordText: (keyword: string) => string | null;
  keywords: Record<string, string>;
};

export function useKeywords(): HookReturnValue {
  const keywordMap = keywords as Record<string, string>;
  return {keywords: keywordMap, getKeywordText: (keyword) => keywordMap[keyword] ?? null};
}
