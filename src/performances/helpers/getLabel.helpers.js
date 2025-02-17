export const getLabel = (targets, value) => {
    return (targets.find(target => target.value === value)).label
}