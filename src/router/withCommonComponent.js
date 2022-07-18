import { h, defineAsyncComponent } from 'vue';
import { useCommonStore } from '../stores/common';

const withCommonComponent = (componentName) => {
  return {
    name: 'WithCommon',
    computed: {
      childComponent() {
        return typeof componentName === 'function'
          ? defineAsyncComponent(componentName)
          : componentName;
      },
    },
    activated() {
      const commonStore = useCommonStore();
      commonStore.off();
    },
    render() {
      return h(this.childComponent);
    },
  };
};

export default withCommonComponent;
