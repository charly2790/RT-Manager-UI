import _ from "lodash"

export const getSeries = (data) => {

    return _.isNil(data)
        ? []
        : Object.keys(data).map(key => ({
            id: key,
            label: key.replace('_', ' '),
            data: data[key],
            stack: 'A'
        }))

}