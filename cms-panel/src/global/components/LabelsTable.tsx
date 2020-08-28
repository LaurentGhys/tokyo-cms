import React, { FunctionComponent, useState } from 'react'
import { Button, Form as BootstrapForm, Table } from 'react-bootstrap'

interface LabelsTableProps {
  labelIds: string[]
  labelNames: Object
  labelNameChanged: (labelId: string, newName: string) => void
  newLabel?: boolean
  deleteLabelSubmit?: (labelId: string) => void
  labelsDelete?: boolean
  newLabelSubmit?: (labelId: string, labelName: string) => void
}

const LabelsTable: FunctionComponent<LabelsTableProps> = ({
  labelIds = [],
  labelNames = {},
  deleteLabelSubmit,
  labelNameChanged: labelValueChanged,
  newLabel = false,
  labelsDelete = false,
  newLabelSubmit,
}) => {

  const [newLabelId, setNewLabelId] = useState('')
  const [newLabelName, setNewLabelName] = useState('')

  const extraColumn = (): boolean => (newLabel || labelsDelete)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <td>Name</td>
          {extraColumn() && (
            <th>Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {labelIds.map((labelId, index) => (
          <tr key={index}>
            <td>{labelId}</td>
            <td>
              <BootstrapForm.Control size='sm' type='text' placeholder='Label name'
                onChange={(e) => labelValueChanged(labelId, e.target.value)}
                value={labelNames[labelId] || ''} />
            </td>
            {extraColumn() && (
              <td>
                {labelsDelete && (
                  <Button variant='danger' size='sm' block
                    onClick={() => deleteLabelSubmit(labelId)}>Delete</Button>
                )}
              </td>
            )}
          </tr>
        ))}
        {newLabel && (
          <tr>
            <td>
              <BootstrapForm.Control size='sm' type='text' placeholder='label-id'
                onChange={(e) => setNewLabelId(e.target.value)}
                value={newLabelId} />
            </td>
            <td>
              <BootstrapForm.Control size='sm' type='text' placeholder='Label name'
                onChange={(e) => setNewLabelName(e.target.value)}
                value={newLabelName} />
            </td>
            {extraColumn() && (
              <td>
                {!labelIds.includes(newLabelId) && (
                  <Button variant='primary' size='sm' block
                    onClick={() => newLabelSubmit(newLabelId, newLabelName)}>New</Button>
                )}
              </td>
            )}
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export { LabelsTable }
