import * as React from 'react';
import { List } from 'immutable';
import { Field } from 'models/shared/field';
import { TextField, Password } from 'UI/Form';

interface Props {
  name: string,
  validator: any,
  classes: any,
  fields: List<Field>
}

const SimpleFormList = (props: Props) => {
  const { name, fields, validator, classes } = props;
  return (
    <> {
      fields.map((field: Field) => (
        <div className={classes.marginTop} key={`${name}${fields.indexOf(field)}`}>
          {(field.type === 'email' || field.type === 'text')
            && (<TextField required={field.required} name={field.name} type={field.type} label={field.label} fullWidth validate={validator} />)}
          {field.type === 'password'
            && (<Password required={field.required} name={field.name} label={field.label} fullWidth validate={validator} />)}
        </div>
      ))
    }
    </>
  );
};

export default SimpleFormList;
