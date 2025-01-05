import * as yup from "yup";

import { Schema } from "yup";
import { IRestaurant } from "../../@types/models/Restaurant";

export const createRestaurantSchema: Schema<IRestaurant> = yup.object().shape({
  username: yup.string().required("O Nome é obrigatório"),
  phone: yup.string().required("O Telefone é obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O E-mail é obrigatório"),
  password: yup.string().required("A Senha é obrigatória"),
  address: yup.string().required("O Endereço é obrigatório"),
  has_service_tax: yup.boolean().required("A taxa de serviço é obrigatório"),
  canceled_at: yup.string().nullable(),
});
