import { useMutation, useQueryClient } from "react-query";
import { extraText, sharpen } from "../services/index";
const useSharp = () => {
  const qc = useQueryClient();
  return useMutation(
    async ({ type, formData }) => {
      const { data } = await sharpen(type, formData);
      return data;
    },
    {
      onSettled: () => {
        // qc.invalidateQueries("userProfile");
      },
    }
  );
};

export default useSharp;
