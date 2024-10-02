import { ENV } from "app/config/environment";

import { createClient } from "microcms-js-sdk";

export type newsResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  ///custom field///
  titleJA: string;
  titleEN: string;
  descriptionJA: React.JSX.Element;
  descriptionEN: React.JSX.Element;
  image?: {
    url: string;
    height: number;
    width: number;
  };
  ///////////////////
};

export type newsListApiResponse = {
  contents: newsResponse[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const microCmsClient = createClient({
  serviceDomain: "jawspankration2024",
  apiKey: ENV.MICROCMS_API_KEY,
  retry: true,
});
