const getErrorMessage = (error: string): string => {
  let message: string
  switch (error) {
    case 'user_create_conflict':
      message =
        'Já existe um usuário com esse e-mail. Por favor, tente um diferente.'
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
