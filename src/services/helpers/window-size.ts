import { ref, onMounted, onBeforeUnmount } from "vue";

//Calculate the avaliable space on window resize
export const useWindowSize = () => {
  const windowWidth = ref<number>(document.documentElement.clientWidth);

  const onResize = () => {
    windowWidth.value = document.documentElement.clientWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
  });

  return {
    windowWidth,
  };
};
