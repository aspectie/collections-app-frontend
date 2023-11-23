import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

type buttonType = 'add' | 'delete'

export function Toolbar({
  buttons,
  eventHandlers
}: {
  buttons: buttonType[]
  eventHandlers: {
    onDelete?: () => void
    onAdd?: () => void
  }
}) {
  const buttonsMap = {
    add: (
      <Button
        className="mr-4"
        type="primary"
        key="add"
        onClick={eventHandlers.onAdd}
      >
        Add
      </Button>
    ),
    delete: (
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        key="delete"
        onClick={eventHandlers.onDelete}
      >
        Delete
      </Button>
    )
  }
  return <>{buttons.map((button) => buttonsMap[button])}</>
}
