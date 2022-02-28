/** Function returns hour difference between the time the analysis was posted and the current time.
 *
 *  !Note that times are treated as Date objects. The subtraction of Date objects returns the
 *  difference between the two dates in milliseconds (36e5 is notation for 60*60*1000).
 *
 * @param {String} unparsedDate  current date in string format
 *
 */

const getAgo = (unparsedDate) => {
  const postedOn = new Date(unparsedDate);
  const today = new Date();
  /*  */
  return Math.abs(today - postedOn) / 36e5;
};

/** Returns average rating of list of comments.
 *
 * @param {Array} comments  list of comments
 */

const getAverageRating = (comments) => {
  if (!comments || comments.length === 0) return 0;
  const average = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
  return average;
};

/** Reorders the parameter list by date (ascending) and returns the list as new array object.
 *
 * @param {Array} analyses  list of analyses
 */

export const orderByDateASC = (analyses) => {
  return analyses.sort((first, second) => first.postedAgo - second.postedAgo);
};

/** Reorders the parameter list by date (descending) and returns the list as new array object.
 *
 * @param {Array} analyses  list of analyses
 */

export const orderByDateDESC = (analyses) => {
  return analyses.sort((first, second) => second.postedAgo - first.postedAgo);
};

/** Reorders the parameter list by rating (ascending) and returns the list as new array object.
 *
 * @param {Array} analyses  list of analyses
 */

export const orderByRatingASC = (analyses) => {
  return analyses.sort((first, second) => first.averageRating - second.averageRating);
};

/** Reorders the parameter list by rating (descending) and returns the list as new array object.
 *
 * @param {Array} analyses  list of analyses
 */

export const orderByRatingDESC = (analyses) => {
  return analyses.sort((first, second) => second.averageRating - first.averageRating);
};

/** Modify list of analyses based on given filters.
 *
 * @param {Array} analyses  list of analyses
 * @param {Object} filters  Object including filters
 */

const prepareAnalyses = (analyses, filters) => {
  // If no filter is set, default functionality is to order by publish date
  if (!filters) {
    filters = { orderingFilter: "Most recent" };
  }

  /** ADD PROPERTIES FOR EACH ANALYSIS OBJECT */

  // For each element, add additional property to indicate how many hours ago the analysis was posted
  analyses = analyses.map((a) => {
    return { ...a, postedAgo: getAgo(a.date) };
  });

  // For each element, add additional property to indicate average user rating
  analyses = analyses.map((a) => {
    return { ...a, averageRating: getAverageRating(a.comments) };
  });

  /** APPLY FILTERS */

  // Filter analyses by company name
  if (filters && filters.companyFilter) {
    analyses = analyses.filter(
      (analysis) => analysis.stockInformation.name === filters.companyFilter
    );
  }

  // Filter analyses by keyword
  if (filters && filters.keywordFilter) {
    analyses = analyses.filter((analysis) => analysis.keyWords.includes(filters.keywordFilter));
  }

  // Filter analyses by user selected ordering
  switch (filters && filters.orderingFilter) {
    case "Most recent":
      analyses = orderByDateASC(analyses);
      break;
    case "Oldest":
      analyses = orderByDateDESC(analyses);
      break;
    case "Lowest rated":
      analyses = orderByRatingASC(analyses);
      break;
    case "Highest rated":
      analyses = orderByRatingDESC(analyses);
      break;
    default:
  }

  return analyses;
};

export default prepareAnalyses;
