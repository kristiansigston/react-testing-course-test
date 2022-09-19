import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const SummaryForm = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    setOrderPhase('completed')
  }

  const popover = (
    <Popover id="termsandconditions-popover">
      <Popover.Header as="h3">Popover Right</Popover.Header>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  )

  const checkBoxLabel = (
    <span>
      I agree to the
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>terms and conditions</span>
      </OverlayTrigger>
      ;
    </span>
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkBoxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm Order
      </Button>
    </Form>
  )
}

export default SummaryForm
