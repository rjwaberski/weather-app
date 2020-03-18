export default function Debounce(wait: number, immediate: boolean = false) {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    let timeout: any;
    const originalMethod = descriptor.value;
    descriptor.value = function() {
      const context = this;
      const args = arguments;
      const execute = () => {
        originalMethod.apply(context, args);
      };
      const later = () => {
        timeout = null;
        if (!immediate) {
          execute();
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        execute();
      }
    };
    return descriptor;
  };
}
