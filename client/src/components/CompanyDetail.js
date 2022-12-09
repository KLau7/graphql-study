import { useParams } from 'react-router';
import { useEffect, useState } from "react";
import { getCompany } from "../graphql/queries";
import JobList from "./JobList";

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();

  useEffect(() => {
    (async () => {
      const company = await getCompany(companyId);
      setCompany(company);
    })();
  }, [companyId])

  return (
    <div>
      { company &&
        <>
          <h1 className="title">
            { company.name }
          </h1>
          <div className="box">
            { company.description }
          </div>
          <h5 className='title is-5'>
            Jobs here
          </h5>
          <JobList jobs={ company.jobs } />
        </> }
    </div>
  );
}

export default CompanyDetail;
