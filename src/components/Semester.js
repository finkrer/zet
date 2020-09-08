import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Course from './Course';
import { optionalCourses } from '../studyPlan';
import context from '../context';
import config from '../config';

export default function Semester({ courses, index }) {
    const toHtml = (c) => (
        <Course
            className="col-lg-4 col-sm-6 px-1 py-1"
            course={c}
            key={c.code}
        />
    );

    const { get } = useContext(context);

    const groupByFilter = (filter) =>
        courses.some(filter) ? (
            <div>
                <div className="m-2">
                    <div className="row">
                        {courses.filter(filter).map(toHtml)}
                    </div>
                </div>
            </div>
        ) : null;

    return (
        <div key={index}>
            <h3>{`Семестр ${index + 5}`}</h3>
            <p>
                {courses
                    .filter((c) => get.includes(c.code))
                    .map((c) => c.points)
                    .reduce((a, b) => a + b, 0)}{' '}
                / {config.semesterPoints[index]}
            </p>
            <div className="mb-5">
                {groupByFilter((c) => optionalCourses.includes(c))}
            </div>
        </div>
    );
}

Semester.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            required: PropTypes.bool.isRequired,
        }).isRequired
    ).isRequired,
    index: PropTypes.number.isRequired,
};
