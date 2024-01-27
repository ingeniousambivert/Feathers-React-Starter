const createJob = async (queue, name, data = {}, configs = {}) => {
  if (!queue) throw new Error("Queue must be specified");
  if (!name) throw new Error("Job name must be specified");
  return await queue.add(name, data, configs);
};

const removeRepeatableJob = async (queue, jobId) => {
  if (!queue) throw new Error("Queue must be specified");
  if (!jobId) throw new Error("Job Id must be specified");
  try {
    const jobs = await queue.getRepeatableJobs(0, -1, false);
    if (jobs.length > 0) {
      const repeatableJob = jobs.find((element) => {
        if (element !== null && element.id === jobId) {
          return element;
        }
        return {};
      });
      if (repeatableJob !== null && repeatableJob !== undefined) {
        await queue.removeRepeatableByKey(repeatableJob.key);
        return { success: true, error: null };
      }
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { createJob, removeRepeatableJob };
