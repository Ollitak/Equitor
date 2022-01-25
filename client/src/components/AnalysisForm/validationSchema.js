import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required!"),
  targetPrice: Yup.number()
    .min(0, "must be positive!"),
  stockSelectionIndex: Yup.number()
    .required("Stock must be selected!")
});

export default validationSchema;