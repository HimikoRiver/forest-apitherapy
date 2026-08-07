const NOT_PROVIDED = "Требуется указать перед публикацией";

export const LEGAL_DOCUMENT_VERSION = "1.0";
export const LEGAL_UPDATED_AT = "7 августа 2026 года";

export const legalOperator = {
  status: "Индивидуальный предприниматель",
  name: process.env.LEGAL_OPERATOR_NAME || NOT_PROVIDED,
  inn: process.env.LEGAL_OPERATOR_INN || NOT_PROVIDED,
  ogrnip: process.env.LEGAL_OPERATOR_OGRNIP || NOT_PROVIDED,
  email: "apidarb_77@mail.ru",
  phone: "+7 (966) 727-17-71",
  website: "https://apidarb.ru",
};

export const legalOperatorIsComplete = Boolean(
  process.env.LEGAL_OPERATOR_NAME &&
    process.env.LEGAL_OPERATOR_INN &&
    process.env.LEGAL_OPERATOR_OGRNIP
);
