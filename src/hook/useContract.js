import { ref } from 'vue';
import { contractPage as getContractList } from '@/views/base/contract/enterprise/api';
import { isObject, isString } from 'lodash';

export default (options, showAll = false) => {
  const contractList = ref([]);
  const setContractList = async (params) => {
    const defaultOpitons = {
      page: 1,
      size: 100,
      ...options,
    };
    let query;
    if (isObject(params)) {
      query = {
        ...params,
      };
    } else if (isString(params)) {
      query = {
        contractName: params,
      };
    }
    query = {
      ...defaultOpitons,
      ...query,
    };
    const res = await getContractList(query);
    const records = res?.records || [];
    contractList.value = [];
    records.forEach((ele) => {
      contractList.value.push({
        ...ele,
        label: showAll ? `${ele.contractNo} - ${ele.contractName}` : ele.contractName,
        value: ele.contractNo,
      });
    });
  };

  setContractList();
  return [contractList, setContractList];
};
