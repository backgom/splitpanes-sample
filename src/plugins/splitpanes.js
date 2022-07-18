import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

export default {
  install(app) {
    app.component('Splitpanes', Splitpanes);
    app.component('Pane', Pane);
  },
};
