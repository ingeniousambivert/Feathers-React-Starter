import { app } from "@/app.js";
import { getDate, getMonth, getYear, format } from "@/utils/index.js";

app.setup();

const syncDays = async (data) => {
  let count = 0;
  const queue = app.automation("load");
  const jobName = app.get("automation")["queues"]["load"];

  const scrapers = app.client("day").buildScraper(app);

  for (const scraper in scrapers) {
    if (Object.hasOwnProperty.call(scrapers, scraper)) {
      await queue.add(jobName, {
        identifier: scraper,
        type: "day",
        subtype: "scraper",
        payload: data
      });
      count++;
    }
  }

  const apis = app.client("day").buildApi(app);

  for (const api in apis) {
    if (Object.hasOwnProperty.call(apis, api)) {
      await queue.add(jobName, {
        identifier: api,
        type: "day",
        subtype: "api",
        payload: data
      });
      count++;
    }
  }
  return count;
};
const syncDates = async (data) => {
  let count = 0;
  const queue = app.automation("load");
  const jobName = app.get("automation")["queues"]["load"];

  const scrapers = app.client("date").buildScraper(app);
  delete scrapers.weathercity;
  delete scrapers.timeAndDate;

  for (const scraper in scrapers) {
    if (Object.hasOwnProperty.call(scrapers, scraper)) {
      await queue.add(jobName, {
        identifier: scraper,
        type: "date",
        subtype: "scraper",
        payload: data
      });
      count++;
    }
  }

  const rssFeeds = app.client("date").buildRss(app);

  for (const rssFeed in rssFeeds) {
    if (Object.hasOwnProperty.call(rssFeeds, rssFeed)) {
      await queue.add(jobName, {
        identifier: rssFeed,
        type: "date",
        subtype: "rss",
        payload: data
      });
      count++;
    }
  }
  return count;
};

const main = async ({ date, year, month, day }) => {
  app.logger.info(`scheduler:sync: 1 job added for date: ${date}`);
  const dayCount = await syncDays({ date, year, month, day });
  app.logger.info(`automation:sync:processor:day: ${dayCount} jobs added`);
  const dateCount = await syncDates({ date, year, month, day });
  app.logger.info(`automation:sync:processor:date: ${dateCount} jobs added`);
  console.log("Total Jobs -", dayCount + dateCount);
  process.exit(0);
};

const currentTimeStamp = new Date();
const day = getDate(currentTimeStamp);
const month = getMonth(currentTimeStamp) + 1;
const year = getYear(currentTimeStamp);
const date = format(currentTimeStamp, "yyyy-MM-dd");

main({ date, year, month, day });
