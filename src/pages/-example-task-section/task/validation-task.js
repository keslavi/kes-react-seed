import {
  yup,
  yupResolver,
  //regex,
} from '@/helpers/form-validation';

//export { yup };
export * from '@/helpers/form-validation/errorNotification';

export const schema= yup.object().shape({
  id:yup.string().required("id is required"),
  subject: yup.string().required("please provide a subject"),
  body: yup.string().required("please provide a body"),
  dfrom: yup.date()
    .validDateRange() //(min, max)
    .required("From date is required"),
  references: yup.array().of(yup.string()).default([])
})

export const resolver=yupResolver(schema);
