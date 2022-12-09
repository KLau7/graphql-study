import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteJob, getJob } from "../graphql/queries";
import { useEffect, useState } from "react";

function JobDetail() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState();

  useEffect(() => {
    (async () => {
      const job = await getJob({ id: jobId });
      setJob(job);
    })();
  }, [jobId])

  const removeJob = async () => {
    const job = await deleteJob(jobId);
    console.log('removed: ', job.id, job.title);
    if (job.id === jobId) navigate('/');
  }

  return (
    <div>
      { job &&
        <>
          <h1 className="title">
            { job.title }
          </h1>
          <h2 className="subtitle">
            <Link to={ `/companies/${ job.company.id }` }>
              { job.company.name }
            </Link>
          </h2>
          <div className="box">
            { job.description }
          </div>
          <button onClick={ removeJob }>Delete</button>
        </> }
    </div>
  );
}

export default JobDetail;
