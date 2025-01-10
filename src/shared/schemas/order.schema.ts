import * as yup from "yup";

import { Schema } from "yup";
import { IOrder } from "../../@types/models/Order";

export const createOrderSchema: Schema<IOrder> = yup.object().shape({
  name: yup.string().nullable(),
  product: yup.string().required("O Produto é obrigatório"),
  phone: yup.string().required("O Telefone é obrigatório"),
  amount: yup
    .number()
    .required("A Quantidade é obrigatória")
    .transform((value) => parseFloat(value)),
  restaurant_id: yup.string().required("O id do restaurante é obrigatório"),
});
