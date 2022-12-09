import { Company, Job } from './db.js';

const findJob = (_, { id, title }) => {
  if (!id && !title) return null;
  if (id) return Job.findById(id);
  return Job.findOne(job => job.title.toLowerCase() === title.toLowerCase());
}

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    company: (_, { id }) => Company.findById(id),
    job: findJob
  },

  Mutation: {
    createJob: (_root, { input }) => {
      return Job.create(input);
    },
    deleteJob: (_root, { id }) => {
      return Job.delete(id);
    },
    updateJob: (_root, { input }) => {
      return Job.update(input);
    },
  },

  Job: {
    company: (job) => {
      return Company.findById(job.companyId)
    }
  },

  Company: {
    jobs: (company) => {
      return Job.findAll(job => job.companyId === company.id);
    }
  }
}
