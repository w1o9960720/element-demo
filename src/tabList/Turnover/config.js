import { Dict } from './constant';
import Detail from './components/Detail.vue';
import Diff from './components/Diff.vue';
import Summarize from './components/Summarize.vue';

const components = {
  [Dict.Summarize]: Summarize,
  [Dict.Detail]: Detail,
  [Dict.Diff]: Diff,
};

export default components;
