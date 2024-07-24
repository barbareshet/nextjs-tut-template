export const calculateSums = (invoices) => {
    return invoices.reduce((acc, invoice) => {
        const amount = parseFloat(invoice.amount);
        if (invoice.status === 'paid') {
            acc.paid += amount;
        } else if (invoice.status === 'unpaid') {
            acc.unpaid += amount;
        }
        return acc;
    }, { paid: 0, unpaid: 0 });
};

export const shortenId = (id) => {
    return id.length > 4 ? `${id.slice(0, 4)}...` : id;
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};