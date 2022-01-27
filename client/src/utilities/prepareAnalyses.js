const prepareAnalyses = (analyses) => {

  /* For each element, add additional field to indicate how many hours ago the analysis was posted */
  analyses = analyses.map(a => {
    return( { ...a, postedAgo: getAgo(a.date) });
  });

  /* For each element, add additional field to indicate average user rating */
  analyses = analyses.map(a => {
    return( { ...a, averageRating: getAverageRating(a.comments) });
  });

  return analyses;
};

/* Function to return hour difference between post date and date now */
const getAgo = (unparsedDate) => {
  const postedOn = new Date(unparsedDate);
  const today = new Date();
  /* The subtraction returns the difference between the two dates in milliseconds.
   36e5 is notation for 60*60*1000. */
  return Math.trunc(Math.abs(today - postedOn)/36e5);
};

const getAverageRating = (comments) => {
  if(!comments || comments.length===0) return 0;
  const average = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
  return average;
};


export default prepareAnalyses;