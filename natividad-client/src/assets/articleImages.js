import bq1 from "./images/bq1.png";
import bq2 from "./images/bq2.png";
import bq3 from "./images/bq3.png";
import bq4 from "./images/bq4.png";
import bq5 from "./images/bq5.png";

export const articleImages = { bq1, bq2, bq3, bq4, bq5 };

export const imageKeys = Object.keys(articleImages);

export const resolveImage = (key) => articleImages[key] ?? bq1;
