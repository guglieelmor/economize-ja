import numeral from 'numeral';
import 'numeral/locales/pt-br';
numeral.locale('pt-br');
export const toBRL = (value: number) => {
  if (!isFinite(value)) return numeral(0).format('$ 0,0.00');
  return numeral(value).format('$ 0,0.00');
};
