import * as yup from "yup";

import { Schema } from "yup";
import { IProduct } from "../../@types/models/Product";

export const createProductSchema: Schema<IProduct> = yup.object().shape({
  name: yup.string().required("O Nome é obrigatório"),
  description: yup.string().required("A Descrição é obrigatória"),
  value: yup
    .number()
    .required("O Valor é obrigatório")
    .transform((value) => parseFloat(value)),
  canceled_at: yup.string().nullable(),
});
