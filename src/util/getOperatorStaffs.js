// 获取操作人方法
const getStaffs = (isPieceWork, staffs) => {
  let operatorStaffs = [];
  if (isPieceWork && staffs.length) {
    operatorStaffs = staffs.map(({ staffCode, id, staffName }) => ({
      operatorId: id,
      staffCode,
      operatorName: staffName,
    }));
  }
  return operatorStaffs;
};
export default getStaffs;
