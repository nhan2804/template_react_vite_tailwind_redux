import { useMutation, useQueryClient } from "react-query";
import { extraText } from "../services/index";
const useExtraText = () => {
  const qc = useQueryClient();
  return useMutation(
    async (file) => {
      const { data } = await extraText(file);
      return data;
    },
    {
      onSettled: () => {
        // qc.invalidateQueries("userProfile");
      },
    }
  );
};

export default useExtraText;
