import React from 'react';
import ContactItemBody from './ContactItemBody';
import ContactItemImage from './ContactItemImage';
import DeleteButton from './DeleteButton';
import Joi from 'joi';
import { validateProps }  from '../utils/validation';

const contactItemPropsSchema=Joi.object({
    imageUrl: Joi.string().required(),
    name: Joi.string().required(),
    tag: Joi.string().required(),
    onDelete: Joi.func().required(),
    id: Joi.number().required(),
});

function ContactItem(props) {
  const validatedProps = validateProps(contactItemPropsSchema, props, 'ContactItem');
  const { imageUrl, name, id, tag, onDelete } = validatedProps;
 return (
   <div className="contact-item">
     <ContactItemImage imageUrl={imageUrl} />
     <ContactItemBody name={name} tag={tag} />
     <DeleteButton id={id} onDelete={onDelete} />
   </div>
 );
}

export default ContactItem;