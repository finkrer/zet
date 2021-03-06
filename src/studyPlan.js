import plan from './htmlParser/plan.json';
import config from './config';

export const bySemester = [5, 6, 7, 8].map((i) =>
    plan.filter((c) => c.semester === i)
);

export const optionalCourses = plan.filter((c) => !c.required);

export const sumOf = (codes) =>
    plan
        .filter((c) => codes.includes(c.mod))
        .map((c) => c.points)
        .reduce((a, b) => a + b, 0);

export const sumOptOf = (codes) =>
    optionalCourses
        .filter((c) => codes.includes(c.mod))
        .map((c) => c.points)
        .reduce((a, b) => a + b, 0);

export const percOf = (codes) => (sumOf(codes) / config.maxPoints) * 100;

export const percOptOf = (codes) => (sumOptOf(codes) / config.maxPoints) * 100;

export const percAddOf = (codes) => percOf(codes) - percOptOf(codes);

export const toModuleCode = (courseCode) =>
    `М.${courseCode.match(/(\d+\.\d+)\.\d+/)[1]}`;

export default plan;
