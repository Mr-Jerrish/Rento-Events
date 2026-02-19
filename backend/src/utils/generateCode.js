import Counter from "../models/CounterModel/CounterModel.js";

// export const getCurrentCode = async (orgId, branchId, screenName, prefix) => {
//   const counter = await Counter.findOne({
//     orgId,
//     branchId,
//     screenName,
//   });

//   const currentSequence = counter ? counter.sequence + 1 : 1;

//   const padded = currentSequence.toString().padStart(4, "0");

//   return `${prefix}${padded}`;
// };

export const getCurrentCode = async (orgId, branchId, screenName, prefix) => {
  const counter = await Counter.findOne({
    orgId,
    branchId,
    screenName,
    prefix,
  });

  const nextSequence = counter ? counter.sequence + 1 : 1;

  const padded = nextSequence.toString().padStart(4, "0");

  return `${prefix}${padded}`;
};
