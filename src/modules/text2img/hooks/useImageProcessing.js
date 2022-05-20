import { useMutation, useQueryClient } from "react-query";
// import { sepia } from "tailwindcss/defaulttheme";
import { brightNess, duoTone, emBoss, tv60, sepia, negative } from "../services";
export const typeIP = {
  duoTone: "duo-tone",
  brightNess: "brightness",
  emBoss: "emboss",
  tv60: "tv-60",
  sepia: "sepia",
  negative: "negative",
};
const useImageProcessing = (type) => {
  const qc = useQueryClient();
  return useMutation(async (formData) => {
    let data = null;
    switch (type) {
      case typeIP.duoTone:
        data = await duoTone(formData);
        return data?.data;
        break;
      case typeIP.brightNess:
        data = await brightNess(formData);
        return data?.data;
        break;
      case typeIP.emBoss:
        data = await emBoss(formData);
        return data?.data;
      case typeIP.sepia:
        data = await sepia(formData);
        return data?.data;
        break;
      case typeIP.negative:
        data = await negative(formData);
        return data?.data;
        break;
      case typeIP.tv60:
        data = await tv60(formData);
        return data?.data;
        break;
      default:
        break;
    }
  }, {});
};

export default useImageProcessing;
