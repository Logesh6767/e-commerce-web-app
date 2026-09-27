export const formatPrice = (price) => {
  return `$${Number(price).toFixed(2)}`;
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getStatusColor = (status) => {
  switch(status) {
    case 'Pending': return 'gray';
    case 'Processing': return 'blue';
    case 'Shipped': return 'amber';
    case 'Delivered': return 'green';
    case 'Cancelled': return 'red';
    default: return 'gray';
  }
};
