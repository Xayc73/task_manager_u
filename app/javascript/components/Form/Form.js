import React from 'react';
import PropTypes from 'prop-types';
import { has } from 'ramda';
import TextField from '@material-ui/core/TextField';

import TaskPresenter from 'presenters/TaskPresenter';
import UserSelect from 'components/UserSelect';
import useStyles from './useStyles';

const Form = ({ errors, onChange, task }) => {
  const handleChangeTextField = (fieldName) => ({ target: { value } }) => onChange({ ...task, [fieldName]: value });
  const handleChangeSelect = (fieldName) => (user) => onChange({ ...task, [fieldName]: user });
  const styles = useStyles();

  return (
    <form className={styles.root}>
      <TextField
        error={has('name', errors)}
        helperText={errors.name}
        onChange={handleChangeTextField('name')}
        value={TaskPresenter.name(task)}
        label="Name"
        required
        margin="dense"
      />
      <TextField
        error={has('description', errors)}
        helperText={errors.description}
        onChange={handleChangeTextField('description')}
        value={TaskPresenter.description(task)}
        label="Description"
        required
        multiline
        margin="dense"
      />
      <UserSelect
        label="Author"
        value={TaskPresenter.author(task)}
        onChange={handleChangeSelect('author')}
        userType="Manager"
        isRequired
        error={has('author', errors)}
        helperText={errors.author}
      />
      <UserSelect
        label="Assignee"
        value={TaskPresenter.assignee(task)}
        onChange={handleChangeSelect('assignee')}
        userType="Developer"
        isRequired
        error={has('assignee', errors)}
        helperText={errors.assignee}
      />
    </form>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  task: PropTypes.shape().isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.arrayOf(PropTypes.string),
    assignee: PropTypes.arrayOf(PropTypes.string),
  }),
};

Form.defaultProps = {
  errors: {},
};

export default Form;
