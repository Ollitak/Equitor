/* Function to return hour difference between post date and date now */
const getAgo = (unparsedDate) => {
  const postedOn = new Date(unparsedDate);
  const today = new Date();
  /* The subtraction returns the difference between the two dates in milliseconds.
   36e5 is notation for 60*60*1000. */
  return Math.trunc(Math.abs(today - postedOn) / 36e5);
};

const getAverageRating = (comments) => {
  if (!comments || comments.length === 0) return 0;
  const average = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
  return average;
};

export const orderByDateASC = (analyses) => {
  return analyses.sort((first, second) => first.postedAgo - second.postedAgo);
};

export const orderByDateDESC = (analyses) => {
  return analyses.sort((first, second) => second.postedAgo - first.postedAgo);
};

export const orderByRatingASC = (analyses) => {
  return analyses.sort((first, second) => first.averageRating - second.averageRating);
};

export const orderByRatingDESC = (analyses) => {
  return analyses.sort((first, second) => second.averageRating - first.averageRating);
};

const prepareAnalyses = (analyses, filters) => {
  /* For each element, add additional field to indicate how many hours ago the analysis was posted */
  analyses = analyses.map((a) => {
    return { ...a, postedAgo: getAgo(a.date) };
  });

  /* For each element, add additional field to indicate average user rating */
  analyses = analyses.map((a) => {
    return { ...a, averageRating: getAverageRating(a.comments) };
  });

  /* filter analyses by company name */
  if (filters && filters.companyFilter) {
    analyses = analyses.filter(
      (analysis) => analysis.stockInformation.name === filters.companyFilter
    );
  }

  /* filter analyses by keyword */
  if (filters && filters.keywordFilter) {
    analyses = analyses.filter((analysis) => analysis.keyWords.includes(filters.keywordFilter));
  }

  /* filter analyses by user selected ordering */
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
