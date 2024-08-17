import {NewsPost} from "@legion-hq/types/news";
import news from "@legion-hq/data/news.json";

type HookReturnValue = {
  newsPosts: Array<NewsPost>;
};

export function useNews(): HookReturnValue {
  return {newsPosts: news};
}
