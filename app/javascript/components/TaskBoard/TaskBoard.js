/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import KanbanBoard from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import { propOr } from 'ramda';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Task from 'components/Task';
import ColumnHeader from 'components/ColumnHeader';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import TasksRepository from 'repositories/TasksRepository';
import TaskForm from 'forms/TaskForm';
import TaskPresenter from 'presenters/TaskPresenter';
import useStyles from './useStyles';

const STATES = [
  { key: 'new_task', value: 'New' },
  { key: 'in_development', value: 'In Dev' },
  { key: 'in_qa', value: 'In QA' },
  { key: 'in_code_review', value: 'in CR' },
  { key: 'ready_for_release', value: 'Ready for release' },
  { key: 'released', value: 'Released' },
  { key: 'archived', value: 'Archived' },
];

const MODES = {
  ADD: 'add',
  EDIT: 'edit',
  NONE: 'none',
};

const initialBoard = {
  columns: STATES.map(({ key, value }) => ({
    id: key,
    title: value,
    cards: [],
    meta: {},
  })),
};

const TaskBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  useEffect(() => loadBoard(), []);
  useEffect(() => generateBoard(), [boardCards]);

  const loadColumn = (state, page, perPage) => {
    return TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });
  };

  const loadColumnInitial = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prevState) => {
        return {
          ...prevState,
          [state]: { cards: items, meta },
        };
      });
    });
  };

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prevState) => {
        return {
          ...prevState,
          [state]: { cards: prevState[state].cards.concat(items), meta },
        };
      });
    });
  };

  const generateBoard = () => {
    const board = {
      columns: STATES.map(({ key, value }) => {
        return {
          id: key,
          title: value,
          cards: propOr({}, 'cards', boardCards[key]),
          meta: propOr({}, 'meta', boardCards[key]),
        };
      }),
    };

    setBoard(board);
  };

  const loadBoard = () => {
    STATES.map(({ key }) => loadColumnInitial(key));
  };

  const handleCardDragEnd = ({ id, transitions }, { fromColumnId }, { toColumnId }) => {
    const transition = transitions.find(({ to }) => toColumnId === to);
    if (!transition) {
      return null;
    }

    return TasksRepository.update(id, { task: { stateEvent: transition.event } })
      .then(() => {
        loadColumnInitial(toColumnId);
        loadColumnInitial(fromColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`);
      });
  };

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const handleTaskCreate = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create(attributes).then(({ data: { task } }) => {
      loadColumnInitial(TaskPresenter.state(task));
      handleClose();
    });
  };

  const loadTask = (id) => {
    return TasksRepository.show(id).then(({ data: { task } }) => task);
  };

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumnInitial(TaskPresenter.state(task));
      handleClose();
    });
  };

  const handleTaskDestroy = (task) => {
    return TasksRepository.destroy(task.id).then(() => {
      loadColumnInitial(TaskPresenter.state(task));
      handleClose();
    });
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  return (
    <>
      <KanbanBoard
        renderCard={(card) => <Task onClick={handleOpenEditPopup} task={card} />}
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
        onCardDragEnd={handleCardDragEnd}
      >
        {board}
      </KanbanBoard>
      <Fab className={useStyles().addButton} color="primary" aria-label="add" onClick={handleOpenAddPopup}>
        <AddIcon />
      </Fab>
      {mode === MODES.ADD && <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />}
      {mode === MODES.EDIT && (
        <EditPopup
          onLoadCard={loadTask}
          onDestroyCard={handleTaskDestroy}
          onUpdateCard={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}
    </>
  );
};

export default TaskBoard;
