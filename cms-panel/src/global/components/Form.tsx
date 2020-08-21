import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Button, Form as BootstrapForm } from 'react-bootstrap'

interface FormField {
  key: string
  text: string
  default?: string
  placeholder?: string
  required?: boolean
  type?: string
}

interface FormProps {
  fields: FormField[],
  buttonName?: string,
  onValidSubmit?: any,
  onFieldChange?: any,
  noButton?: boolean,
  formSubmitTrigger?: boolean
}

const Form: FunctionComponent<FormProps> = ({
  fields = [],
  onValidSubmit,
  onFieldChange,
  buttonName = 'Submit',
  noButton = false,
  formSubmitTrigger = false
}) => {

  const getDefaultFormData = () => {
    let defaultFormData = {}
    for (let field of fields)
      defaultFormData[field.key] = field.default || ''
    return defaultFormData
  }

  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState(getDefaultFormData())
  const formRef = useRef()

  useEffect(() => {
    if (formSubmitTrigger) {
      const form = formRef.current || null
      if (form != null || form != undefined)
        form.dispatchEvent(new Event('submit'))
      formSubmitTrigger = false
    }
  }, [formSubmitTrigger])

  const handleFormSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
    }
    else {
      if (onValidSubmit) onValidSubmit(formData)
    }
    setValidated(true)
  }

  const handleFieldChange = (event, fieldKey) => {
    setFormData({
      ...formData,
      [fieldKey]: event.target.value
    })
    if (onFieldChange) onFieldChange(formData)
  }

  return (
    <div>
      <BootstrapForm ref={formRef} noValidate validated={validated} onSubmit={handleFormSubmit}>
        {fields.map((field, fieldKey) => {
          return (
            <BootstrapForm.Group key={fieldKey} controlId={field.key} onChange={(e) => handleFieldChange(e, field.key)} >
              <BootstrapForm.Label>{field.text}</BootstrapForm.Label>
              <BootstrapForm.Control required={field.required || true} type={field.type || 'text'} placeholder={field.placeholder || field.key} defaultValue={field.default || ''} />
              <BootstrapForm.Text className='text-muted' />
            </BootstrapForm.Group>
          )
        })}
        {!noButton && (<Button variant='primary' type='submit'>{buttonName}</Button>)}
      </BootstrapForm>
    </div>
  )
}

export { Form, FormField }
