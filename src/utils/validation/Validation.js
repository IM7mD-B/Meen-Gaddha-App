import * as Yup from 'yup'

const symbolsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/

// ============ SignUp ============
export const registerSchema = Yup.object().shape({
   name: Yup.string()
   .min(2, "الاسم يجب أن يكون حرفين أو أكثر")
    .required("الاسم مطلوب"),
  email: Yup.string()
    .email("صيغة الإيميل غير صحيحة")
    .matches(/@.+\.com$/, "الإيميل يجب أن ينتهي بـ @ و .com")
    .required("الإيميل مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون ٨ أحرف على الأقل")
    .matches(/[0-9]/, "يجب أن تحتوي على رقم")
    .matches(symbolsRegex, "يجب أن تحتوي على رمز واحد على الأقل")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
})

// ============ SignIn ============
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("صيغة الإيميل غير صحيحة")
    .matches(/@.+\.com$/, "الإيميل يجب أن ينتهي بـ @ و .com")
    .required("الإيميل مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون ٨ أحرف على الأقل")
    .matches(/[0-9]/, "يجب أن تحتوي على رقم")
    .required("كلمة المرور مطلوبة"),
});