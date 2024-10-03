export const convertDate = date => {
    return new Date(date).toLocaleDateString('id-Id')
}

export const convertCurrency = nominal => {
    return nominal.toLocaleString('id-ID', {
        styles: 'currency',
        currency: 'IDR'
    })
}