import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/form'
import Row from 'react-bootstrap/Row'

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [invalidClass, setInvalidClass] = useState('')
  const handleChange = (event) => {
    const value = event.target.value
    if (value < 0 || value % 1 !== 0 || value > 10) {
      setInvalidClass('is-invalid')
      return
    }
    setInvalidClass('')
    updateItemCount(name, value)
  }
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img src={`http://localhost/3030/${imagePath}`} alt={`${name} Scoop`} />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            className={invalidClass}
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}

export default ScoopOption
