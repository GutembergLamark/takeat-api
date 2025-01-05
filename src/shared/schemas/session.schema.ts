import * as yup from "yup";

import { Schema } from "yup";
import { ISession } from "../../@types/models/Session";

export const createSessionSchema: Schema<ISession> = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O E-mail é obrigatório"),
  password: yup.string().required("A Senha é obrigatória"),
});
