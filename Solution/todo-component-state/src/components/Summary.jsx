import React from 'react';
import PropTypes from 'prop-types';
import "./summary.css";

const Summary = ({ todosCount, completedTodosCount }) => (
    <div className="summary__container">
        <p className="summary__text">
            {`${completedTodosCount}/${todosCount} tasks completed`}
        </p>
    </div>
);

Summary.propTypes = {
    todosCount: PropTypes.number.isRequired,
    completedTodosCount: PropTypes.number.isRequired
};

export default Summary;