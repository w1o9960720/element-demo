const OUT_WAREHOUSE = 'OutWarehouse';
const SORTING_MANAGE = `${OUT_WAREHOUSE}SortingManage`;

export default {
  DELIVER_ORDER: `${OUT_WAREHOUSE}DeliverOrder`,
  ADD_ORDER: `${OUT_WAREHOUSE}AddOrder`,
  PICKUP_PLAN: `${OUT_WAREHOUSE}PickupPlan`,
  WAVE_ORDER: `${OUT_WAREHOUSE}WaveOrder`,
  SORTING_TASK: `${SORTING_MANAGE}SortingTask`,
  PRE_AUDIT: `${SORTING_MANAGE}PreAudit`,
  DISTRI_GOODS: `${SORTING_MANAGE}DistriGoods`,
  DIRECT_SHIP: `${SORTING_MANAGE}DirectShip`,
  TURNOVER_DISPATCH: `${SORTING_MANAGE}TurnoverDispatch`,
};
