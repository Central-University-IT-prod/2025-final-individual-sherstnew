import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import { getTrainings } from '../utils/trainings';
import { getNoun } from '../utils/getNoun';

export function Trainings() {
  return (
    <Layout>
      <Link
        to="/create_training"
        className="rounded-xl cursor-pointer p-5 py-3 bg-gray-200"
      >
        Создать тренировку
      </Link>
      <div className="w-full flex flex-wrap gap-5">
        {
          getTrainings()
          .map((training, index) => (
            <Link to={`/runner?trainingId=${training.id}`} className="w-64 text-xl p-5 bg-gray-200 rounded-xl flex flex-wrap items-start gap-3" key={index}>
              <span className="w-full text-2xl">{training.name}</span>
              <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{training.description}</span>
              <span className="w-full">{training.exercises.length} {getNoun(training.exercises.length, 'упражнение', 'упражнения', 'упражнений')}</span>
            </Link>
          ))
        }
      </div>
    </Layout>
  )
}