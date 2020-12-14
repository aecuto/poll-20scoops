import { countBy } from 'lodash';

export default (poll, list) => {
  const countList = countBy(list, data => data.answer);

  const result = [];
  poll.answer.forEach(data => {
    const { label } = data;
    const count = countList[label] || 0;
    const total = list.length;
    result.push({ label, count, percentage: count / total });
  });

  return { title: poll.title, result };
};
