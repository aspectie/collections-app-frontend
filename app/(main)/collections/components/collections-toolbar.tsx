import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export function Toolbar({
  eventHandlers
}: {
  eventHandlers: {
    onDelete: () => void
    onAdd: () => void
  }
}) {
  return (
    <>
      <Button
        className="mr-4"
        type="primary"
        onClick={eventHandlers.onAdd}
      >
        Add
      </Button>
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        onClick={eventHandlers.onDelete}
      >
        Delete
      </Button>
    </>
  )
}
