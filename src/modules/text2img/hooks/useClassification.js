import { useMutation, useQueryClient } from "react-query";
import { classification, extraText } from "../services/index";
const useClassification = () => {
  const qc = useQueryClient();
  return useMutation(
    async (file) => {
      const { data } = await classification(file);
      return data;
    },
    {
      onSettled: () => {
        // qc.invalidateQueries("userProfile");
      },
    }
  );
};

export default useClassification;
