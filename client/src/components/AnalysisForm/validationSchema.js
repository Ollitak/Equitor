import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  stockName: Yup.string().required("Stock must be specified!"),
  title: Yup.string().required("Title is required!"),
  targetPrice: Yup.number().required(" Target price is required!").min(0),
  recommendation: Yup.string().required("Recommendation is required!"),
  content: Yup.object().shape({
    summary: Yup.string().required("Summary is required!")
  })
});

export default validationSchema;
