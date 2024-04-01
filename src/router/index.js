import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './route';
import permission from './permission';

const create = () => createRouter({
  history: createWebHashHistory(),
  routes,
});
const router = create();

export function resetRouter() {
  const newRouter = create();
  router.matcher = newRouter.matcher;
}

permission(router);

export default router;
