import React, { FC } from 'react'
import { List, Image, Popup } from 'semantic-ui-react'
import { IAttendee } from '../../../app/models/activity'

interface IProp{
   Attendees:IAttendee[]
}
const ActivityListItemAttendees:FC<IProp> = ({Attendees}) => {
   return (
      <List horizontal>{
         Attendees &&
         Attendees.map((attendee)=>(
            <List.Item key={attendee.userName}>
            <Popup header={attendee.userName} trigger={ 
               <Image size='mini' circular src={ attendee.image ||'assets/user.png'} />
            }
            />
           
            </List.Item>
         ))
      }
        </List>
   )
}

export default ActivityListItemAttendees
