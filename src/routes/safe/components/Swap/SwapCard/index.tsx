import * as React from 'react'
import { Card, Text, Dot, Title, Button } from '@gnosis.pm/safe-react-components'
import Row from 'src/components/layout/Row'

const SwapCard = (props) => {
  const { className } = props

  return (
    <Card className={className}>
      <Row align="center" justifyContent="space-between">
        <Title size="xs">Swap</Title>
        <Button
        size="md"
        iconType="settings"
        color="secondary"
        variant="bordered"
        iconSize="sm">
      </Button>
      </Row>
      <Button
        size="lg"
        iconType="safe"
        color="secondary"
        variant="bordered"
        iconSize="sm">
        <Text size="xl" color="secondary">
          Load Safe
        </Text>
      </Button>
    </Card>
  )
}

export default SwapCard
