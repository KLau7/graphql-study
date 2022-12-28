import { Company, Job } from './db.js';

const findJob = (_, { id, title }) => {
  if (!id && !title) return null;
  if (id) return Job.findById(id);
  return Job.findOne(job => job.title.toLowerCase() === title.toLowerCase());
}

const rejectIf = (condition, msg) => {
  if (condition) throw new Error(msg);
}

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    company: (_, { id }) => Company.findById(id),
    job: findJob
  },

  Mutation: {
    createJob: (_root, { input }, { user }) => {
      rejectIf(!user, 'Unauthorized');
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }, { user }) => {
      rejectIf(!user, 'Unauthorized');
      const job = await Job.findById(id);
      rejectIf(job.companyId !== user.companyId, 'No permission');
      return Job.delete(id);
    },
    updateJob: async (_root, { input }, { user }) => {
      rejectIf(!user, 'Unauthorized');
      const job = await Job.findById(input.id);
      rejectIf(job.companyId !== user.companyId, 'No permission');
      return Job.update({ ...input, companyId: job.companyId });
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
