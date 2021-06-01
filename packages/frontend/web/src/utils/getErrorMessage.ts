const getErrorMessage = (error: string): string => {
  let message: string
  switch (error) {
    case 'user_get_by_link_expired':
      message = 'Link expirado, favor tente novamente.'
      break
    case 'user_forgot_password_not_found':
      message = 'Email não encontrado, favor informar um email cadastrado.'
      break
    case 'generic_create_conflict_name':
    case 'generic_update_by_id_conflict_name':
      message = 'Este nome já está cadastrado, tente com um diferente.'
      break

    default:
      message = 'Erro desconhecido, favor entrar em contato com o adminstrador.'
      break
  }
  return message
}

export default getErrorMessage
