import React from 'react'
import useClassification from "./hooks/";
const Classification = () => {
     const {
       mutate: classi,
       data: dataClass,
       isLoading: isLoadingClass,
     } = useClassification();
     const onClass = () => {
       const formData = new FormData();
       formData.append("file", acceptedFiles?.[0]);
       classi(formData, {
         onSuccess: (d) => {
           console.log(d);
         },
       });
     };
    return (
        <div>
            
        </div>
    )
}

export default Classification
