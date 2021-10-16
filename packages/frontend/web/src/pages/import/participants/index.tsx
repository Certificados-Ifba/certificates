import Import from '../../../components/import/import'
import withAuth from '../../../hocs/withAuth'

const ImportParticipant: React.FC = () => {
  return (
    <Import
      sendURL={'test/import'}
      columns={[
        { name: 'CPF', key: 'cpf', type: 'string' },
        { name: 'Nome', key: 'name', type: 'string' },
        { name: 'Data de Nascimento', key: 'birthday', type: 'date' },
        { name: 'E-mail', key: 'e-mail', type: 'string' },
        { name: 'É da instituição', key: 'ifba', type: 'string', color: 'info' }
      ]}
      examples={[
        {
          values: [
            '000.000.000-00',
            'Lucas Nascimento Bertoldi',
            '11/09/2021',
            'lucas@lucas.com',
            'Não'
          ]
        },
        {
          values: [
            '111.111.111-11',
            'Pablo Matos',
            '11/09/2021',
            'pablo@pablo.com',
            'Sim'
          ]
        },
        {
          values: [
            '222.222.222-22',
            'Matheus Coqueiro',
            '11/09/2021',
            'matheus@matheus.com',
            'Não'
          ]
        },
        {
          values: [
            '333.333.333-33',
            'Alexandro',
            '11/09/2021',
            'alexandro@alexandro.com',
            'Não'
          ]
        }
      ]}
      enums={[
        {
          color: 'info',
          name: 'É da Instituição',
          values: ['Sim', 'Não']
        }
      ]}
      backRoute={`/participants`}
      title={`Importar Participantes`}
      windowTitle={`Importar Participantes`}
    ></Import>
  )
}

export default withAuth(ImportParticipant)
