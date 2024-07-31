import moment from 'moment';

export default function FormatDate(date) {
  return ( moment(date).format('DD/MM/YYYY')  )
}
