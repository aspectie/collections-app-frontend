import { Button } from 'antd'
import { LockOutlined, UnlockOutlined, DeleteOutlined } from '@ant-design/icons'

export function Toolbar({
  eventHandlers
}: {
  eventHandlers: {
    onBlock: () => void
    onUnblock: () => void
    onDelete: () => void
  }
}) {
  return (
    <>
      <Button
        className="mr-4"
        icon={<LockOutlined />}
        onClick={eventHandlers.onBlock}
      >
        Block
      </Button>
      <Button
        className="mr-4"
        icon={<UnlockOutlined />}
        onClick={eventHandlers.onUnblock}
      >
        Unblock
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
