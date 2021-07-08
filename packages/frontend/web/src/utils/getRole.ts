const getRole = (role: string): string =>
  role === 'ADMIN'
    ? 'Administrador'
    : role === 'COORDINATOR'
    ? 'Coordenador'
    : role === 'PARTICIPANT'
    ? 'Participante'
    : 'Desconhecido'

export default getRole
