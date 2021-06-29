const getErrorMessage = (
  error: string,
  errors?: { [key: string]: any } | null
): string => {
  let message: string
  switch (error) {
    case 'permission_check_forbidden':
      message = 'Seu usuário não possui permissão para realizar essa ação.'
      break
    case 'user_create_conflict':
    case 'user_update_by_id_conflict':
      message = errors.email
        ? 'E-mail já cadastrado, tente com um diferente.'
        : errors.cpf
        ? 'CPF já cadastrado, tente com um diferente.'
        : 'Conflito encontrado, verifique os dados informados.'
      break
    case 'user_get_by_link_expired':
      message = 'Link expirado, favor tente novamente.'
      break
    case 'user_forgot_password_not_found':
      message = 'E-mail não encontrado, favor informar um e-mail cadastrado.'
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
