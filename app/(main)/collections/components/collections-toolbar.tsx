import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export function Toolbar({
  eventHandlers
}: {
  eventHandlers: {
    onDelete: () => void
  }
}) {
  return (
    <>
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
