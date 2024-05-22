import store from '@/store';

export const getToken = () => {
  const token = store.getters.access_token;
  return `Bearer ${token}`;
};
export const getTenantId = () => {
  return store.state?.user?.userInfo?.tenantId;
};
export const uploadHeader = () => {
  return {
    Authorization: getToken(),
    'Tenant-Id': getTenantId(),
  };
};
