import _ from "lodash"

export const getSeries = (data) => {

    return _.isNil(data)
        ? []
        : Object.keys(data).map(key => {
            
            const serie = {
                id: key,
                label: key.replace('_', ' '),
                data: data[key],
                stack: key === 'total' ? 'B' : 'A',
                valueFormatter: (value) => `${value} kms`
            }

            if(key ==='total') {
                serie.color = 'transparent'                
                serie.showMark = false
                serie.label = (location) => location === 'tooltip' ? 'Total ' : ''
            };

            return serie;
        })

}