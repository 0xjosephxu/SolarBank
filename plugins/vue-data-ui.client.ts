import { VueDataUi, VueUiDonut } from 'vue-data-ui';
import 'vue-data-ui/style.css';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('VueUiDonut', VueUiDonut);

  // OR register the universal component if you plan to use it
  nuxtApp.vueApp.component('VueDataUi', VueDataUi);
});
