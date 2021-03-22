import React, { useContext, useState } from 'react';
import { Input, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import context from '../context';
import { optionalCourses } from '../studyPlan';

export default function Course({ course, className }) {
    const ctx = useContext(context);
    const { get, set } = ctx;

    const inputClick = (mod) => {
        if (get.includes(mod)) {
            set(get.filter((m) => m !== mod));
        } else {
            set([...get, mod]);
        }
    };

    const classes = classnames('d-flex', 'py-2', 'h-100', {
        'bg-light': !get.includes(course.mod),
        shadow: !get.includes(course.mod),
        'shadow-sm': get.includes(course.mod),
    });

    const textColor = get.includes(course.mod)
        ? 'text-secondary'
        : 'text-primary';

    const module = (course) =>
        optionalCourses.filter((c) => c.mod === course.mod);

    const [popoverOpen, setPopoverOpen] = useState(false);

    const label = (course) => {
        const m = module(course).filter(c => c.semester !== 0);
        const id = 'id-' + course.code.replace(/\./g, '-');
        const part = course.semester - Math.min(...m.map(x => x.semester)) + 1
        const numbers = {
            1: 'I',
            2: 'II',
            3: 'III',
            4: 'IV'
        }
        const label =
            m.length === 1
                ? 'Отдельный курс'
                : `${numbers[part]} часть модуля`;
        const groupBy = (xs, key) => {
            return xs.reduce((rv, x) => {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };

        return (
            <div>
                <p
                    class="m-0 text-secondary"
                    id={id}
                    onMouseEnter={() => setPopoverOpen(true)}
                    onMouseLeave={() => setPopoverOpen(false)}
                    onTouchStart={() => setPopoverOpen(true)}
                    onTouchEnd={() => setPopoverOpen(false)}
                >
                    {label}
                </p>
                <Popover placement="bottom" isOpen={popoverOpen} target={id}>
                    <PopoverHeader>
                        <div class="d-flex justify-content-between">
                            Модуль {course.mod}
                            <span class="text-primary ml-4">
                                {m.map((c) => c.points).reduce((a, b) => a + b, 0)}
                            </span>
                        </div>
                    </PopoverHeader>
                    <PopoverBody>
                        {Object.entries(groupBy(m, 'semester')).map(([s, cs]) => {
                            return (
                                <>
                                    <p class="my-0 text-secondary">Семестр {s}</p>
                                    <p class="my-0">{cs.map(c => {
                                        return (
                                            <p class="d-flex my-1 justify-content-between" key={c.code}>{c.name} <span class="text-primary ml-4">{c.points}</span></p>
                                        )
                                    })}</p>
                                </>
                            )
                        })}
                    </PopoverBody>
                </Popover>
            </div>
        );
    };

    return (
        <div className={className} key={course.code}>
            <Input
                type="checkbox"
                id={course.code}
                checked={get.includes(course.code)}
                onChange={() => inputClick(course.mod)}
                className="d-none"
            />
            <label htmlFor={course.code} className={classes}>
                <div className="d-flex flex-column px-3">
                    <h3 className={`m-0 text-center ${textColor}`}>
                        {course.points}
                    </h3>
                    <small className="m-0">ЗЕТ</small>
                </div>
                <div className="d-flex flex-column pr-3">
                    <p className={`m-0 ${textColor}`}>{course.name}</p>
                    {label(course)}
                </div>
            </label>
        </div>
    );
}

Course.propTypes = {
    course: PropTypes.shape({
        code: PropTypes.string.isRequired,
        mod: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
    }).isRequired,
    className: PropTypes.string.isRequired,
};
