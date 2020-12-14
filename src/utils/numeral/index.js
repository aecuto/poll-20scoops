import numeral from 'numeral';

export const formatPercent = percentage => numeral(percentage).format('0.00 %');
