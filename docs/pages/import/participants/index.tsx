import Import from '../../../components/import/import'
import withAuth from '../../../hocs/withAuth'
import { getParticipantSchema } from '../../../utils/schemas'

const ImportParticipant: React.FC = () => {
  return (
    <Import
      createSchema={item => {
        return getParticipantSchema()
      }}
      sendURL={'participants'}
      columns={[
        { name: 'CPF', key: 'cpf', type: 'string' },
        { name: 'Nome', key: 'name', type: 'string' },
        {
          name: 'Data de Nascimento',
          key: 'dob',
          type: 'date'
        },
        { name: 'E-mail', key: 'e-mail', type: 'string' },
        { name: 'Telefone', key: 'phone', type: 'phone' },
        {
          name: 'É da instituição',
          key: 'institution',
          type: 'string',
          color: 'info'
        }
      ]}
      examples={[
        {
          values: [
            '000.000.000-00',
            'Lucas Nascimento Bertoldi',
            '11/09/2021',
            'lucas@lucas.com',
            '(77) 98809-0649',
            'Não'
          ]
        },
        {
          values: [
            '111.111.111-11',
            'Pablo Matos',
            '11/09/2021',
            'pablo@pablo.com',
            '',
            'Sim'
          ]
        },
        {
          values: [
            '222.222.222-22',
            'Matheus Coqueiro',
            '11/09/2021',
            'matheus@matheus.com',
            '',
            'Não'
          ]
        },
        {
          values: [
            '333.333.333-33',
            'Alexandro',
            '11/09/2021',
            'alexandro@alexandro.com',
            '',
            'Não'
          ]
        }
      ]}
      enums={[
        {
          key: 'institution',
          color: 'info',
          name: 'É da Instituição',
          values: [
            { name: 'Sim', value: true },
            { name: 'Não', value: false }
          ]
        }
      ]}
      backRoute={`/participants`}
      title={`Importar Participantes`}
      windowTitle={`Importar Participantes`}
    ></Import>
  )
}

export default withAuth(ImportParticipant)
