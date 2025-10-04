import Swal, { type SweetAlertOptions } from 'sweetalert2';

/**
 * Custom SweetAlert2 configuration with dark mode support
 * @param darkMode - Whether dark mode is enabled
 */
export function getSwalConfig(darkMode: boolean) {
  return {
    background: darkMode ? '#18181B' : '#FFFFFF',
    color: darkMode ? '#FFFFFF' : '#111111',
    confirmButtonColor: '#CD9C20',
    iconColor: darkMode ? '#CD9C20' : undefined,
    customClass: {
      popup: darkMode ? 'swal2-dark' : '',
    },
  };
}

/**
 * Show a success alert with consistent theming
 */
export function showSuccessAlert(
  title: string,
  text: string,
  darkMode: boolean,
  options?: SweetAlertOptions
) {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    ...getSwalConfig(darkMode),
    ...options,
  });
}

/**
 * Show an error alert with consistent theming
 */
export function showErrorAlert(
  title: string,
  text: string,
  darkMode: boolean,
  options?: SweetAlertOptions
) {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    ...getSwalConfig(darkMode),
    ...options,
  });
}

/**
 * Show an info alert with consistent theming
 */
export function showInfoAlert(
  title: string,
  text: string,
  darkMode: boolean,
  options?: SweetAlertOptions
) {
  return Swal.fire({
    icon: 'info',
    title,
    text,
    ...getSwalConfig(darkMode),
    ...options,
  });
}

/**
 * Show a warning alert with consistent theming
 */
export function showWarningAlert(
  title: string,
  text: string,
  darkMode: boolean,
  options?: SweetAlertOptions
) {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    ...getSwalConfig(darkMode),
    ...options,
  });
}
