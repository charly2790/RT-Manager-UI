import _ from "lodash";

export const isNilOrEmpty = (value) => {
    console.log('_________________________________________________');
    console.log('value-->', value);
    console.log('isNumber-->',!_.isNumber(value));
    console.log('isNil--->',_.isNil(value));
    console.log('isEmpty--->',_.isEmpty(value));
    console.log('Final condition-->',!_.isNumber(value) && (_.isNil(value) || _.isEmpty(value)))
    console.log('_________________________________________________');
    return !_.isNumber(value) && (_.isNil(value) || _.isEmpty(value));
}