import React, { FC } from 'react'
import { Message } from 'semantic-ui-react'
import { AxiosResponse } from 'axios'

interface IProp{
   error : AxiosResponse,
   text?:string
}
const ErrorMessage:FC<IProp> = ({error, text}) => {
   return (
      <Message error>
      <Message.Header>{error.statusText}</Message.Header>
      {text && <Message.Content>{text}</Message.Content>}
      </Message>
   )
}

export default ErrorMessage
