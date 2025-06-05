export function getArErrorMessage(error: string | number): string {
  if (error.toString().includes('401')) {
    return 'ليس لديك صلاحية الوصول إلى هذا المورد.'
  } else if (error.toString().includes('404')) {
    return 'لم يتم العثور على المورد المطلوب.'
  } else if (error.toString().includes('500')) {
    return 'حدث خطأ داخلي في الخادم. يرجى المحاولة لاحقًا.'
  } else if (error.toString().includes('422')) {
    return 'البيانات المُدخلة غير صحيحة أو غير مكتملة.'
  } else {
    return 'حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.'
  }
}
