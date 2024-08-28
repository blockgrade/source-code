import { useEffect, useState } from "react";
import { ethers } from "ethers";

const GradeDocuments = ({state}) => {
    const [gradeDocument, setGradeDocument] = useState([]);
    const {contract} = state;

    useEffect(() => {
        const gradesList = async () => {
            const grades = await contract.getGrades();
            setGradeDocument(grades);
        };
        contract && gradesList();
    }, [contract]);

    return (
        <>
            {gradeDocument.map((gradeDoc, index) => {
                const grade = ethers.formatUnits(gradeDoc.grade, 0) / 100;
                const timestamp = new Date(Number(gradeDoc.timestamp) * 1000).toLocaleString();
                
                return <div key={index}>
                    <p>{gradeDoc.student}</p>
                    <p>{gradeDoc.discipline}</p>
                    <p>{grade}</p>
                    <p>{timestamp}</p>
                    <p>{gradeDoc.document}</p>
                    <p>{gradeDoc.from}</p>
                </div>
            })}
        </>
    );
};

export default GradeDocuments;