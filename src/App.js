import React from 'react';
import { Container, Button } from 'reactstrap';
import { bySemester, optionalCourses } from './studyPlan';
import useLocalStorage from './useLocalStorage';
import ZETBar from './components/ZETBar';
import Context from './context';
import Semester from './components/Semester';

export default function App() {
    const [get, set] = useLocalStorage(
        'selected',
        optionalCourses.map((x) => x.code)
    );

    const reset = () => set([]);

    return (
        <div className="App">
            <Context.Provider value={{ get, set }}>
                <ZETBar />
                <Container>
                    <div className="d-flex">
                        <div className="mt-3 d-flex flex-column flex-sm-row">
                            <h2 className="mr-3 mb-0">Калькулятор ЗЕТ</h2>
                            <div>
                                <Button
                                    className="m-1 btn-light btn-outline-danger"
                                    onClick={reset}
                                >
                                    Сброс
                                </Button>
                                <Button
                                    className="m-1 btn-light btn-outline-dark"
                                    href="https://github.com/finkrer/zet"
                                >
                                    Github
                                </Button>
                            </div>
                        </div>
                    </div>
                    {bySemester &&
                        bySemester.map((courses, i) => (
                            <Semester courses={courses} index={i} key={i} />
                        ))}
                </Container>
            </Context.Provider>
        </div>
    );
}
