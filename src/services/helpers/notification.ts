import { notify } from "@kyvg/vue3-notification";

/**
 * Show a notification on the bottom left corner
 */
export const useNotifications = () => {
  const notifyError = (message: string) => {
    notify({
      type: "error",
      text: message,
    });
  };

  return {
    notifyError,
  };
};
