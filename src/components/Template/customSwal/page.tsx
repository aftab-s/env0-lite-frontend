// components/customSwal/page.ts
import Swal, { SweetAlertOptions } from "sweetalert2";
import "@/components/Template/customSwal/page";

export const showBagelAlert = (options: SweetAlertOptions) => {
  return Swal.fire({
    title: options.title,
    html: options.text, // use 'html' instead of 'text' to allow customClass styling
    icon: options.icon,
    showConfirmButton: true,
    confirmButtonText: options.confirmButtonText || 'OK',
    confirmButtonColor: "#D2A679", // dough
    iconColor: "#A0522D",          // brown
    customClass: {
      popup: 'customBagelGlass',
      title: 'customBagelTitle',
      htmlContainer: 'customBagelContent', // fix: use 'htmlContainer' instead of 'content'
      confirmButton: 'customBagelButton',
      icon: 'customBagelIcon'
    },
  });
};
