import { useState } from 'react';
import { createJob, getJob, updateJob } from "../graphql/queries";
import { useNavigate } from "react-router";

function JobForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const companyId = 'pVbRRBQtMVw6lUAkj1k43'
    const existingJob = await getJob({ title });
    if (existingJob) {
      // update
      const input = { ...existingJob, title, description, companyId: existingJob.company.id };
      delete input.company;
      await updateJob(input);
    } else {
      const createdJob = await createJob({ title, description, companyId });
      navigate('/jobs/' + createdJob.id)
    }
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={ title }
                     onChange={ (event) => setTitle(event.target.value) }
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={ 10 } value={ description }
                        onChange={ (event) => setDescription(event.target.value) }
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={ handleSubmit }>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
