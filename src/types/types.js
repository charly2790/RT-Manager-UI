export const methods = {
    get: 'get',
    patch: 'patch',
    post: 'post',
    put: 'put',
}

export const ROLES = {
    TEAM_MEMBER: 'EQUIPO_MEMBER',
    TEAM_LEADER: 'EQUIPO_ADMIN',
}

export const SESSION_STATUS = {
    PENDING: 'PENDIENTE',
    SENT: 'ENVIADA',
    EXPIRED: 'VENCIDA',
    VALIDATED: 'VALIDADA',
    REVIEWING: 'REVISANDO',
}

export const SESSION_STATUS_COLORS = {
    PENDIENTE: 'warning',
    ENVIADA: 'primary',
    VENCIDA: 'error',
    VALIDADA: 'success',
    REVISANDO: 'info',    
}

export const ORIGINS = {
    SESIONES: 'SESIONES',
    USUARIOS: 'USUARIOS'
}