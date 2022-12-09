import { gql, request } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function getJobs() {
  const query = gql`
		query {
			jobs {
				id
				title
				company {
					name
				}
			}
		}
  `;

  const { jobs } = await request(GRAPHQL_URL, query);
  return jobs;
}

export async function getJob({ id, title }) {
  const query = gql`
		query($jobId: ID, $title: String) {
			job(id: $jobId, title: $title) {
				id
				title
				description
				company {
					id
					name
				}
			}
		}
  `;

  const { job } = await request(GRAPHQL_URL, query, { jobId: id, title });
  return job;
}

export async function getCompany(id) {
  const query = gql`
		query($id: ID!) {
			company(id: $id) {
				id
				name
				description
				jobs {
					id
					title
				}
			}
		}
  `;

  const { company } = await request(GRAPHQL_URL, query, { id });
  return company;
}

export async function createJob(input) {
  const query = gql`mutation($input: CreateJobInput!) {
		job: createJob(input: $input) {
			id
		}
	}
  `;

  const { job } = await request(GRAPHQL_URL, query, { input });
  return job;
}

export async function deleteJob(deleteJobId) {
  const query = gql`
		mutation($deleteJobId: ID!) {
			job: deleteJob(id: $deleteJobId) {
				id
			}
		}
  `;

  const { job } = await request(GRAPHQL_URL, query, { deleteJobId });
  return job;
}

export async function updateJob(input) {
  const query = gql`
		mutation($input: UpdateJobInput!) {
			updateJob(input: $input) {
				id
				title
				description
				company {
					id
					name
				}
			}
		}
  `;

  const { job } = await request(GRAPHQL_URL, query, { input });
  return job;
}
