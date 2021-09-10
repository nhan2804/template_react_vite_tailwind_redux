import { useQuery } from "react-query";
import { fetchTask } from "../services";

const useGetTaskUnAsign = (id) => {
  return useQuery(["task-unsign", id], async () => {
    const { data } = await fetchTask(id);
    return (data);
  });
};

export default useGetTaskUnAsign;