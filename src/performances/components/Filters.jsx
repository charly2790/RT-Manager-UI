import { Chip } from '@mui/material';
import _ from 'lodash';
import React from 'react'
import { getLabel } from '../helpers';

export const Filters = ({ 
    alumnos, 
    handleDelete,
    filters }) => {

    const keys = Object.keys(filters);

    return keys.map(key => {
        if (!_.isNil(filters[key])) {
            const value = filters[key];
            const label = key === 'alumno' ? getLabel(alumnos, value) : value;
            return <Chip key={key} label={label} variant="outlined" onDelete={handleDelete} />
        }
    })
}
