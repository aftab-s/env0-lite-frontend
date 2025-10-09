// components/customSwal/page.ts

import Swal, { SweetAlertOptions } from "sweetalert2";

export function customSwal(options: SweetAlertOptions) {
  return Swal.fire({
    title: options.title,
    html: options.text,
    icon: options.icon,
    showConfirmButton: true,
    confirmButtonText: options.confirmButtonText || 'OK',
    confirmButtonColor: '#D2A679',
    iconColor: '#A0522D',
    didOpen: () => {
      // Popup
      const popup = document.querySelector('.swal2-popup');
      if (popup) {
        popup.classList.add(
          'bg-yellow-100/80', // warm dough
          'backdrop-blur-lg',
          'border-2',
          'border-yellow-400',
          'rounded-2xl',
          'shadow-2xl',
          'p-6',
          'text-yellow-900',
          'animate-scale-in'
        );
      }
      // Title
      const title = document.querySelector('.swal2-title');
      if (title) {
        title.classList.add(
          'font-bold',
          'text-2xl',
          'text-yellow-800',
          'drop-shadow-sm'
        );
      }
      // Content
      const content = document.querySelector('.swal2-html-container');
      if (content) {
        content.classList.add(
          'text-base',
          'text-yellow-900',
          'leading-relaxed'
        );
      }
      // Confirm Button
      const confirmBtn = document.querySelector('.swal2-confirm');
      if (confirmBtn) {
        confirmBtn.classList.add(
          'bg-gradient-to-tr',
          'from-yellow-300',
          'to-yellow-500',
          'text-yellow-950',
          'font-semibold',
          'rounded-lg',
          'px-5',
          'py-2',
          'shadow-md',
          'hover:from-yellow-400',
          'hover:to-yellow-300',
          'transition',
          'duration-200',
          'ease-in-out',
          'mt-4'
        );
      }
      // Icon
      const icon = document.querySelector('.swal2-icon');
      if (icon) {
        icon.classList.add('text-yellow-800');
      }
    },
  });
}
